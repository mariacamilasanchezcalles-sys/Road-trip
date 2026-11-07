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
    { pregunta: "¿Qué prefieres? (pregunta de ejemplo)", opcion1: "Opción A de ejemplo", opcion2: "Opción B de ejemplo", ejemplo: true },
    { pregunta: "¿Qué prefieres? (pregunta de ejemplo)", opcion1: "Opción A de ejemplo", opcion2: "Opción B de ejemplo", ejemplo: true },
    { pregunta: "¿Qué prefieres? (pregunta de ejemplo)", opcion1: "Opción A de ejemplo", opcion2: "Opción B de ejemplo", ejemplo: true },
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
     - respuesta es OPCIONAL. Si la dejas vacía (""), la persona sobre la
       que se pregunta confirma de viva voz si acertaron.
     ------------------------------------------------------------------- */
  cuantoMeConoces: [
    { pregunta: "Pregunta de ejemplo sobre {nombre}", sobre: "ambos", respuesta: { cami: "", rodri: "" }, ejemplo: true },
    { pregunta: "Pregunta de ejemplo sobre Cami", sobre: "cami", respuesta: "", ejemplo: true },
  ],

  /* -------------------------------------------------------------------
     SECCIÓN 5 · NUESTRA VIDA SI…  (10 escenarios)
     Formato:
       { texto: "Nuestra vida si ..." },
     ------------------------------------------------------------------- */
  nuestraVidaSi: [
    { texto: "Escenario hipotético de ejemplo 1", ejemplo: true },
    { texto: "Escenario hipotético de ejemplo 2", ejemplo: true },
    { texto: "Escenario hipotético de ejemplo 3", ejemplo: true },
  ],

  /* -------------------------------------------------------------------
     SECCIÓN 6 · PALABRAS DE OTROS IDIOMAS  (50 palabras)
     Formato:
       { palabra: "...", idioma: "...", significado: "...", pronunciacion: "..." },
     ------------------------------------------------------------------- */
  palabras: [
    { palabra: "Palabra 1", idioma: "Idioma de ejemplo", significado: "Significado de ejemplo", pronunciacion: "pa-LA-bra", ejemplo: true },
    { palabra: "Palabra 2", idioma: "Idioma de ejemplo", significado: "Significado de ejemplo", pronunciacion: "pa-LA-bra", ejemplo: true },
    { palabra: "Palabra 3", idioma: "Idioma de ejemplo", significado: "Significado de ejemplo", pronunciacion: "pa-LA-bra", ejemplo: true },
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
