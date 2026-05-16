# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CIIIES 2026 — Regla trilingüe (ES / EU / EN)

`v1-ehu.jsx` y `shared-content-ehu.jsx` son los únicos archivos con contenido en 3 idiomas.

**Regla:** cualquier cambio que afecte contenido visible (textos, labels de navegación, botones, secciones) en el landing CIIIES **debe aplicarse en las 3 versiones** (`es`, `eu`, `en`) dentro de `shared-content-ehu.jsx`.

- Los strings hardcodeados en `v1-ehu.jsx` van a `c.ui.*` o `c.venues.*` — nunca texto fijo.
- Las listas de miembros (`_ORG`, `_SCI`, `_ED`) y `_ORGS` son compartidas — no se traducen.
- No commitear hasta verificar que las 3 versiones estén consistentes.

## Serving locally

There is no build step. Open HTML files directly in a browser **or** serve with a local HTTP server (required for `.design-canvas.state.json` persistence, which uses `fetch()`):

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
| `Landing CIPP 2026.html` | I Congreso Internacional de Pedagogía y Psicodidáctica — 3 design variants on a canvas |
| `Landing CIIIES 2026.html` | CIIIES 2026 landing |

### Core framework files (loaded by every landing)

**`design-canvas.jsx`** — Figma-like infinite canvas. Exposes to `window`: `DesignCanvas`, `DCSection`, `DCArtboard`, `DCPostIt`.
- `DCViewport`: pan/zoom via pointer drag and wheel; writes transform directly to DOM (bypasses React) for 60 fps.
- `DCSection`: horizontal row of artboards with persisted order and inline-editable titles.
- `DCArtboard`: marker component — actual render is done by `DCArtboardFrame` via `DCSection`.
- `DCFocusOverlay`: fullscreen focus mode; portaled to `document.body` to escape the canvas transform. Keyboard: `←/→` cycles artboards, `↑/↓` crosses sections, `Esc` exits.
- State (artboard order, renamed labels/titles) persists to `.design-canvas.state.json` via `window.omelette.writeFile()`. Reads use plain `fetch()` (works anywhere served over HTTP). Writes require the omelette runtime.

**`tweaks-panel.jsx`** — Floating design-variable panel. Exposes to `window`: `useTweaks`, `TweaksPanel`, `TweakSection`, `TweakRow`, `TweakSlider`, `TweakToggle`, `TweakRadio`, `TweakSelect`, `TweakText`, `TweakNumber`, `TweakColor`, `TweakButton`.
- Communicates with a host iframe via `postMessage`: listens for `__activate_edit_mode` / `__deactivate_edit_mode`; posts `__edit_mode_available` / `__edit_mode_set_keys` / `__edit_mode_dismissed`.
- `useTweaks(defaults)` returns `[values, setTweak]`. `setTweak(key, val)` updates state and posts `__edit_mode_set_keys` so the host can rewrite the `/*EDITMODE-BEGIN*/…/*EDITMODE-END*/` JSON block on disk.

### Variants (`variants/`)

Each file is a self-contained React component loaded as `<script type="text/babel" src="variants/...">`:

| File | Description |
|---|---|
| `shared-content.jsx` | Copy/data shared across CIPP variants (ES/EN) |
| `shared-content-ehu.jsx` | Copy variant for UPV/EHU context |
| `v1-editorial.jsx` | Editorial academic — serif, navy blue, magazine tone |
| `v2-saas.jsx` | Modern SaaS — warm neutral, subtle shadows, product card |
| `v3-dense.jsx` | Dense informative — dashboard style, monospaced, data-first |
| `v1-ehu.jsx` | UPV/EHU-branded variant of V1 |

### Exports (`exports/`)

Standalone self-contained HTML files (`v1.html`, `v2.html`, `v3.html` and their `-print` versions). No external dependencies — everything inlined.

## Key constraints

- **Components are globals, not ES modules.** Every JSX file ends with `Object.assign(window, { ... })`. Import nothing; reference everything via `window.*` or bare identifiers.
- **Script load order matters.** In any HTML file, `design-canvas.jsx` and `tweaks-panel.jsx` must load before variant files. Variant files must load before the inline `<script type="text/babel">` that mounts the app.
- **`EDITMODE-BEGIN` / `EDITMODE-END` markers** wrap the tweaks default JSON. The host runtime rewrites this block on disk when the user changes a tweak. Keep the markers on the same line as the object braces.
- **Fonts:** CIPP landing uses Geist + Geist Mono + Instrument Serif. Index uses Outfit + Plus Jakarta Sans. Don't swap them between contexts.
