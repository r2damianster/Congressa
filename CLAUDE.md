# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## INEDUS 2026 — Regla trilingüe (ES / EU / EN)

`v1-ehu.jsx` y `shared-content-ehu.jsx` son los únicos archivos con contenido en 3 idiomas.

**Regla:** cualquier cambio que afecte contenido visible (textos, labels de navegación, botones, secciones) en el landing INEDUS **debe aplicarse en las 3 versiones** (`es`, `eu`, `en`) dentro de `shared-content-ehu.jsx`.

- Los strings hardcodeados en `v1-ehu.jsx` van a `c.ui.*` o `c.venues.*` — nunca texto fijo.
- Las listas de miembros (`_ORG`, `_SCI`, `_ED`) y `_ORGS` son compartidas — no se traducen.
- No commitear hasta verificar que las 3 versiones estén consistentes.

## Serving locally

There is no build step. Open HTML files directly in a browser **or** serve with a local HTTP server:

```bash
npx serve .
# or
python -m http.server
```

## Architecture

**No package manager, no bundler.** React 18 + Babel standalone are loaded from unpkg CDN. JSX is transpiled in-browser at runtime.

### Entry points

| File | Purpose |
|---|---|
| `index.html` | Hub landing — links to individual congress landings |
| `Landing INEDUS 2026.html` | INEDUS 2026 landing |
| `Roll Up INEDUS 2026.html` | Página `/rollup`: roll up de INEDUS descargable en PDF / SVG / PNG (ES/EU/EN, varias medidas) |
| `Impacto INEDUS 2026.html` | Página `/impacto`: banner con las cifras del congreso (países, comunicaciones, ponentes, instituciones, idiomas, sedes) para redes y presentaciones. Cuadrado, vertical 4:5, historia 9:16 y horizontal 16:9; descarga PNG / JPG / PDF (ES/EU/EN). Diseño en `impacto.jsx` (reutiliza helpers de `rollup.jsx`); textos en `impacto` dentro de cada idioma de `shared-content-ehu.jsx`. Cifras de comunicaciones e instituciones aproximadas («+») hasta cerrar el recuento; falta añadir asistencia (Ecuador + España) |
| `Ecuador INEDUS 2026.html` | Página previa `/ecuador` (`ecuador.jsx`): avisa de que `Programa_INEDUS2026.pdf` está en hora de España, muestra la equivalencia con Ecuador (−6 h) y lleva a la agenda. Textos en `ui.ecuadorGate*` (ES/EU/EN). `vercel.json` redirige el PDF antiguo `Programa_Jornada_Manana_INEDUS2026.pdf` (horas erróneas) aquí. Provisional |
| `Archivos INEDUS 2026.html` | Página pública `/archivos` (★ en el menú): plantillas y archivos descargables. Catálogo en `CONTENT_EHU[lang].files` (`shared-content-ehu.jsx`, ES/EU/EN); render en `archivos.jsx`. Para añadir un archivo: ponerlo en el repo y agregar un ítem al grupo correspondiente en las 3 lenguas |

### Variants (`variants/`)

`shared-content-ehu.jsx` (textos ES/EU/EN) y `v1-ehu.jsx` (landing) son lo único que carga la web. Cada archivo se carga con `<script type="text/babel" src="variants/...">`.

### Programa y ponentes (INEDUS)

**`programa.jsx`** — `window.PROGRAMA`: sesiones por día (28, 29, 30 oct). Cada sesión: `timeEHU` (hora Bilbao, CET), `timeManta` (ECT = Bilbao − 6 h), `type` (`apertura|plenaria|mesa|local|pausa|cierre`), `venue` (`conjunta|bilbao|manta`), `title`/`description` en `es/eu/en`, `speakers` (IDs de `ponentes.jsx`). Lo renderiza la sección VII de `v1-ehu.jsx`.
**`ponentes.jsx`** — `window.PONENTES`: fichas (nombre, institución, bio, foto). Una ficha puede existir sin aparecer en el programa.

**Responsables de la agenda:** Asier Romero (EHU, España) y Jhonny Villafuerte (ULEAM, Manta). Los cambios de horario vienen de ellos: Asier envía el programa y Jhonny confirma Manta.

Reglas del programa (vigentes desde 2026-09-24):
- Fuente de verdad: el programa que envía la dirección del congreso. Las tablas de `Ecuador_congreso.md` y `CFP_ euskaraz .md` deben coincidir con `programa.jsx`.
- **Versión `INEDUS GAZ.docx` (Anne, 2026-10-25):** sesiones simultáneas de Bilbao = 6 por día en aulas concretas (generadas por `buildBilbaoLocalSessions` en `programa.jsx`): día 28 de 18:00 a 19:45, día 29 de 18:00 a 19:30, día 30 ninguna. Café Bilbao 17:30–18:00 los días 28 y 29. Sin hora Manta (`timeManta: null`). Mesa del día 28: 4 ponentes (entra Karmele Artano, EHU). El docx no incluye cierre el día 29 (se retiró el cierre 19:00–19:30). Las comunicaciones individuales del docx no están en la web.
- **Cambio horario de invierno (2026-10-25):** Europa pasa a CET (dif. con Manta = 6 h). Bilbao no cambia; Manta días 28–29 +1 h: inicio 09:00, café Manta 11:30–12:00, locales Manta 12:00–13:30 · 15:30–17:00 (igual que día 30).
- **Horario de invierno (2026-10-25; Jhonny confirmó por WhatsApp):** Europa pasa a CET, diferencia con Manta = 6 h. Inicio Bilbao: 28 y 29 oct 15:00, 30 oct 16:00. Inicio Manta: 28 y 29 oct 09:00, 30 oct 10:00. Manta día 30: plenaria 10:00–11:00, mesa 11:00–12:30 (Bilbao sin cambio). Café Manta 11:30–12:00 y locales Manta 12:00–13:30 · 15:30–17:00 en los tres días. Los PDF de Ecuador (`Programa_Jornada_Manana_INEDUS2026.pdf`, `Programa_Sesiones_Locales_Manta_INEDUS2026.pdf`) pueden tener horas del horario de verano.
- **Cambio del 2026-09-29 (Asier; Jhonny confirmó Manta):** todo el día 30 se retrasa 1 h en ambas sedes. Plenaria 16:00–17:00 (Manta 09:00–10:00), mesa 17:00–18:30 (Manta 10:00–11:30), locales Manta 12:00–13:30 · 15:30–17:00, cierre Manta 17:00–17:30, cierre conjunto 18:30–19:00 (Bilbao). Motivo: problema con una ponente plenaria (pendiente confirmar si cambian `speakers`).
- Al cambiar el programa hay que tocar las 3 lenguas y no commitear sin verificar consistencia.

### Publicación Octaedro (INEDUS)

Sección `publicacion` de cada idioma en `shared-content-ehu.jsx`; la pinta `v1-ehu.jsx` (tarjeta `octCard`). Reglas vigentes desde el correo de Ane (2026-10-20, copia en `scraps/Email_Octaedro.docx`):
- Plazo definitivo **15-nov-2026**; lo recibido después no se valora. Entrega ≠ aceptación (revisión editorial).
- Dos modalidades, cada una con su plantilla (`modalidades[]`): Comunicación → `Template_Extenso.docx` (máx. 3.000 palabras, desde 2026-10-28); Innovación didáctica en Educación Superior → `Template_Innovacion.docx` (máx. 3.000 palabras con referencias). Ambas también en el catálogo `files` de `/archivos`.
- Matrícula para publicar, por cada autor/a firmante (`matriculaPub`): EHU y ULEAM 25 €; otras universidades 50 €; América del Norte y Central, África y Asia 25 €.
- `Ecuador_congreso.md` y `CFP_ euskaraz .md` deben coincidir con esto. Los bloques `norms`, `estructuras` y `elementos` de `publicacion` ya no se muestran en la web.

## Key constraints

- **Components are globals, not ES modules.** Every JSX file ends with `Object.assign(window, { ... })`. Import nothing; reference everything via `window.*` or bare identifiers.

## Roll up (`/rollup`)

`rollup.jsx` dibuja el roll up como **SVG con el texto convertido a trazados** (opentype.js, fuentes Geist e Instrument Serif desde jsDelivr), de modo que el SVG y el PDF no dependen de fuentes instaladas. PDF con jsPDF + svg2pdf.js a tamaño físico exacto (mm); PNG rasterizando el SVG (máx. 3600 px de lado); el QR (`https://www.inedus.net`) se genera vectorial con qrcode-generator.

- Textos: `rollup` dentro de cada idioma en `shared-content-ehu.jsx` (mismas reglas trilingües). El programa sale de `programa.jsx` / `ponentes.jsx` (ponentes plenarios).
- Medidas: `ROLLUP_SIZES` (vertical) y `ROLLUP_SIZES_LANDSCAPE` (horizontal: A0–A4, 120×80, 90×60, 200×85) en `rollup.jsx`, más medida personalizada. Alto < ancho → `composeLandscape` (franja superior + 3 columnas + pie); si no, `composeRollup`. `composeRollup` prueba anchos de diseño crecientes y descarta bloques opcionales (cifras → líneas temáticas → programa) si no caben.
- Requiere servir por HTTP (usa `fetch()` para incrustar los logos): `python -m http.server`. Ruta en producción vía `vercel.json`.

### Pendiente

- **Logos vectoriales (SVG/PDF)**: INEDUS (`LOGOINEDUS.jpeg`, 1422×592), KideON (`KideON-EHU.jpeg`, 1178×384), ULEAM (`LOGO-ULEAM-VERTICAL.png`) y EHU (`miniatura_EHU_logotipo.png`, 363×363) son mapas de bits y se pixelan en tamaños grandes (roll up de 85×200 cm y A0/A1). Conseguir los originales vectoriales con las instituciones, guardarlos como `.svg` y cambiar `ROLLUP_LOGO_FILES` en `rollup.jsx` (el resto del código ya usa el ancho/alto de cada imagen). Prioridad: EHU (la peor, 363 px).
