/* =====================================================================
   ROAD TRIP — CONTENIDO EDITABLE
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para cargar las preguntas,
   escenarios y palabras definitivas.

   - Reemplaza los elementos marcados con  ejemplo: true  por el
     contenido real (y borra esa línea "ejemplo: true").
   - Mantén las comillas, las comas y las llaves { } tal cual.
   - Puedes poner más o menos elementos: la app cuenta solos los que haya.
   - Después de editar, sube el cambio (git push). La próxima vez que
     abran la app con internet se actualizará sola.
   ===================================================================== */

window.CONTENIDO = {

  /* -------------------------------------------------------------------
     SECCIÓN 2 · ¿QUÉ PREFIERES?  (20 preguntas)
     Formato:
       { pregunta: "¿Qué prefieres?", opcion1: "...", opcion2: "..." },
     ------------------------------------------------------------------- */
  quePrefieres: [
    { pregunta: "¿Qué prefieres?", opcion1: "Un viaje por carretera con paradas sorpresa", opcion2: "Llegar directo al destino en avión" },
    { pregunta: "¿Qué prefieres?", opcion1: "Comer tacos callejeros buenísimos", opcion2: "Ir a un restaurante de autor elegante" },
    { pregunta: "¿Qué prefieres?", opcion1: "Vivir en una casa en la playa con mucho calor", opcion2: "Vivir en una cabaña en el bosque con frío" },
    { pregunta: "¿Qué prefieres?", opcion1: "Ver una maratón completa de películas de acción", opcion2: "Ver una serie de misterio/crímenes" },
    { pregunta: "¿Qué prefieres?", opcion1: "Tener superpoderes de vuelo", opcion2: "Poder teletransportarte a cualquier parte del mundo" },
    { pregunta: "¿Qué prefieres?", opcion1: "Un fin de semana completo de acampada sin señal", opcion2: "Un fin de semana en un hotel de lujo con todo incluido" },
    { pregunta: "¿Qué prefieres?", opcion1: "Escuchar música de los 80 todo el día", opcion2: "Escuchar solo música instrumental clásica" },
    { pregunta: "¿Qué prefieres?", opcion1: "Cocinar siempre la cena en casa", opcion2: "Pedir comida a domicilio todos los días" },
    { pregunta: "¿Qué prefieres?", opcion1: "Una tarde entera de juegos de mesa y cartas", opcion2: "Salir a caminar sin rumbo fijo por la ciudad" },
    { pregunta: "¿Qué prefieres?", opcion1: "Madrugar muchísimo para ver el amanecer", opcion2: "Desvelarte viendo las estrellas" },
    { pregunta: "¿Qué prefieres?", opcion1: "Que siempre sea temporada de invierno para usar suéteres cómodos", opcion2: "Que siempre sea temporada de calor para usar ropa ligera" },
    { pregunta: "¿Qué prefieres?", opcion1: "Viajar con un itinerario súper detallado", opcion2: "Improvisar cada día según se antoje" },
    { pregunta: "¿Qué prefieres?", opcion1: "Tener siempre la razón en una discusión", opcion2: "Que nunca te den migraña ni dolor de cabeza" },
    { pregunta: "¿Qué prefieres?", opcion1: "Leer un libro increíble en una tarde lluviosa", opcion2: "Ver una película clásica en el cine" },
    { pregunta: "¿Qué prefieres?", opcion1: "Aprender a tocar cualquier instrumento musical a la perfección", opcion2: "Hablar fluidamente cinco idiomas" },
    { pregunta: "¿Qué prefieres?", opcion1: "Comer postre antes de la comida principal", opcion2: "Saltarte el postre y repetir plato fuerte" },
    { pregunta: "¿Qué prefieres?", opcion1: "Vivir en una ciudad grande con mucho movimiento", opcion2: "Vivir en un pueblo tranquilo y tradicional" },
    { pregunta: "¿Qué prefieres?", opcion1: "Tener un perro muy activo", opcion2: "Tener un gato muy independiente" },
    { pregunta: "¿Qué prefieres?", opcion1: "Viajar al pasado para conocer una época histórica", opcion2: "Viajar al futuro para ver los avances" },
    { pregunta: "¿Qué prefieres?", opcion1: "Que todas tus comidas sepan ligeramente a limón", opcion2: "Que todas tus comidas sepan ligeramente a picante" },
  ],

  /* -------------------------------------------------------------------
     SECCIÓN 3 · ¿CUÁNTO ME CONOCES?  (20 preguntas)
     Formato:
       { pregunta: "¿Cuál es la comida favorita de Cami?", sobre: "cami", respuesta: "..." },
       { pregunta: "¿Cuál es la película favorita de Rodri?", sobre: "rodri", respuesta: "..." },
     - sobre: "cami"  -> responde Rodri, Cami confirma.
     - sobre: "rodri" -> responde Cami, Rodri confirma.
     - sobre: "ambos" -> se juega dos veces (primero sobre Cami y luego
       sobre Rodri). Escribe {nombre} donde va el nombre:
       { pregunta: "¿Cuál es la comida favorita de {nombre}?", sobre: "ambos",
         respuesta: { cami: "...", rodri: "..." } },
     - {a} se cambia por "a" para Cami y "o" para Rodri (concentrad{a}).
     - Si la pregunta está en primera persona ("¿Cuál es mi...?"), la lee
       en voz alta la persona sobre la que se pregunta.
     - respuesta es OPCIONAL. Si la dejas vacía (""), la persona sobre la
       que se pregunta confirma de viva voz si acertaron.
     ------------------------------------------------------------------- */
  cuantoMeConoces: [
    { pregunta: "Si tuviéramos que pedir comida rápida ahorita mismo, ¿qué platillo o ingrediente jamás pediría yo?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cuál es mi película o saga cinematográfica favorita de todos los tiempos?", sobre: "ambos", respuesta: "" },
    { pregunta: "Si pudiera elegir un solo género musical para escuchar el resto de mi vida, ¿cuál sería?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cuál es mi mayor manía o costumbre rara cuando estoy concentrad{a} trabajando o programando?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Qué sabor de helado o postre elijo siempre sin pensarlo?", sobre: "ambos", respuesta: "" },
    { pregunta: "Si nos ganáramos la lotería hoy mismo, ¿qué es lo primero que compraría o haría?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cuál es mi estación del año favorita y por qué?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cómo es exactamente mi café o bebida matutina ideal (azúcar, leche, temperatura)?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cuál fue el último libro, artículo o tema del que estuve investigando horas por puro gusto?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cuál es la app o red social que más abro por aburrimiento durante el día?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cuál dirías que es mi mayor miedo o fobia tonta?", sobre: "ambos", respuesta: "" },
    { pregunta: "Si tuviera que elegir un solo hobby creativo para practicar toda la semana (diseñar, escribir, armar algo), ¿cuál elegiría?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Qué color predomina más en mi ropa de diario?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cuál es mi recuerdo de infancia favorito que te haya contado?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cómo reacciono normalmente cuando tengo hambre y se me pasa la hora de comer?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Qué tipo de clima me pone de mejor humor?", sobre: "ambos", respuesta: "" },
    { pregunta: "Si me regalaran un boleto para un concierto hoy, ¿de qué artista o banda sería?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cuál es mi snack o botana favorita para ver una película?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Prefiero mil veces organizar todo con semanas de anticipación o que me den sorpresas de último minuto?", sobre: "ambos", respuesta: "" },
    { pregunta: "¿Cuál dirías que es mi mayor virtud o lo que más valoro en una persona?", sobre: "ambos", respuesta: "" },
  ],

  /* -------------------------------------------------------------------
     SECCIÓN 5 · NUESTRA VIDA SI…  (10 escenarios)
     Formato:
       { texto: "Nuestra vida si ..." },
     ------------------------------------------------------------------- */
  nuestraVidaSi: [
    { texto: "Nuestra vida si decidiéramos dejarlo todo e irnos a vivir a un pueblito cafetalero en la montaña: ¿a qué nos dedicaríamos?" },
    { texto: "Nuestra vida si abriéramos un negocio propio juntos (un café, una tienda temática o un estudio de desarrollo): ¿cómo se llamaría y qué venderíamos?" },
    { texto: "Nuestra vida si de la noche a la mañana nos volviéramos expertos cocineros de alta cocina: ¿cuál sería nuestra especialidad culinaria?" },
    { texto: "Nuestra vida si tuviéramos una máquina del tiempo y pudiéramos vivir en cualquier década pasada: ¿en qué año nos quedaríamos a vivir?" },
    { texto: "Nuestra vida si nos tocara viajar por el mundo mochileando con una sola maleta pequeña: ¿cuál sería lo primero que meterías a fuerza?" },
    { texto: "Nuestra vida si fuéramos personajes dentro de una novela de fantasía épica: ¿qué rol o clase tendríamos cada uno en el grupo?" },
    { texto: "Nuestra vida si construyéramos la casa de nuestros sueños desde cero: ¿qué detalle o espacio extravagante no podría faltar?" },
    { texto: "Nuestra vida si decidiéramos adoptar una mascota exótica: ¿qué animal sería y cómo se llamaría?" },
    { texto: "Nuestra vida si nos volviéramos creadores de contenido virales: ¿de qué temática absurda sería nuestro canal?" },
    { texto: "Nuestra vida si tuviéramos que vivir en el universo de una película animada clásica: ¿en cuál encajaríamos mejor?" },
  ],

  /* -------------------------------------------------------------------
     SECCIÓN 6 · PALABRAS DE OTROS IDIOMAS
     Formato:
       { palabra: "...", idioma: "...", significado: "...", pronunciacion: "..." },
     ------------------------------------------------------------------- */
  palabras: [
    { palabra: "Schadenfreude", idioma: "Alemán", significado: "Alegría por la desgracia ajena.", pronunciacion: "SHÁ-den-froi-de" },
    { palabra: "Fernweh", idioma: "Alemán", significado: "Nostalgia por lugares lejanos que aún no conoces.", pronunciacion: "FÉRN-vee" },
    { palabra: "Saudade", idioma: "Portugués", significado: "Melancolía profunda por alguien o algo ausente que quizás no regrese.", pronunciacion: "sau-DÁ-de (en Brasil: sau-DÁ-chi)" },
    { palabra: "Wanderlust", idioma: "Alemán", significado: "Deseo irrefrenable de viajar y explorar el mundo.", pronunciacion: "VÁN-der-lust" },
    { palabra: "Hygge", idioma: "Danés", significado: "Sensación de bienestar, comodidad y calidez en las pequeñas cosas cotidianas.", pronunciacion: "JÚ-gue (j suave)" },
    { palabra: "Komorebi", idioma: "Japonés", significado: "La luz del sol filtrándose a través de las hojas de los árboles.", pronunciacion: "ko-mo-RÉ-bi" },
    { palabra: "Tsundoku", idioma: "Japonés", significado: "Comprar libros y dejarlos amontonados sin leerlos (¡muy relatable!).", pronunciacion: "tsun-DÓ-ku" },
    { palabra: "Meraki", idioma: "Griego", significado: "Hacer algo con el alma, creatividad o amor, dejando un pedazo de ti en ello.", pronunciacion: "me-RÁ-ki" },
    { palabra: "Waldeinsamkeit", idioma: "Alemán", significado: "El sentimiento de estar solo en medio del bosque y en paz con la naturaleza.", pronunciacion: "VALT-áin-sam-kait" },
    { palabra: "Sobremesa", idioma: "Español", significado: "El tiempo que te quedas platicando en la mesa después de terminar de comer.", pronunciacion: "so-bre-MÉ-sa" },
    { palabra: "Lagom", idioma: "Sueco", significado: "Ni muy poco, ni mucho; exactamente la cantidad justa y equilibrada.", pronunciacion: "LÁ-gom" },
    { palabra: "Gigil", idioma: "Tagalo", significado: "Las ganas irrefrenables de apretar o pellizcar algo o alguien porque es muy tierno.", pronunciacion: "gui-GUIL" },
    { palabra: "Ubuntu", idioma: "Bantú", significado: "\"Soy porque nosotros somos\": la creencia en un enlace universal de humanidad.", pronunciacion: "u-BÚN-tu" },
    { palabra: "Tartle", idioma: "Gaélico escocés", significado: "El momento de duda en el que vas a presentar a alguien y de repente olvidas su nombre.", pronunciacion: "TÁR-tel" },
    { palabra: "Ikigai", idioma: "Japonés", significado: "La razón de ser o la motivación principal para levantarse todas las mañanas.", pronunciacion: "i-ki-GÁI" },
    { palabra: "Cafuné", idioma: "Portugués", significado: "Pasar los dedos suavemente por el cabello de la persona que amas.", pronunciacion: "ka-fu-NÉ" },
    { palabra: "Forelsket", idioma: "Noruego/Danés", significado: "La euforia y mariposas en el estómago al principio de estar enamorado.", pronunciacion: "fo-RÉLS-ket" },
    { palabra: "Mitate", idioma: "Japonés", significado: "Ver un objeto cotidiano y usarlo o imaginarlo como otra cosa diferente.", pronunciacion: "mi-TÁ-te" },
    { palabra: "Jayus", idioma: "Indonesio", significado: "Un chiste tan malo y sin gracia que te da risa de lo absurdo que es.", pronunciacion: "YÁ-yus" },
    { palabra: "Pochemuchka", idioma: "Ruso", significado: "Una persona que hace demasiadas preguntas todo el tiempo.", pronunciacion: "pa-che-MÚCH-ka" },
    { palabra: "Culaccino", idioma: "Italiano", significado: "La marca húmeda que deja un vaso frío sobre la mesa.", pronunciacion: "ku-la-CHÍ-no" },
    { palabra: "Utepils", idioma: "Noruego", significado: "Sentarse afuera a disfrutar de una buena bebida bajo el sol.", pronunciacion: "Ú-te-pils" },
    { palabra: "Gufra", idioma: "Árabe", significado: "La cantidad de agua que cabe exactamente en el hueco de ambas manos juntas.", pronunciacion: "GÚF-ra" },
    { palabra: "Goya", idioma: "Urdu", significado: "La suspensión temporal de la incredulidad ante una historia tan buena que parece real.", pronunciacion: "GÓ-ya" },
    { palabra: "Wabi-sabi", idioma: "Japonés", significado: "Encontrar la belleza en la imperfección y en lo transitorio de las cosas.", pronunciacion: "UÁ-bi SÁ-bi" },
    { palabra: "Litost", idioma: "Checo", significado: "Un estado de agonía y tormento interno provocado por darte cuenta de tu propia miseria.", pronunciacion: "LÍ-tost" },
    { palabra: "Schlimmbesserung", idioma: "Alemán", significado: "Un intento de mejorar algo que termina empeorándolo aún más.", pronunciacion: "SHLIM-bé-se-rung" },
    { palabra: "Figensansa", idioma: "Danés", significado: "Esa pequeña timidez o vacilación antes de aceptar algo que en el fondo deseas mucho.", pronunciacion: "fi-guen-SÁN-sa" },
    { palabra: "Mångata", idioma: "Sueco", significado: "El reflejo de la luz de la luna en forma de camino dorado sobre el agua.", pronunciacion: "MÓN-ga-ta" },
    { palabra: "Yugen", idioma: "Japonés", significado: "Una conciencia profunda del universo que provoca una emoción hermosa y misteriosa.", pronunciacion: "YÚ-guen" },
    { palabra: "Stracchino", idioma: "Italiano", significado: "Estar cansado de tanto caminar o viajar (derivado de cansancio).", pronunciacion: "stra-KÍ-no" },
    { palabra: "Vergüenza ajena", idioma: "Español", significado: "Sentir pena por algo vergonzoso que hace otra persona.", pronunciacion: "ver-GÜEN-sa a-JÉ-na" },
    { palabra: "Radachiy", idioma: "Ruso", significado: "La alegría silenciosa de estar a solas o con alguien sin necesidad de hablar.", pronunciacion: "ra-DÁ-chii" },
    { palabra: "Gezellig", idioma: "Neerlandés", significado: "Un ambiente acogedor, cálido y de compañía agradable (versión holandesa del hygge).", pronunciacion: "je-SÉ-lij (j suave)" },
    { palabra: "Nunchi", idioma: "Coreano", significado: "El arte sutil de medir el estado de ánimo de los demás en una habitación.", pronunciacion: "NÚN-chi" },
    { palabra: "Pana", idioma: "Rumano", significado: "Quedarse varado o sin batería/gasolina en medio de la carretera.", pronunciacion: "PÁ-na" },
    { palabra: "Commuovere", idioma: "Italiano", significado: "Algo que te conmueve tanto que te hace llorar de emoción.", pronunciacion: "kom-MUÓ-ve-re" },
    { palabra: "Cui Dez", idioma: "Francés", significado: "La inspiración repentina que te viene a la mente justo cuando te vas a dormir.", pronunciacion: "kui DES" },
    { palabra: "Mamihlapinatapai", idioma: "Yagán", significado: "La mirada cómplice entre dos personas que desean lo mismo, pero ninguna se atreve a dar el primer paso.", pronunciacion: "ma-mi-la-pi-na-TÁ-pai" },
    { palabra: "Hanyauku", idioma: "Namibio", significado: "Caminar de puntitas sobre la arena caliente.", pronunciacion: "jan-ya-Ú-ku" },
    { palabra: "Pornhic", idioma: "Galés", significado: "Un chiste o anécdota tan repetida en familia que ya nadie se ríe, pero se sigue contando.", pronunciacion: "PÓR-nik" },
    { palabra: "Luftmensch", idioma: "Ídish", significado: "Una persona soñadora, con la cabeza en las nubes y los pies despegados de la tierra.", pronunciacion: "LUFT-mensh" },
    { palabra: "Merak", idioma: "Serbio", significado: "El placer que se encuentra en las cosas más simples de la vida.", pronunciacion: "MÉ-rak" },
    { palabra: "Kirigami", idioma: "Japonés", significado: "El arte de cortar y doblar papel para crear formas.", pronunciacion: "ki-ri-GÁ-mi" },
    { palabra: "Sgriob", idioma: "Gaélico", significado: "La comezón que te da en el labio justo antes de besar a alguien.", pronunciacion: "SGRIB" },
    { palabra: "Tingo", idioma: "Rapa Nui", significado: "Pedir prestadas cosas de la casa de un amigo poco a poco hasta quedártelas.", pronunciacion: "TÍN-go" },
    { palabra: "Iktsuarpok", idioma: "Inuit", significado: "La sensación de impaciencia al esperar a que alguien llegue a tu casa y salir a mirar si ya viene.", pronunciacion: "ik-TSUAR-pok" },
    { palabra: "Ataboh", idioma: "Árabe", significado: "El aroma a tierra mojada después de que empieza a llover (la petricor universal).", pronunciacion: "a-ta-BÓ" },
    { palabra: "Kilig", idioma: "Tagalo", significado: "Sentir mariposas en el estómago y una emoción incontrolable ante algo romántico.", pronunciacion: "KÍ-lig" },
  ],

  /* -------------------------------------------------------------------
     SECCIÓN 7 · RETOS LIGEROS DE CARRETERA  (las que quieran)
     Formato:
       { texto: "..." },
     Estos cinco son los ejemplos del documento del proyecto.
     ------------------------------------------------------------------- */
  retos: [
    { texto: "Recuerden una película que ambos hayan visto.", ejemplo: true },
    { texto: "Si pudieran detenerse en cualquier restaurante, ¿qué comida pedirían?", ejemplo: true },
    { texto: "Intenten recordar una canción de la infancia.", ejemplo: true },
    { texto: "Describan un destino al que les gustaría viajar.", ejemplo: true },
    { texto: "¿Qué personaje de ficción sería el mejor compañero de viaje?", ejemplo: true },
  ],
};
