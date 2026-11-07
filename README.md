# 🚗 ROAD TRIP — Nuestra aventura en carretera

App de juegos para **Cami y Rodri** en un viaje largo en carro. Funciona **100 % sin internet** una vez instalada, sin cuentas ni servicios externos. Todo se guarda en el teléfono.

## Juegos

| # | Juego | Puntuación |
|---|-------|-----------|
| 1 | 🎵 La siguiente canción | 1 pt por acierto (máx. 4 por canción) |
| 2 | ⚖️ ¿Qué prefieres? | Coincidencias de la pareja (no puntos) |
| 3 | 💭 ¿Cuánto me conoces? | 1 pt por respuesta correcta |
| 4 | 📻 La canción tiene una historia | Sin puntos |
| 5 | 🔮 Nuestra vida si… | Sin puntos |
| 6 | 🌍 Palabras de otros idiomas | 1 pt idioma + 1 pt significado |
| 7 | 🚗 Retos ligeros de carretera | Sin puntos |

Cada juego tiene su propio marcador, se puede reiniciar por separado y hay un resumen final de la partida. Si la app se cierra, al abrirla sigue donde iba.

## ✏️ Cargar las preguntas, escenarios y palabras

Todo el contenido está en **un solo archivo**: [`data/contenido.js`](data/contenido.js).
Ahí hay elementos de ejemplo marcados con `ejemplo: true`; reemplázalos por el contenido real. En la portada, las fichas muestran «Contenido de ejemplo» mientras quede alguno.

## 📲 Instalar en el teléfono (hacerlo ANTES del viaje, con internet)

1. **Publicar** (una sola vez): en GitHub → *Settings → Pages → Build and deployment → Source: GitHub Actions*. Al hacer merge a `main` se publica en
   `https://<usuario>.github.io/Road-trip/`.
2. **Android (Chrome):** abrir la dirección → menú ⋮ → **Instalar app** / *Agregar a la pantalla principal*.
3. **iPhone (Safari):** abrir la dirección → botón Compartir → **Agregar a inicio**.
4. Abrir la app una vez desde el ícono. Comprobación: activar **modo avión** y abrirla otra vez; debe funcionar.

Si después se actualiza el contenido, basta con abrir la app con internet: se descarga sola y se ve la siguiente vez que se abra.

## Probar en el computador

```bash
python3 -m http.server 8000   # y abrir http://localhost:8000
```

Sin dependencias ni compilación: HTML + CSS + JavaScript, con un *service worker* (`sw.js`) para el modo offline.
