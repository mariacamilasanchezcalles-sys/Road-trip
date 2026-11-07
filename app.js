/* ROAD TRIP — lógica de la app (sin dependencias, 100 % offline) */
(function () {
  'use strict';

  var C = window.CONTENIDO || {};
  ['quePrefieres', 'cuantoMeConoces', 'nuestraVidaSi', 'palabras', 'retos'].forEach(function (k) {
    if (!Array.isArray(C[k])) C[k] = [];
  });

  var KEY = 'roadtrip.partida.v1';
  var JUG = ['cami', 'rodri'];
  var NOM = { cami: 'Cami', rodri: 'Rodri' };
  var app = document.getElementById('app');

  /* ------------------------------------------------------------ utilidades */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function barajar(n) {
    var a = [];
    for (var i = 0; i < n; i++) a.push(i);
    for (var j = n - 1; j > 0; j--) {
      var r = Math.floor(Math.random() * (j + 1));
      var t = a[j]; a[j] = a[r]; a[r] = t;
    }
    return a;
  }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function tieneEjemplos(lista) { return lista.some(function (x) { return x && x.ejemplo; }); }

  /* -------------------------------------------- ¿Cuánto me conoces? turnos */
  var TURNOS = [];
  C.cuantoMeConoces.forEach(function (q) {
    var sobre = String(q.sobre || 'ambos').toLowerCase();
    function add(s) {
      var resp = q.respuesta;
      if (resp && typeof resp === 'object') resp = resp[s];
      TURNOS.push({
        sobre: s,
        responde: s === 'cami' ? 'rodri' : 'cami',
        texto: String(q.pregunta || '').replace(/\{nombre\}/g, NOM[s]),
        respuesta: resp || ''
      });
    }
    if (sobre === 'cami' || sobre === 'rodri') add(sobre);
    else { add('cami'); add('rodri'); }
  });

  /* ----------------------------------------------------------- estado */
  function predVacia() { return { artista: '', idioma: '', genero: '', conocen: '' }; }
  var NUEVO = {
    musica: function () {
      return {
        rondas: [], fase: 'prediccion', cancion: '',
        pred: { cami: predVacia(), rodri: predVacia() },
        ok: { cami: [false, false, false, false], rodri: [false, false, false, false] }
      };
    },
    prefieres: function () { return { i: 0, paso: 'cami', resp: [] }; },
    conoces: function () { return { i: 0, res: [] }; },
    historia: function () { return { visto: false }; },
    vida: function () { return { orden: barajar(C.nuestraVidaSi.length), pos: 0, max: 0 }; },
    palabras: function () { return { i: 0, revelado: false, pts: [] }; },
    retos: function () { return { orden: barajar(C.retos.length), pos: 0, max: 0 }; }
  };

  function cargar() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { s = {}; }
    Object.keys(NUEVO).forEach(function (k) {
      if (!s[k] || typeof s[k] !== 'object') s[k] = NUEVO[k]();
    });
    // Si el contenido cambió de tamaño, rehacer el orden de las barajas
    if (s.vida.orden.length !== C.nuestraVidaSi.length) s.vida = NUEVO.vida();
    if (s.retos.orden.length !== C.retos.length) s.retos = NUEVO.retos();
    return s;
  }
  var S = cargar();
  function guardar() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* sin espacio */ }
  }

  /* ----------------------------------------------------------- cálculos */
  function puntosMusica() {
    var p = { cami: 0, rodri: 0 };
    S.musica.rondas.forEach(function (r) {
      JUG.forEach(function (j) { p[j] += r.ok[j].filter(Boolean).length; });
    });
    return p;
  }
  function statsPrefieres() {
    var c = 0, d = 0;
    for (var i = 0; i < C.quePrefieres.length; i++) {
      var r = S.prefieres.resp[i];
      if (r && r.cami && r.rodri) { if (r.cami === r.rodri) c++; else d++; }
    }
    return { coinciden: c, diferentes: d, total: c + d, pct: pct(c, c + d) };
  }
  function statsConoces() {
    var p = { cami: 0, rodri: 0 }, ok = 0, mal = 0;
    TURNOS.forEach(function (t, i) {
      var r = S.conoces.res[i];
      if (r === true) { ok++; p[t.responde]++; } else if (r === false) mal++;
    });
    return { cami: p.cami, rodri: p.rodri, ok: ok, mal: mal, total: ok + mal, pct: pct(ok, ok + mal) };
  }
  function puntosPalabras() {
    var p = { cami: 0, rodri: 0 };
    S.palabras.pts.forEach(function (x) {
      if (!x) return;
      JUG.forEach(function (j) { if (x[j]) p[j] += (x[j].idioma ? 1 : 0) + (x[j].sig ? 1 : 0); });
    });
    return p;
  }
  function jugadasPalabras() {
    var n = 0;
    for (var i = 0; i < C.palabras.length; i++) if (S.palabras.pts[i]) n++;
    return n;
  }

  /* -------------------------------------------------------- secciones */
  var SECCIONES = [
    { id: 'musica', icono: '🎵', nombre: 'La siguiente canción', desc: 'Adivinen artista, idioma y género antes de que suene.',
      cuenta: function () { return 'Rondas ilimitadas'; },
      progreso: function () { return Math.min(S.musica.rondas.length / 10, 1); },
      estado: function () { return S.musica.rondas.length + ' canciones jugadas'; } },
    { id: 'prefieres', icono: '⚖️', nombre: '¿Qué prefieres?', desc: 'Elijan por separado y vean si coinciden.',
      cuenta: function () { return C.quePrefieres.length + ' preguntas'; },
      progreso: function () { return C.quePrefieres.length ? statsPrefieres().total / C.quePrefieres.length : 0; },
      estado: function () { return statsPrefieres().total + ' de ' + C.quePrefieres.length + ' respondidas'; },
      ejemplo: function () { return tieneEjemplos(C.quePrefieres); } },
    { id: 'conoces', icono: '💭', nombre: '¿Cuánto me conoces?', desc: 'Uno responde, el otro confirma si acertó.',
      cuenta: function () { return TURNOS.length + ' turnos'; },
      progreso: function () { return TURNOS.length ? statsConoces().total / TURNOS.length : 0; },
      estado: function () { return statsConoces().total + ' de ' + TURNOS.length + ' respondidas'; },
      ejemplo: function () { return tieneEjemplos(C.cuantoMeConoces); } },
    { id: 'historia', icono: '📻', nombre: 'La canción tiene una historia', desc: '¿Qué recuerdo les trae esta canción?',
      cuenta: function () { return 'Conversación libre'; },
      progreso: function () { return S.historia.visto ? 1 : 0; },
      estado: function () { return S.historia.visto ? 'Jugado' : 'Sin jugar'; } },
    { id: 'vida', icono: '🔮', nombre: 'Nuestra vida si…', desc: 'Escenarios hipotéticos para conversar.',
      cuenta: function () { return C.nuestraVidaSi.length + ' tarjetas'; },
      ejemplo: function () { return tieneEjemplos(C.nuestraVidaSi); } },
    { id: 'palabras', icono: '🌍', nombre: 'Palabras de otros idiomas', desc: 'Adivinen el idioma y el significado.',
      cuenta: function () { return C.palabras.length + ' palabras'; },
      progreso: function () { return C.palabras.length ? jugadasPalabras() / C.palabras.length : 0; },
      estado: function () { return jugadasPalabras() + ' de ' + C.palabras.length + ' jugadas'; },
      ejemplo: function () { return tieneEjemplos(C.palabras); } },
    { id: 'retos', icono: '🚗', nombre: 'Retos ligeros de carretera', desc: 'Pequeños retos para conversar.',
      cuenta: function () { return C.retos.length + ' retos'; },
      ejemplo: function () { return tieneEjemplos(C.retos); } }
  ];
  var POR_ID = {};
  SECCIONES.forEach(function (s) { POR_ID[s.id] = s; });

  // En las barajas, "max" cuenta cuántas tarjetas ya se vieron (la actual incluida)
  function vistas(b, lista) { return Math.min(b.max + 1, lista.length); }
  POR_ID.vida.progreso = function () { return C.nuestraVidaSi.length && S.vida.abierta ? vistas(S.vida, C.nuestraVidaSi) / C.nuestraVidaSi.length : 0; };
  POR_ID.vida.estado = function () { return (S.vida.abierta ? vistas(S.vida, C.nuestraVidaSi) : 0) + ' de ' + C.nuestraVidaSi.length + ' vistas'; };
  POR_ID.retos.progreso = function () { return C.retos.length && S.retos.abierta ? vistas(S.retos, C.retos) / C.retos.length : 0; };
  POR_ID.retos.estado = function () { return (S.retos.abierta ? vistas(S.retos, C.retos) : 0) + ' de ' + C.retos.length + ' vistos'; };

  /* ---------------------------------------------------------- vistas */
  function vistaInicio() {
    var m = puntosMusica(), pf = statsPrefieres(), co = statsConoces(), pa = puntosPalabras();
    var prog = SECCIONES.reduce(function (a, s) { return a + Math.min(s.progreso(), 1); }, 0) / SECCIONES.length;
    var jugadas = SECCIONES.filter(function (s) { return s.progreso() > 0; }).length;

    var fichas = SECCIONES.map(function (s) {
      var p = Math.round(Math.min(s.progreso(), 1) * 100);
      return '<a class="ficha sec-' + s.id + '" href="#/' + s.id + '">' +
        '<span class="ficha-icono" aria-hidden="true">' + s.icono + '</span>' +
        '<span class="ficha-txt"><strong>' + esc(s.nombre) + '</strong>' +
        '<span class="ficha-desc">' + esc(s.desc) + '</span>' +
        '<span class="ficha-meta"><span class="pill">' + esc(s.cuenta()) + '</span>' +
        (s.ejemplo && s.ejemplo() ? '<span class="pill pill-aviso">Contenido de ejemplo</span>' : '') + '</span>' +
        '<span class="mini-barra"><span style="width:' + p + '%"></span></span></span>' +
        '<span class="ficha-flecha" aria-hidden="true">›</span></a>';
    }).join('');

    return '<header class="portada">' +
      '<h1>ROAD TRIP</h1><p class="sub">Nuestra aventura en carretera</p>' +
      '<div class="pareja"><span class="chip-j cami">Cami</span><span class="corazon">🚗</span><span class="chip-j rodri">Rodri</span></div>' +
      '</header>' +
      '<section class="tarjeta marcador-general"><h2>Marcador</h2>' +
      '<div class="mg-fila"><span>🎵 Música</span><b>Cami ' + m.cami + ' · ' + m.rodri + ' Rodri</b></div>' +
      '<div class="mg-fila"><span>⚖️ Coincidencias</span><b>' + pf.coinciden + ' de ' + pf.total + ' (' + pf.pct + '%)</b></div>' +
      '<div class="mg-fila"><span>💭 Me conoces</span><b>Cami ' + co.cami + ' · ' + co.rodri + ' Rodri</b></div>' +
      '<div class="mg-fila"><span>🌍 Idiomas</span><b>Cami ' + pa.cami + ' · ' + pa.rodri + ' Rodri</b></div>' +
      '<div class="progreso"><div class="progreso-txt"><span>Progreso del viaje</span><span>' + jugadas + ' de 7 actividades · ' + Math.round(prog * 100) + '%</span></div>' +
      '<div class="barra"><span style="width:' + Math.round(prog * 100) + '%"></span></div></div>' +
      '</section>' +
      '<nav class="fichas">' + fichas + '</nav>' +
      '<div class="acciones-pie">' +
      '<a class="btn btn-sec" href="#/resumen">📊 Resumen de la partida</a>' +
      '<button class="btn btn-peligro" data-a="reiniciarTodo">↺ Reiniciar toda la partida</button>' +
      '</div>' +
      '<p class="nota-pie">Funciona sin internet · El copiloto maneja el teléfono 🙌</p>';
  }

  function cabecera(id, extra) {
    var s = POR_ID[id];
    return '<header class="cab sec-' + id + '">' +
      '<a class="cab-volver" href="#/" aria-label="Volver al menú">‹</a>' +
      '<h1><span aria-hidden="true">' + s.icono + '</span> ' + esc(s.nombre) + '</h1>' +
      (extra === false ? '<span class="cab-hueco"></span>' :
        '<button class="cab-reset" data-a="reiniciarJuego" data-id="' + id + '" aria-label="Reiniciar este juego">↺</button>') +
      '</header>';
  }
  function reglas(lista, abiertas) {
    return '<details class="reglas"' + (abiertas ? ' open' : '') + '><summary>📖 ¿Cómo se juega?</summary><ol>' +
      lista.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ol></details>';
  }
  function marcador2(a, b, etiqueta) {
    return '<div class="marcador2">' +
      '<div class="m-j cami"><span>Cami</span><b>' + a + '</b></div>' +
      (etiqueta ? '<div class="m-etq">' + etiqueta + '</div>' : '<div class="m-etq">pts</div>') +
      '<div class="m-j rodri"><span>Rodri</span><b>' + b + '</b></div></div>';
  }
  function sinContenido(id, que) {
    return cabecera(id, false) + '<div class="tarjeta vacia"><p>Todavía no hay ' + que + ' cargadas.</p>' +
      '<p class="suave">Agrégalas en <code>data/contenido.js</code>.</p></div><a class="btn btn-sec" href="#/">Volver al menú</a>';
  }

  /* ---------- 1. La siguiente canción ---------- */
  var CATS = [
    { k: 'artista', t: '🎤 Artista o intérprete', tipo: 'texto', ph: '¿Quién canta?' },
    { k: 'idioma', t: '🗣️ Idioma', tipo: 'opc', ops: ['Español', 'Inglés', 'Otro'] },
    { k: 'genero', t: '🎸 Género musical', tipo: 'texto', ph: 'Pop, rock, salsa…', lista: 'generos' },
    { k: 'conocen', t: '🤔 ¿La conocerán?', tipo: 'opc', ops: ['Ninguno', 'Solo Cami', 'Solo Rodri', 'Ambos'] }
  ];
  function vistaMusica() {
    var M = S.musica, p = puntosMusica(), h = cabecera('musica');
    h += marcador2(p.cami, p.rodri) +
      '<p class="contador">Canción nº <b>' + (M.rondas.length + 1) + '</b> · ' + M.rondas.length + ' jugadas</p>';
    h += reglas([
      'Antes de que suene la siguiente canción en Spotify (o donde sea), cada uno predice las 4 categorías.',
      'El copiloto anota las predicciones (son opcionales: también pueden decirlas en voz alta).',
      'Escuchen la canción y marquen quién acertó cada categoría.',
      '1 punto por acierto · máximo 4 por canción y jugador.'
    ], M.rondas.length === 0 && M.fase === 'prediccion');

    if (M.fase === 'prediccion') {
      h += '<h2 class="paso">1 · Predicciones</h2>';
      CATS.forEach(function (c) {
        h += '<div class="tarjeta cat"><h3>' + c.t + '</h3>';
        JUG.forEach(function (j) {
          var v = M.pred[j][c.k];
          h += '<div class="cat-fila"><span class="tag-j ' + j + '">' + NOM[j] + '</span>';
          if (c.tipo === 'texto') {
            h += '<input class="campo" data-in="musica.pred.' + j + '.' + c.k + '" value="' + esc(v) + '" placeholder="' + c.ph + '"' +
              (c.lista ? ' list="' + c.lista + '"' : '') + ' autocomplete="off">';
          } else {
            h += '<div class="opciones">' + c.ops.map(function (o) {
              return '<button class="opc' + (v === o ? ' sel' : '') + '" data-a="pred" data-j="' + j + '" data-k="' + c.k + '" data-v="' + esc(o) + '">' + esc(o) + '</button>';
            }).join('') + '</div>';
          }
          h += '</div>';
        });
        h += '</div>';
      });
      h += '<datalist id="generos">' + ['Pop', 'Rock', 'Reguetón', 'Salsa', 'Vallenato', 'Merengue', 'Bachata', 'Balada', 'Electrónica', 'Rap / Hip hop', 'R&B', 'Cumbia', 'Indie', 'Clásica', 'Jazz']
        .map(function (g) { return '<option value="' + g + '">'; }).join('') + '</datalist>';
      h += '<button class="btn btn-pri sec-musica" data-a="escuchar">🎧 ¡A escuchar! Marcar aciertos</button>';
    } else {
      h += '<h2 class="paso">2 · ¿Quién acertó?</h2>' +
        '<div class="tarjeta"><label class="etq">Canción que sonó (opcional)</label>' +
        '<input class="campo" data-in="musica.cancion" value="' + esc(M.cancion) + '" placeholder="Nombre de la canción" autocomplete="off"></div>';
      CATS.forEach(function (c, ci) {
        h += '<div class="tarjeta cat"><h3>' + c.t + '</h3>';
        JUG.forEach(function (j) {
          var pr = M.pred[j][c.k];
          h += '<button class="acierto' + (M.ok[j][ci] ? ' si' : '') + '" data-a="okMusica" data-j="' + j + '" data-c="' + ci + '">' +
            '<span class="tag-j ' + j + '">' + NOM[j] + '</span><span class="pred">' + (pr ? esc(pr) : '<i>sin anotar</i>') + '</span>' +
            '<span class="check">' + (M.ok[j][ci] ? '✓ Acertó' : 'No') + '</span></button>';
        });
        h += '</div>';
      });
      var pc = M.ok.cami.filter(Boolean).length, prd = M.ok.rodri.filter(Boolean).length;
      h += '<p class="contador">Esta canción: Cami <b>+' + pc + '</b> · Rodri <b>+' + prd + '</b></p>' +
        '<button class="btn btn-pri sec-musica" data-a="guardarCancion">✅ Guardar y nueva canción</button>' +
        '<button class="btn btn-sec" data-a="volverPred">‹ Volver a las predicciones</button>';
    }

    if (M.rondas.length) {
      h += '<h2 class="paso">Historial</h2><div class="tarjeta historial">' +
        M.rondas.slice().reverse().map(function (r, k) {
          var n = M.rondas.length - k;
          return '<div class="h-fila"><span class="h-num">' + n + '</span><span class="h-txt">' + (r.cancion ? esc(r.cancion) : 'Canción ' + n) +
            '</span><span class="h-pts"><b class="c-cami">' + r.ok.cami.filter(Boolean).length + '</b> · <b class="c-rodri">' + r.ok.rodri.filter(Boolean).length + '</b></span></div>';
        }).join('') + '</div>';
    }
    return h;
  }

  /* ---------- 2. ¿Qué prefieres? ---------- */
  function vistaPrefieres() {
    var L = C.quePrefieres, P = S.prefieres;
    if (!L.length) return sinContenido('prefieres', 'preguntas');
    var st = statsPrefieres(), h = cabecera('prefieres');
    h += '<div class="stats3"><div><b>' + st.coinciden + '</b><span>Coinciden</span></div><div><b>' + st.diferentes +
      '</b><span>Diferentes</span></div><div><b>' + st.pct + '%</b><span>Coincidencia</span></div></div>';
    h += reglas([
      'Aquí no se compite: gana la pareja si piensan igual.',
      'Cami elige su respuesta (Rodri no mira 🙈).',
      'Después elige Rodri.',
      'Se muestran las dos respuestas juntas y se ve si coincidieron.'
    ], st.total === 0 && P.i === 0);

    if (P.i >= L.length) {
      h += '<div class="tarjeta final sec-prefieres-borde"><div class="final-emoji">💞</div>' +
        '<h2>¡Coincidieron en ' + st.coinciden + ' de ' + L.length + ' preguntas!</h2><p>' + st.pct + '% de coincidencia</p></div>';
    } else {
      var q = L[P.i], r = P.resp[P.i] || {};
      h += '<div class="carta sec-prefieres"><div class="carta-num">Pregunta ' + (P.i + 1) + ' de ' + L.length + '</div>' +
        '<div class="carta-txt">' + esc(q.pregunta) + '</div></div>';
      if (P.paso === 'cami' || P.paso === 'rodri') {
        var j = P.paso;
        h += '<p class="turno">Turno de <span class="tag-j ' + j + '">' + NOM[j] + '</span>' +
          (j === 'rodri' ? ' <span class="suave">(Cami ya eligió 🤫)</span>' : '') + '</p>' +
          '<div class="dos-opc">' +
          '<button class="opc-grande" data-a="elegir" data-v="1">' + esc(q.opcion1) + '</button>' +
          '<span class="o">o</span>' +
          '<button class="opc-grande" data-a="elegir" data-v="2">' + esc(q.opcion2) + '</button></div>';
        if (j === 'rodri') h += '<button class="btn btn-sec" data-a="prefAtras">‹ Cami quiere cambiar</button>';
      } else {
        var igual = r.cami === r.rodri;
        h += '<div class="revela ' + (igual ? 'igual' : 'distinto') + '">' +
          '<div class="rv-fila"><span class="tag-j cami">Cami</span><span>' + esc(q['opcion' + r.cami]) + '</span></div>' +
          '<div class="rv-fila"><span class="tag-j rodri">Rodri</span><span>' + esc(q['opcion' + r.rodri]) + '</span></div>' +
          '<div class="rv-res">' + (igual ? '💞 ¡Coincidieron!' : '🔀 Eligieron diferente') + '</div></div>' +
          '<button class="btn btn-pri sec-prefieres" data-a="prefSig">' + (P.i + 1 < L.length ? 'Siguiente pregunta ›' : 'Ver resultado final ›') + '</button>' +
          '<button class="btn btn-sec" data-a="prefRepetir">↺ Repetir esta pregunta</button>';
      }
    }
    h += historialPrefieres();
    return h;
  }
  function historialPrefieres() {
    var L = C.quePrefieres, filas = '';
    L.forEach(function (q, i) {
      var r = S.prefieres.resp[i];
      if (!r || !r.cami || !r.rodri) return;
      var igual = r.cami === r.rodri;
      filas += '<div class="h-fila col"><div class="h-top"><span class="h-num">' + (i + 1) + '</span><span class="h-txt">' + esc(q.pregunta) +
        '</span><span>' + (igual ? '💞' : '🔀') + '</span></div><div class="h-det"><span class="c-cami">Cami:</span> ' + esc(q['opcion' + r.cami]) +
        ' · <span class="c-rodri">Rodri:</span> ' + esc(q['opcion' + r.rodri]) + '</div></div>';
    });
    return filas ? '<h2 class="paso">Historial</h2><div class="tarjeta historial">' + filas + '</div>' : '';
  }

  /* ---------- 3. ¿Cuánto me conoces? ---------- */
  function vistaConoces() {
    if (!TURNOS.length) return sinContenido('conoces', 'preguntas');
    var K = S.conoces, st = statsConoces(), h = cabecera('conoces');
    h += marcador2(st.cami, st.rodri) +
      '<div class="stats3"><div><b>' + st.ok + '</b><span>Acertadas</span></div><div><b>' + st.mal + '</b><span>Incorrectas</span></div><div><b>' +
      st.pct + '%</b><span>Aciertos</span></div></div>';
    h += reglas([
      'Cada pregunta dice quién responde y sobre quién se pregunta.',
      'Quien responde lo dice en voz alta.',
      'La persona sobre la que se pregunta confirma si acertó.',
      '1 punto por respuesta correcta, 0 si no.'
    ], st.total === 0 && K.i === 0);

    if (K.i >= TURNOS.length) {
      h += '<div class="tarjeta final"><div class="final-emoji">🏁</div><h2>¡Terminaron!</h2>' +
        '<p>Cami: <b>' + st.cami + '</b> pts · Rodri: <b>' + st.rodri + '</b> pts</p><p>' + st.pct + '% de aciertos</p></div>' +
        '<button class="btn btn-sec" data-a="conAtras">‹ Revisar la última</button>';
    } else {
      var t = TURNOS[K.i];
      h += '<div class="roles"><span>Responde <span class="tag-j ' + t.responde + '">' + NOM[t.responde] + '</span></span>' +
        '<span>Sobre <span class="tag-j ' + t.sobre + '">' + NOM[t.sobre] + '</span></span></div>' +
        '<div class="carta sec-conoces"><div class="carta-num">Pregunta ' + (K.i + 1) + ' de ' + TURNOS.length + '</div>' +
        '<div class="carta-txt">' + esc(t.texto) + '</div></div>';
      if (t.respuesta) {
        h += '<details class="resp-guardada"><summary>👀 Ver respuesta guardada</summary><p>' + esc(t.respuesta) + '</p></details>';
      }
      h += '<p class="turno">' + NOM[t.sobre] + ', ¿acertó ' + NOM[t.responde] + '?</p>' +
        '<div class="dos-btn"><button class="btn btn-ok" data-a="conMarcar" data-v="1">✓ Acertó</button>' +
        '<button class="btn btn-no" data-a="conMarcar" data-v="0">✗ No acertó</button></div>';
      if (K.i > 0) h += '<button class="btn btn-sec" data-a="conAtras">‹ Pregunta anterior</button>';
    }

    var filas = '';
    TURNOS.forEach(function (t, i) {
      var r = K.res[i];
      if (r !== true && r !== false) return;
      filas += '<div class="h-fila"><span class="h-num">' + (i + 1) + '</span><span class="h-txt">' + esc(t.texto) +
        ' <span class="suave">· ' + NOM[t.responde] + '</span></span><span>' + (r ? '✅' : '❌') + '</span></div>';
    });
    if (filas) h += '<h2 class="paso">Historial</h2><div class="tarjeta historial">' + filas + '</div>';
    return h;
  }

  /* ---------- 4. La canción tiene una historia ---------- */
  function vistaHistoria() {
    return cabecera('historia', false) +
      '<div class="carta sec-historia grande"><div class="final-emoji">📻</div>' +
      '<div class="carta-txt">Cada canción guarda un recuerdo.</div>' +
      '<p class="carta-sub">Sin puntos, sin prisa: solo historias.</p></div>' +
      '<div class="tarjeta"><h3>¿Cómo se juega?</h3><ol class="lista-pasos">' +
      '<li>Pongan una canción.</li>' +
      '<li>Cada uno piensa qué recuerdo, persona, etapa o experiencia le trae.</li>' +
      '<li>Compartan la historia cuando los dos quieran.</li>' +
      '<li>Variante: intenten adivinar qué canción le recuerda algo especial al otro.</li>' +
      '</ol></div>' +
      '<a class="btn btn-pri sec-historia" href="#/">‹ Volver al menú</a>';
  }

  /* ---------- 5 y 7. Barajas de tarjetas ---------- */
  function vistaBaraja(id, lista, reglasTxt, nombreFin) {
    var B = S[id];
    if (!lista.length) return sinContenido(id, 'tarjetas');
    if (!B.abierta) { B.abierta = true; guardar(); }
    var h = cabecera(id);
    h += reglas(reglasTxt, B.max === 0 && B.pos === 0);
    if (B.pos >= lista.length) {
      h += '<div class="tarjeta final"><div class="final-emoji">🎉</div><h2>¡Terminaron ' + nombreFin + '!</h2>' +
        '<p>Vieron las ' + lista.length + ' tarjetas.</p></div>' +
        '<button class="btn btn-pri sec-' + id + '" data-a="barajar" data-id="' + id + '">🔀 Barajar y empezar de nuevo</button>' +
        '<button class="btn btn-sec" data-a="baraja" data-id="' + id + '" data-d="-1">‹ Tarjeta anterior</button>';
      return h;
    }
    var item = lista[B.orden[B.pos]];
    h += '<div class="carta sec-' + id + ' grande"><div class="carta-num">Tarjeta ' + (B.pos + 1) + ' de ' + lista.length + '</div>' +
      '<div class="carta-txt">' + esc(item.texto) + '</div></div>' +
      '<div class="nav-flechas">' +
      '<button class="flecha" data-a="baraja" data-id="' + id + '" data-d="-1"' + (B.pos === 0 ? ' disabled' : '') + ' aria-label="Anterior">‹</button>' +
      '<span class="puntitos">' + (B.pos + 1) + ' / ' + lista.length + '</span>' +
      '<button class="flecha sec-' + id + '" data-a="baraja" data-id="' + id + '" data-d="1" aria-label="Siguiente">›</button></div>';
    return h;
  }

  /* ---------- 6. Palabras de otros idiomas ---------- */
  function vistaPalabras() {
    var L = C.palabras, W = S.palabras;
    if (!L.length) return sinContenido('palabras', 'palabras');
    var p = puntosPalabras(), h = cabecera('palabras');
    h += marcador2(p.cami, p.rodri);
    h += reglas([
      'Se muestra una palabra en su idioma original.',
      'Intenten adivinar de qué idioma es y qué significa.',
      'Pulsen «Revelar respuesta» para ver idioma, significado y pronunciación.',
      'Marquen quién acertó: 1 punto por idioma y 1 por significado.'
    ], W.i === 0 && !W.revelado && jugadasPalabras() === 0);

    if (W.i >= L.length) {
      var gana = p.cami === p.rodri ? '¡Empate! 🤝' : (p.cami > p.rodri ? '¡Cami gana este juego! 🏆' : '¡Rodri gana este juego! 🏆');
      h += '<div class="tarjeta final"><div class="final-emoji">🌍</div><h2>¡Terminaron las ' + L.length + ' palabras!</h2>' +
        '<p>Cami: <b>' + p.cami + '</b> · Rodri: <b>' + p.rodri + '</b> (de ' + (L.length * 2) + ' posibles)</p><p>' + gana + '</p></div>' +
        '<button class="btn btn-sec" data-a="palAtras">‹ Revisar la última</button>';
      return h;
    }
    var w = L[W.i];
    h += '<div class="carta sec-palabras grande"><div class="carta-num">Palabra ' + (W.i + 1) + ' de ' + L.length + '</div>' +
      '<div class="carta-palabra">' + esc(w.palabra) + '</div>' +
      '<p class="carta-sub">¿Qué idioma es? ¿Qué significa?</p></div>';
    if (!W.revelado) {
      h += '<button class="btn btn-pri sec-palabras" data-a="revelar">👀 Revelar respuesta</button>';
      if (W.i > 0) h += '<button class="btn btn-sec" data-a="palAtras">‹ Palabra anterior</button>';
    } else {
      var x = W.pts[W.i] || { cami: { idioma: false, sig: false }, rodri: { idioma: false, sig: false } };
      h += '<div class="tarjeta respuesta">' +
        '<div class="r-fila"><span>Idioma</span><b>' + esc(w.idioma) + '</b></div>' +
        '<div class="r-fila"><span>Significado</span><b>' + esc(w.significado) + '</b></div>' +
        '<div class="r-fila"><span>Se pronuncia</span><b>«' + esc(w.pronunciacion) + '»</b></div></div>' +
        '<h2 class="paso">¿Quién acertó?</h2><div class="tarjeta">';
      JUG.forEach(function (j) {
        h += '<div class="cat-fila"><span class="tag-j ' + j + '">' + NOM[j] + '</span><div class="opciones">' +
          '<button class="opc' + (x[j].idioma ? ' sel' : '') + '" data-a="palPunto" data-j="' + j + '" data-k="idioma">' + (x[j].idioma ? '✓ ' : '') + 'Idioma</button>' +
          '<button class="opc' + (x[j].sig ? ' sel' : '') + '" data-a="palPunto" data-j="' + j + '" data-k="sig">' + (x[j].sig ? '✓ ' : '') + 'Significado</button>' +
          '</div></div>';
      });
      h += '</div><button class="btn btn-pri sec-palabras" data-a="palSig">' + (W.i + 1 < L.length ? 'Siguiente palabra ›' : 'Ver resultado final ›') + '</button>';
      if (W.i > 0) h += '<button class="btn btn-sec" data-a="palAtras">‹ Palabra anterior</button>';
    }
    return h;
  }

  /* ---------- Resumen final ---------- */
  function vistaResumen() {
    var m = puntosMusica(), pf = statsPrefieres(), co = statsConoces(), pa = puntosPalabras();
    function bloque(icono, titulo, cuerpo) {
      return '<div class="tarjeta resumen-b"><h3>' + icono + ' ' + titulo + '</h3>' + cuerpo + '</div>';
    }
    return '<header class="cab sec-resumen"><a class="cab-volver" href="#/" aria-label="Volver">‹</a><h1>📊 Resumen de la partida</h1><span class="cab-hueco"></span></header>' +
      bloque('🎵', 'La siguiente canción', marcador2(m.cami, m.rodri) + '<p class="suave">' + S.musica.rondas.length + ' canciones jugadas</p>') +
      bloque('⚖️', '¿Qué prefieres?', '<p class="grande-num">' + pf.coinciden + ' de ' + pf.total + '</p><p class="suave">coincidencias · ' + pf.pct + '% · ' + pf.diferentes + ' diferentes</p>') +
      bloque('💭', '¿Cuánto me conoces?', marcador2(co.cami, co.rodri) + '<p class="suave">' + co.ok + ' acertadas · ' + co.mal + ' incorrectas · ' + co.pct + '% de aciertos</p>') +
      bloque('🌍', 'Palabras de otros idiomas', marcador2(pa.cami, pa.rodri) + '<p class="suave">' + jugadasPalabras() + ' de ' + C.palabras.length + ' palabras jugadas</p>') +
      bloque('📻', 'La canción tiene una historia', '<p class="suave">' + POR_ID.historia.estado() + '</p>') +
      bloque('🔮', 'Nuestra vida si…', '<p class="suave">' + POR_ID.vida.estado() + '</p>') +
      bloque('🚗', 'Retos ligeros de carretera', '<p class="suave">' + POR_ID.retos.estado() + '</p>') +
      '<p class="nota-pie">Cada juego tiene su propio sistema de puntos, así que no hay un ganador absoluto: ganaron los dos el viaje 💛</p>' +
      '<a class="btn btn-sec" href="#/">‹ Volver al menú</a>';
  }

  /* ---------------------------------------------------------- acciones */
  var ACC = {
    reiniciarTodo: function () {
      confirmar('¿Reiniciar toda la partida?', 'Se borrarán todos los marcadores, respuestas y tarjetas vistas.', function () {
        Object.keys(NUEVO).forEach(function (k) { S[k] = NUEVO[k](); });
        guardar(); render();
      });
    },
    reiniciarJuego: function (d) {
      confirmar('¿Reiniciar «' + POR_ID[d.id].nombre + '»?', 'Se borrarán los resultados de este juego. Los demás no cambian.', function () {
        S[d.id] = NUEVO[d.id](); guardar(); render(true);
      });
    },
    // Música
    pred: function (d) {
      var p = S.musica.pred[d.j]; p[d.k] = p[d.k] === d.v ? '' : d.v; guardar(); render();
    },
    escuchar: function () { S.musica.fase = 'resultado'; guardar(); render(true); },
    volverPred: function () { S.musica.fase = 'prediccion'; guardar(); render(true); },
    okMusica: function (d) { var a = S.musica.ok[d.j]; a[+d.c] = !a[+d.c]; guardar(); render(); },
    guardarCancion: function () {
      var M = S.musica;
      M.rondas.push({ cancion: M.cancion, pred: M.pred, ok: M.ok, t: Date.now() });
      var r = NUEVO.musica(); M.fase = r.fase; M.pred = r.pred; M.ok = r.ok; M.cancion = '';
      guardar(); render(true); aviso('🎵 ¡Canción guardada!');
    },
    // Qué prefieres
    elegir: function (d) {
      var P = S.prefieres, r = P.resp[P.i] || {};
      r[P.paso] = +d.v; P.resp[P.i] = r;
      P.paso = P.paso === 'cami' ? 'rodri' : 'revelar';
      guardar(); render();
    },
    prefAtras: function () { S.prefieres.paso = 'cami'; S.prefieres.resp[S.prefieres.i] = null; guardar(); render(); },
    prefRepetir: function () { ACC.prefAtras(); },
    prefSig: function () {
      var P = S.prefieres; P.i++;
      // Saltar preguntas ya respondidas (por ejemplo, tras ampliar el contenido)
      while (P.i < C.quePrefieres.length && P.resp[P.i] && P.resp[P.i].cami && P.resp[P.i].rodri) P.i++;
      P.paso = 'cami'; guardar(); render(true);
    },
    // Cuánto me conoces
    conMarcar: function (d) {
      var K = S.conoces; K.res[K.i] = d.v === '1'; K.i++; guardar(); render(true);
      aviso(d.v === '1' ? '✅ +1 punto' : '❌ Sin punto');
    },
    conAtras: function () { var K = S.conoces; if (K.i > 0) { K.i--; K.res[K.i] = null; } guardar(); render(true); },
    // Barajas
    baraja: function (d) {
      var B = S[d.id], n = d.id === 'vida' ? C.nuestraVidaSi.length : C.retos.length;
      B.pos = Math.max(0, Math.min(n, B.pos + (+d.d)));
      if (B.pos < n) B.max = Math.max(B.max, B.pos); else B.max = n - 1;
      guardar(); render();
    },
    barajar: function (d) {
      S[d.id] = NUEVO[d.id](); S[d.id].abierta = true; guardar(); render(true);
    },
    // Palabras
    revelar: function () {
      var W = S.palabras; W.revelado = true;
      if (!W.pts[W.i]) W.pts[W.i] = { cami: { idioma: false, sig: false }, rodri: { idioma: false, sig: false } };
      guardar(); render();
    },
    palPunto: function (d) { var x = S.palabras.pts[S.palabras.i]; x[d.j][d.k] = !x[d.j][d.k]; guardar(); render(); },
    palSig: function () { var W = S.palabras; W.i++; W.revelado = !!(W.pts[W.i]); guardar(); render(true); },
    palAtras: function () { var W = S.palabras; if (W.i > 0) W.i--; W.revelado = !!W.pts[W.i]; guardar(); render(true); }
  };

  /* --------------------------------------------------- modal y avisos */
  function confirmar(titulo, texto, si) {
    var m = document.createElement('div');
    m.className = 'modal-fondo';
    m.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><h2>' + esc(titulo) + '</h2><p>' + esc(texto) + '</p>' +
      '<div class="dos-btn"><button class="btn btn-sec" data-m="no">Cancelar</button><button class="btn btn-peligro" data-m="si">Sí, borrar</button></div></div>';
    m.addEventListener('click', function (e) {
      var b = e.target.closest('[data-m]');
      if (e.target === m || b) { m.remove(); if (b && b.dataset.m === 'si') si(); }
    });
    document.body.appendChild(m);
  }
  var tAviso;
  function aviso(txt) {
    var a = document.getElementById('aviso');
    a.textContent = txt; a.classList.add('ver');
    clearTimeout(tAviso); tAviso = setTimeout(function () { a.classList.remove('ver'); }, 1400);
  }

  /* ---------------------------------------------------------- router */
  var VISTAS = {
    '': vistaInicio, musica: vistaMusica, prefieres: vistaPrefieres, conoces: vistaConoces, historia: vistaHistoria,
    vida: function () {
      return vistaBaraja('vida', C.nuestraVidaSi, [
        'Lean el escenario en voz alta.',
        'Conversen: ¿qué harían?, ¿cómo cambiaría su vida?',
        'Usen las flechas para avanzar o volver. Las tarjetas no se repiten en la partida.'
      ], 'los escenarios');
    },
    palabras: vistaPalabras,
    retos: function () {
      return vistaBaraja('retos', C.retos, [
        'Lean el reto en voz alta.',
        'Resuélvanlo conversando, sin prisa y sin puntos.',
        'Usen las flechas para avanzar o volver.'
      ], 'los retos');
    },
    resumen: vistaResumen
  };
  var rutaPrevia = null;
  function ruta() { return location.hash.replace(/^#\/?/, ''); }
  function render(arriba) {
    var r = ruta();
    if (!VISTAS[r]) r = '';
    if (r === 'historia' && !S.historia.visto) { S.historia.visto = true; guardar(); }
    var y = window.scrollY;
    app.innerHTML = '<div class="vista">' + VISTAS[r]() + '</div>';
    document.body.dataset.ruta = r || 'inicio';
    if (arriba === true || r !== rutaPrevia) window.scrollTo(0, 0); else window.scrollTo(0, y);
    rutaPrevia = r;
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-a]');
    if (!el || el.disabled) return;
    var f = ACC[el.dataset.a];
    if (f) { e.preventDefault(); f(el.dataset); }
  });
  document.addEventListener('input', function (e) {
    var path = e.target.dataset && e.target.dataset.in;
    if (!path) return;
    var partes = path.split('.'), o = S;
    for (var i = 0; i < partes.length - 1; i++) o = o[partes[i]];
    o[partes[partes.length - 1]] = e.target.value;
    guardar();
  });
  window.addEventListener('hashchange', function () { render(true); });
  window.addEventListener('pagehide', guardar);

  render(true);

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* sin SW */ });
    });
  }
})();
