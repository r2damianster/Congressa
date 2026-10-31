# Generador de roll up / póster en SVG vectorial — explicación técnica completa

Documento para replicar en otra aplicación (p. ej. carrerapineuleam) el esquema usado en INEDUS 2026. Origen: `rollup.jsx` (919 líneas), `Roll Up INEDUS 2026.html` y la sección `rollup` de `variants/shared-content-ehu.jsx`.

---

## 1. Qué hace y por qué está hecho así

Genera un cartel (roll up vertical, póster A0–A4, apaisado o medida personalizada) **a tamaño físico exacto** y lo exporta en **PDF vectorial, SVG y PNG**, en varios idiomas, desde el navegador y sin servidor.

Decisiones de fondo:

1. **Un único SVG es la fuente de verdad.** La vista previa en pantalla, el SVG descargado, el PDF y el PNG salen todos del mismo nodo `<svg>`. No hay una versión «de pantalla» y otra «de imprenta».
2. **El texto se convierte en trazados (`<path>`)**, no se usa `<text>`. Así el archivo se ve idéntico en cualquier máquina, sin fuentes instaladas, y la imprenta no tiene que incrustar tipografías. Se hace con `opentype.js`.
3. **El diseño se expresa en «unidades de diseño», no en cm.** El `viewBox` es `0 0 anchoDiseño altoDiseño`, y el tamaño físico se fija solo al exportar (`width="850mm"`). Todos los tamaños (fuente 96, margen 72…) son relativos a ese lienzo.
4. **La maquetación es adaptativa y se calcula, no se dibuja a mano por medida.** Un algoritmo prueba lienzos de distinto ancho hasta que el contenido cabe en la relación de aspecto pedida, y descarta bloques opcionales si no cabe.
5. **Contenido separado del motor.** Los textos viven en un objeto por idioma; el motor de layout no contiene strings del evento.

---

## 2. Dependencias

| Librería | Versión | Para qué |
|---|---|---|
| opentype.js | 1.3.4 | Parsear fuentes, medir texto y obtener contornos (`getPath`) |
| qrcode-generator | 1.4.4 | Matriz de módulos del QR (se dibuja como vectores) |
| jsPDF | 2.5.1 | Crear el PDF con tamaño de página en mm |
| svg2pdf.js | 2.2.4 | Pintar el SVG como vectores dentro del PDF |
| React 18 | 18.3.1 | UI y render del SVG (opcional; el motor es JS puro) |

En INEDUS se cargan por CDN con `<script>` (sin bundler). En una app con bundler (Next.js, Vite) se instalan con npm; ver §11.

Fuentes (formato **.woff**, no woff2 — opentype.js 1.3.4 no lee woff2): se descargan de jsDelivr desde `@fontsource/<familia>/files/<familia>-latin-<peso>-<estilo>.woff`. INEDUS usa 4: sans regular, sans semibold, serif regular, serif italic.

---

## 3. Carga de recursos (antes de calcular nada)

```js
const loadRollupAssets = async () => {
  // Fuentes → objetos opentype
  fonts[name] = opentype.parse(await (await fetch(url)).arrayBuffer());
  // Logos → data URL + tamaño real
  const href = await fetchAsDataUrl(file);          // fetch → blob → FileReader.readAsDataURL
  const { width, height } = await readImageSize(href); // new Image().naturalWidth/Height
  logos[name] = { href, width, height };
};
```

Puntos críticos:

- **Los logos se incrustan como data URL.** Es lo que permite que el SVG exportado sea autónomo y que el PNG se rasterice (una imagen externa dentro de un SVG cargado como `<img>` no se carga).
- **Se guarda el ancho y alto reales** de cada logo; el layout calcula `ancho = (w/h) * altoObjetivo`. Nunca se fijan proporciones a mano.
- Requiere servir por HTTP (`fetch` no funciona con `file://`).
- **Los logos raster se pixelan en formatos grandes.** Usar SVG vectorial siempre que sea posible (el código solo necesita `href`, `width`, `height`).

---

## 4. Motor de texto (el corazón del esquema)

### 4.1 Medir

```js
const measureText = (font, text, size, tracking = 0) => {
  if (!tracking) return font.getAdvanceWidth(text, size);
  return Array.from(text).reduce((total, ch) => total + font.getAdvanceWidth(ch, size) + tracking, -tracking);
};
```

`getAdvanceWidth` aplica kerning. Con `tracking` (espaciado de letras, usado en mayúsculas de etiquetas) se mide carácter a carácter.

### 4.2 Salto de línea

Voraz por palabras: acumula palabras en la línea actual y, cuando `measureText(candidata) > maxWidth`, cierra la línea y empieza otra.

### 4.3 Convertir a trazado

```js
const textPathData = (font, text, x, baselineY, size, tracking = 0) =>
  font.getPath(text, x, baselineY, size).toPathData(2);   // 2 decimales
// con tracking: un getPath por carácter avanzando cursorX += advance + tracking
```

### 4.4 `paragraph` — la función que usa todo

```js
paragraph(font, text, { x, top, size, fill, anchor, maxWidth, lineHeight, tracking })
  → { elements: [{kind:"path", d, fill}, ...], height, lines }
```

- `anchor`: `"start" | "middle" | "end"` determina el `startX` de cada línea a partir de su ancho medido.
- **Baseline** de la línea *i*: `top + i*lineStep + (lineStep + size*0.7)/2`. Es una aproximación (0.7 ≈ altura de versal). Mejora posible: usar `font.ascender/descender` reales.
- Devuelve `height = nLíneas * lineStep`, que es lo que permite apilar bloques sin conocer de antemano cuánto ocupa cada texto.

### 4.5 Ajuste al ancho

`fitTextSize(font, textos, maxSize, maxWidth)` = `min(maxSize, maxWidth / anchoMáximoAlTamaño1)`. Se usa para el título (3 líneas que deben caber) y la URL del pie.

### 4.6 QR vectorial

```js
const qr = qrcode(0, "M"); qr.addData(url); qr.make();
// por cada módulo oscuro: un cuadrado en un ÚNICO path
`M${x} ${y}h${s+0.15}v${s+0.15}h-${s+0.15}z`
```

El `+0.15` solapa módulos vecinos para evitar costuras blancas al rasterizar. Un solo `<path>` mantiene el SVG ligero.

---

## 5. Modelo de elementos

Todo el diseño se reduce a **tres primitivas** con coordenadas en unidades de diseño:

```js
{ kind: "rect",  x, y, width, height, radius, fill, stroke, strokeWidth, opacity }
{ kind: "image", href, x, y, width, height }            // preserveAspectRatio="xMidYMid meet"
{ kind: "path",  d, fill, transformY }                  // texto y QR
```

`transformY` desplaza verticalmente un elemento ya generado (se usa para centrar pilas de texto dentro de una banda sin recalcular coordenadas): `transform="translate(0 transformY)"`.

---

## 6. Bloques

`buildLayoutBlocks({ fonts, logos, content, designWidth, venueLayout })` devuelve un objeto de bloques; cada bloque es `{ height, elements }` **en coordenadas locales** (y = 0 es el borde superior del bloque, no del cartel).

Todo se deriva de `designWidth`: `margin = 72`, `contentWidth = designWidth − 144`, `centerX = designWidth / 2`.

| Bloque | Contenido |
|---|---|
| `header` | Fondo azul con chevron inferior (`path` en V) y una sombra del mismo chevron en color acento 16 u más abajo; logo en píldora blanca; kicker (versalitas, tracking 6); título en 3 líneas serif (la última en cursiva y color acento) con `fitTextSize`; eslogan |
| `dates` | Cifra grande de fechas (serif 200), mes en versalitas, texto «híbrido» |
| `venues` | Dos tarjetas (rect blanco con borde) con etiqueta, logo, nombre, detalle. Modo `"cards"` (lado a lado) o `"rows"` (apiladas, para columnas estrechas) |
| `stats` | N celdas iguales; número serif 96 + etiqueta; divisores verticales entre celdas |
| `lines` | Título + subrayado acento; lista numerada; **píldoras** de formatos con salto de fila automático y centrado por fila |
| `program` | Título; por cada día: píldora azul con «28 OCT», resumen, y línea «Plenarias: nombres» |
| `footer` | Banda azul con tarjeta blanca del QR + «escanea» + web (serif cursiva, `fitTextSize`) + contacto; debajo, franja blanca con los 4 logos repartidos y separadores |
| `headerWide` / `footerWide` | Versiones en una sola franja para formato apaisado (logo · título · fechas / QR · web · panel de logos) |

Patrón repetido en todos: se crean los `paragraph(...)` en orden, se acumula `cursorY += p.height + espacio`, y la altura del bloque es el `cursorY` final. **La altura de cada bloque nace del contenido real**, no es constante.

Para centrar una pila de varios párrafos en una banda: calcular `stackHeight`, `stackTop = (bandHeight − stackHeight)/2` y aplicar `transformY: stackTop + offset` a cada párrafo.

---

## 7. Composición adaptativa (la parte clave)

Entrada: `widthCm`, `heightCm`. Relación `aspectRatio = heightCm / widthCm`.
Despachador: `heightCm < widthCm ? composeLandscape : composeRollup`.

### 7.1 Vertical — `composeRollup`

Constantes: `DISPLAY_ORDER = [header, dates, venues, stats, lines, program, footer]`, `DROP_ORDER = [stats, lines, program]`, `DESIGN_WIDTHS = [1000, 1080, 1160, 1240, 1340, 1460, 1600, 1760]`, `MIN_GAP = 60`, `MAX_GAP = 130`.

```
para droppedCount = 0..3:                       // cuántos bloques opcionales se descartan, en orden
  para designWidth en DESIGN_WIDTHS:            // de menor a mayor
    designHeight = designWidth * aspectRatio
    bloques = buildLayoutBlocks(designWidth)
    mostrados = DISPLAY_ORDER sin los descartados
    si sum(alturas) + (n−1)*MIN_GAP <= designHeight → ACEPTAR
```

La idea: **un lienzo más ancho hace que el texto sea relativamente más pequeño** (el texto tiene tamaños fijos en unidades de diseño, el lienzo crece). Se busca el lienzo más pequeño (texto más grande) en el que cabe todo; si ninguno sirve, se quita `stats`, luego `lines`, luego `program`.

Reparto del espacio al aceptar:

```
libre   = designHeight − sum(alturas)
gap     = min(MAX_GAP, libre / (n−1))
sobrante = libre − gap*(n−1)
header y dates reciben cada uno sobrante*0.5 extra de avance
el footer se ancla: y = designHeight − footer.height
```

Si nada cabe ni descartando todo: devuelve el mínimo (`header, dates, venues, footer`) con `overflow: true`.

Resultado: `{ designWidth, designHeight, placed: [{id, y, elements, height}], dropped, overflow }`.

### 7.2 Apaisado — `composeLandscape`

Estructura: cabecera ancha arriba, **3 columnas** en el centro, pie ancho abajo.

- Columna 1: `venues` (+ `stats` si caben). Columna 2: `lines`. Columna 3: `program`.
- `columnWidth = (designWidth − 2*72 − 2*48) / 3` (`COLUMN_MARGIN = 72`, `COLUMN_GAP = 48`).
- Las columnas se construyen llamando a `buildLayoutBlocks` con `designWidth = columnWidth + 2*72` y `venueLayout: "rows"`. Así el margen interno de 72 de cada bloque queda dentro de la columna y `contentWidth` del bloque = `columnWidth`.
- Cada columna se apila con `MIN_GAP`; `bodyHeight` = la más alta.
- Se prueban `LANDSCAPE_DESIGN_WIDTHS = [1700 … 4000]`, primero con `stats` y luego sin ellas. Acepta cuando `designHeight − headerWide − footerWide − bodyHeight >= 2*MIN_GAP`; el espacio libre se reparte mitad arriba, mitad abajo del cuerpo.
- Posición X de cada columna: `columnIndex * (columnWidth + COLUMN_GAP)`.

### 7.3 Medidas

Listas de `{ id, widthCm, heightCm, group, label }`: roll ups (85×200, 80×200, 100×200, 120×200, 60×160), serie A (A0–A3), apaisados (A0–A4 apaisado, 120×80, 90×60, 200×85) y personalizada (clamp 20–300 × 20–400 cm).

---

## 8. Render del SVG

```jsx
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="..." viewBox={`0 0 ${designWidth} ${designHeight}`}
     style={{display:"block", width:"100%", height:"100%"}}>
  <rect width={designWidth} height={designHeight} fill={PAPER} />
  {placed.map(block =>
    <g transform={`translate(${block.x || 0} ${block.y})`}>{block.elements.map(renderElement)}</g>)}
</svg>
```

`renderElement` convierte `rect|image|path` a JSX. La vista previa es un contenedor con `aspect-ratio: ancho / alto` de la medida elegida y el SVG al 100 %.

---

## 9. Exportación

**SVG.** Clonar el nodo, poner `width="{cm*10}mm"` y `height="{cm*10}mm"`, quitar `style` y `role`, serializar con `XMLSerializer` y anteponer `<?xml version="1.0" encoding="UTF-8"?>`. Descargar como Blob `image/svg+xml`.

**PDF.**
```js
const pdf = new jsPDF({ orientation, unit: "mm", format: [widthMm, heightMm], compress: true });
// clon con width/height numéricos (mm) en un contenedor oculto DENTRO del DOM:
holder.style.cssText = "position:fixed;left:-99999px;top:0;visibility:hidden";
await window.svg2pdf.svg2pdf(clone, pdf, { x: 0, y: 0, width: widthMm, height: heightMm });
holder.remove(); pdf.save(name);
```
El clon debe estar en el DOM (svg2pdf lee estilos calculados). Resultado: PDF vectorial a tamaño físico exacto.

**PNG.** Escala `maxSide / max(widthCm, heightCm)` con `maxSide = 3600`. Serializar el SVG sustituyendo `width/height` en mm por píxeles; Blob URL → `new Image()` → dibujar en `<canvas>` → `canvas.toBlob(..., "image/png")`. Funciona porque los logos son data URL. **Limitación:** 3600 px de lado da ~46 dpi en un roll up de 200 cm; es solo vista previa/redes. Para imprenta se entrega PDF/SVG.

Nombre de archivo: `{evento}_rollup_{ancho}x{alto}cm_{idioma}.{ext}`.

---

## 10. Contenido, datos e i18n

**Contenido por idioma** (un objeto por idioma, mismas claves en todos):
```
CONTENT[lang] = {
  heroTitleParts: [3 líneas], tagline, hybrid,
  venues: {...}, lineas: {items:[{id,title}]}, formatos: {items:[{f}]},
  footer: { contact2 },
  rollup: { kicker, stats:[{n,l}], dateBig, dateMonth, scan, web,
            head_lines, head_program, monthShort, plenary, d28, d29, d30, v1short,
            ui: { ...rótulos de la interfaz } }
}
```
- El layout **no contiene strings**: todo se lee de `content`. Cambiar de idioma = pasar otro `content` y recalcular (`useMemo` sobre `[assets, content, widthCm, heightCm]`).
- Las cifras son texto escrito a mano (`"160+"`), no se calculan.
- **Datos dinámicos** vienen de módulos aparte: los ponentes plenarios por día salen de `PROGRAMA` (sesiones con `type === "plenaria"` y lista de IDs de ponentes) cruzado con `PONENTES[id].name`. Si el programa cambia, el cartel se actualiza.

**Constantes de marca** al inicio del archivo (`PRIMARY #1A3A6B`, `ACCENT #3A9ECC`, `ACCENT_LIGHT`, `PAPER`, `INK`, `MUTED`, `TINT`, `URL` del QR).

---

## 11. Cómo trasladarlo a otra aplicación (p. ej. Next.js / carrerapineuleam)

1. **Separar motor y contenido.** Copiar tal cual el motor (§4, §6–§9) a un módulo propio, p. ej. `lib/poster/` con `text.ts`, `qr.ts`, `blocks.ts`, `compose.ts`, `export.ts`. Las constantes de marca y los bloques son lo que se reescribe para la nueva identidad; el motor de texto, la composición y la exportación son reutilizables.
2. **Todo es código de navegador.** `opentype.js`, `jspdf` y `svg2pdf.js` usan DOM/canvas: en Next.js, marcar el componente `"use client"` e **importarlos dinámicamente dentro del handler o del `useEffect`** (`await import("opentype.js")`) para evitar errores de SSR.
3. **Paquetes npm** en lugar de CDN: `opentype.js@1.3.4`, `qrcode-generator@1.4.4`, `jspdf@2.5.1`, `svg2pdf.js@2.2.4`. Con TypeScript, declarar tipos (`@types/opentype.js`, o `declare module`).
4. **Fuentes y logos**: ponerlos en `public/` (`/fonts/*.woff`, `/logos/*.svg`) y hacer `fetch("/fonts/...")`. Mantener `.woff` (no woff2). Preferir logos **SVG**; cargarlos igual como data URL.
5. **Contenido**: sustituir `CONTENT_EHU[lang].rollup` por la fuente de datos de la app (JSON/diccionario i18n o base de datos). Mantener la regla de no hardcodear texto en los bloques.
6. **Medidas**: ajustar las listas a los formatos que necesite la carrera (la composición funciona con cualquier relación de aspecto).
7. **Mejoras recomendadas al portar** (defectos detectados en INEDUS):
   - Mostrar un aviso visible cuando `overflow === true` (hoy es silencioso).
   - Usar `font.ascender/descender` para la línea base en lugar de `size * 0.7`.
   - Cachear `buildLayoutBlocks` por `designWidth` (hoy se reconstruye entero, QR incluido, en cada candidato).
   - Subir el límite del PNG o ofrecer DPI configurable.
   - Eliminar `+ COLUMN_MARGIN - COLUMN_MARGIN` redundante de la posición X en `composeLandscape`.
8. **Verificación**: abrir el SVG descargado en un navegador sin fuentes instaladas y en Illustrator/Inkscape (texto = trazados); comprobar que el PDF mide exactamente `ancho × alto` mm; probar todas las medidas y los idiomas más largos para ver el descarte de bloques; escanear el QR impreso.

---

## 12. Resumen del flujo

```
cargar fuentes + logos (data URL)
        ↓
elegir idioma + medida (cm)  →  aspectRatio
        ↓
composeForSize:  probar designWidth creciente (y descartar bloques opcionales)
                 hasta que sum(alturas de bloques) + huecos ≤ designHeight
        ↓
placed = [{id, x, y, elements}]  →  <svg viewBox=designWidth×designHeight>
        ↓
exportar:  SVG (mm)  |  PDF (jsPDF + svg2pdf, mm exactos)  |  PNG (canvas, ≤3600 px)
```
