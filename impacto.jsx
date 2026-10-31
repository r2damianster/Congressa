// Banner de impacto INEDUS 2026 — diseño en SVG (texto convertido a trazados) + exportación PNG / JPG / PDF.
// Reutiliza de rollup.jsx: loadRollupAssets, paragraph, fitTextSize, renderElement, triggerDownload, exportPdfFile y la paleta ROLLUP_*.
// Textos: CONTENT_EHU[lang].impacto (shared-content-ehu.jsx, ES/EU/EN).

const IMPACT_FORMATS = [
  { id: "square", width: 1080, height: 1080, labelKey: "formatSquare" },
  { id: "portrait", width: 1080, height: 1350, labelKey: "formatPortrait" },
  { id: "story", width: 1080, height: 1920, labelKey: "formatStory" },
  { id: "landscape", width: 1920, height: 1080, labelKey: "formatLandscape" },
];

const IMPACT_RASTER_SCALE = 2; // PNG/JPG a doble resolución (p. ej. 2160×2160)
const IMPACT_LOGO_ORDER = ["inedus", "uleam", "facultad", "kideon"];
const IMPACT_SOFT_TEXT = "#CBD9F0";

// ── Bloques del diseño ───────────────────────────────────────────────────────

// Kicker + título en dos líneas + subtítulo + fechas. `top` es absoluto.
const buildImpactHeader = ({ fonts, impact, x, top, maxWidth, anchor, titleMaxSize, bodySize, showSubtitle = true }) => {
  const elements = [];
  let cursorY = top;

  const kicker = paragraph(fonts.sansBold, impact.kicker.toUpperCase(), { x, top: cursorY, size: 28, fill: ROLLUP_ACCENT_LIGHT, anchor, maxWidth, tracking: 7 });
  elements.push(...kicker.elements);
  cursorY += kicker.height + 14;

  const titleSize = fitTextSize(fonts.serif, impact.titleParts, titleMaxSize, maxWidth);
  impact.titleParts.forEach((titlePart, partIndex) => {
    const isLastPart = partIndex === impact.titleParts.length - 1;
    const titleLine = paragraph(isLastPart ? fonts.serifItalic : fonts.serif, titlePart, {
      x, top: cursorY, size: titleSize, fill: isLastPart ? ROLLUP_ACCENT_LIGHT : "#FFFFFF", anchor, maxWidth: maxWidth * 1.2, lineHeight: titleSize * 1.05,
    });
    elements.push(...titleLine.elements);
    cursorY += titleLine.height;
  });
  cursorY += 24;

  const accentBarX = anchor === "middle" ? x - 40 : x;
  elements.push({ kind: "rect", x: accentBarX, y: cursorY, width: 80, height: 5, radius: 2.5, fill: ROLLUP_ACCENT });
  cursorY += 5 + 26;

  if (showSubtitle) {
    const subtitle = paragraph(fonts.sans, impact.subtitle, { x, top: cursorY, size: bodySize, fill: IMPACT_SOFT_TEXT, anchor, maxWidth, lineHeight: bodySize * 1.4 });
    elements.push(...subtitle.elements);
    cursorY += subtitle.height + 18;
  }

  const dates = paragraph(fonts.sansBold, impact.dates, { x, top: cursorY, size: bodySize * 0.82, fill: "#FFFFFF", anchor, maxWidth, lineHeight: bodySize * 1.2 });
  elements.push(...dates.elements);
  cursorY += dates.height;

  return { height: cursorY - top, elements };
};

// Cuadrícula de cifras: elige 2 o 3 columnas, la que permita cifras más grandes; cada cifra va centrada en su celda.
const impactGridMetrics = ({ fonts, stats, gridWidth, gridHeight, columnCount }) => {
  const rowCount = Math.ceil(stats.length / columnCount);
  const cellWidth = gridWidth / columnCount;
  const cellHeight = gridHeight / rowCount;
  const numberSize = fitTextSize(fonts.serif, stats.map((stat) => stat.n), cellHeight * 0.58, cellWidth * 0.8);
  return { columnCount, rowCount, cellWidth, cellHeight, numberSize };
};

const buildImpactGrid = ({ fonts, stats, left, top, gridWidth, gridHeight }) => {
  const { columnCount, rowCount, cellWidth, cellHeight, numberSize } = [2, 3]
    .map((candidateColumnCount) => impactGridMetrics({ fonts, stats, gridWidth, gridHeight, columnCount: candidateColumnCount }))
    .reduce((best, candidate) => (candidate.numberSize > best.numberSize + 0.5 ? candidate : best));
  const labelSize = Math.max(22, Math.min(38, numberSize * 0.22));
  const elements = [];

  stats.forEach((stat, statIndex) => {
    const columnIndex = statIndex % columnCount;
    const rowIndex = Math.floor(statIndex / columnCount);
    const cellCenterX = left + columnIndex * cellWidth + cellWidth / 2;
    const number = paragraph(fonts.serif, stat.n, { x: cellCenterX, top: 0, size: numberSize, fill: "#FFFFFF", maxWidth: cellWidth, lineHeight: numberSize });
    const label = paragraph(fonts.sans, stat.l, { x: cellCenterX, top: number.height + 8, size: labelSize, fill: ROLLUP_ACCENT_LIGHT, maxWidth: cellWidth * 0.85, lineHeight: labelSize * 1.3 });
    const contentHeight = number.height + 8 + label.height;
    const offsetY = top + rowIndex * cellHeight + (cellHeight - contentHeight) / 2;
    [...number.elements, ...label.elements].forEach((element) => elements.push({ ...element, transformY: offsetY }));
  });

  for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {
    elements.push({ kind: "rect", x: left + cellWidth * 0.08, y: top + rowIndex * cellHeight - 1, width: gridWidth - cellWidth * 0.16, height: 2, fill: "#FFFFFF", opacity: 0.2 });
  }
  for (let columnIndex = 1; columnIndex < columnCount; columnIndex++) {
    elements.push({ kind: "rect", x: left + columnIndex * cellWidth - 1, y: top + cellHeight * 0.08, width: 2, height: gridHeight - cellHeight * 0.16, fill: "#FFFFFF", opacity: 0.2 });
  }

  return elements;
};

// Bloque destacado de asistencia: cifra grande a la izquierda, etiqueta y detalle a la derecha.
const buildImpactAttendance = ({ fonts, attendance, left, top, width, height }) => {
  const padding = height * 0.2;
  const numberSize = fitTextSize(fonts.serif, [attendance.n], height * 0.72, width * 0.4);
  const numberWidth = measureText(fonts.serif, attendance.n, numberSize);
  const number = paragraph(fonts.serif, attendance.n, { x: left + padding, top: top + (height - numberSize) / 2, size: numberSize, fill: "#FFFFFF", anchor: "start", maxWidth: width, lineHeight: numberSize });
  const textX = left + padding + numberWidth + padding;
  const textWidth = left + width - padding - textX;
  const labelSize = Math.max(22, Math.min(40, height * 0.2));
  const label = paragraph(fonts.sansBold, attendance.l, { x: textX, top: 0, size: labelSize, fill: "#FFFFFF", anchor: "start", maxWidth: textWidth, lineHeight: labelSize * 1.25 });
  const detail = paragraph(fonts.sans, attendance.detail, { x: textX, top: label.height + 6, size: labelSize * 0.78, fill: ROLLUP_ACCENT_LIGHT, anchor: "start", maxWidth: textWidth, lineHeight: labelSize });
  const textOffsetY = top + (height - (label.height + 6 + detail.height)) / 2;
  return [
    { kind: "rect", x: left, y: top, width, height, radius: height * 0.18, fill: "#FFFFFF", opacity: 0.1 },
    { kind: "rect", x: left, y: top, width: 8, height: height, radius: 4, fill: ROLLUP_ACCENT },
    ...number.elements,
    ...[...label.elements, ...detail.elements].map((element) => ({ ...element, transformY: textOffsetY })),
  ];
};

// Frase de cierre + web
const buildImpactClosing = ({ fonts, impact, x, top, maxWidth, anchor, webOnly = false }) => {
  const closing = webOnly ? { height: 0, elements: [] } : paragraph(fonts.serifItalic, impact.closing, { x, top, size: 40, fill: IMPACT_SOFT_TEXT, anchor, maxWidth, lineHeight: 50 });
  const webTop = webOnly ? top : top + closing.height + 8;
  const web = paragraph(fonts.sansBold, impact.web, { x, top: webTop, size: 30, fill: "#FFFFFF", anchor, maxWidth, tracking: 2, lineHeight: 40 });
  return { height: webTop - top + web.height, elements: [...closing.elements, ...web.elements] };
};

// Franja blanca con los logos
const buildImpactFooter = ({ logos, width, top, stripHeight, margin }) => {
  const minimumGap = 20;
  const availableWidth = width - margin * 2;
  const naturalLogoHeight = stripHeight * 0.52;
  const naturalWidths = IMPACT_LOGO_ORDER.map((logoName) => (logos[logoName].width / logos[logoName].height) * naturalLogoHeight);
  const naturalTotal = naturalWidths.reduce((total, logoWidth) => total + logoWidth, 0);
  const fitFactor = Math.min(1, (availableWidth - minimumGap * (IMPACT_LOGO_ORDER.length - 1)) / naturalTotal);
  const logoHeight = naturalLogoHeight * fitFactor;
  const logoWidths = naturalWidths.map((logoWidth) => logoWidth * fitFactor);
  const gap = (availableWidth - naturalTotal * fitFactor) / (IMPACT_LOGO_ORDER.length - 1);
  const logoY = top + (stripHeight - logoHeight) / 2;

  const elements = [{ kind: "rect", x: 0, y: top, width, height: stripHeight, fill: "#FFFFFF" }];
  let logoX = margin;
  IMPACT_LOGO_ORDER.forEach((logoName, logoIndex) => {
    elements.push({ kind: "image", href: logos[logoName].href, x: logoX, y: logoY, width: logoWidths[logoIndex], height: logoHeight });
    if (logoIndex < IMPACT_LOGO_ORDER.length - 1) {
      elements.push({ kind: "rect", x: logoX + logoWidths[logoIndex] + gap / 2 - 1, y: logoY + logoHeight * 0.1, width: 2, height: logoHeight * 0.8, fill: "#D9E2EF" });
    }
    logoX += logoWidths[logoIndex] + gap;
  });
  return elements;
};

// ── Composición ──────────────────────────────────────────────────────────────

const composeImpact = ({ fonts, logos, content, format }) => {
  const impact = content.impacto;
  const { width, height } = format;
  const isWide = width > height;
  const margin = Math.round(width * (isWide ? 0.04 : 0.07));
  const stripHeight = isWide ? 150 : height > 1500 ? 230 : 170;
  const bodyBottom = height - stripHeight;
  const shortSide = Math.min(width, height);

  const backdrop = [
    { kind: "rect", x: 0, y: 0, width, height, fill: ROLLUP_PRIMARY },
    { kind: "rect", x: width - shortSide * 0.5, y: -shortSide * 0.32, width: shortSide * 0.9, height: shortSide * 0.9, radius: shortSide * 0.45, fill: ROLLUP_ACCENT, opacity: 0.16 },
    { kind: "rect", x: -shortSide * 0.28, y: bodyBottom - shortSide * 0.42, width: shortSide * 0.7, height: shortSide * 0.7, radius: shortSide * 0.35, fill: ROLLUP_ACCENT, opacity: 0.1 },
  ];

  let headerElements;
  let closingElements;
  let gridElements;
  let attendanceElements = [];
  const attendanceGap = 26;

  if (isWide) {
    const leftColumnWidth = width * 0.4;
    const header = buildImpactHeader({ fonts, impact, x: margin, top: margin, maxWidth: leftColumnWidth, anchor: "start", titleMaxSize: 150, bodySize: 34 });
    const closingProbe = buildImpactClosing({ fonts, impact, x: margin, top: 0, maxWidth: leftColumnWidth, anchor: "start" });
    const closing = buildImpactClosing({ fonts, impact, x: margin, top: bodyBottom - margin * 0.6 - closingProbe.height, maxWidth: leftColumnWidth, anchor: "start" });
    const gridLeft = margin + leftColumnWidth + margin;
    headerElements = header.elements;
    closingElements = closing.elements;
    const rightWidth = width - margin - gridLeft;
    const attendanceHeight = impact.attendance ? 150 : 0;
    if (impact.attendance) {
      attendanceElements = buildImpactAttendance({ fonts, attendance: impact.attendance, left: gridLeft, top: margin, width: rightWidth, height: attendanceHeight });
    }
    const gridTop = margin + (impact.attendance ? attendanceHeight + attendanceGap : 0);
    gridElements = buildImpactGrid({ fonts, stats: impact.stats, left: gridLeft, top: gridTop, gridWidth: rightWidth, gridHeight: bodyBottom - margin - gridTop });
  } else {
    const centerX = width / 2;
    const contentWidth = width - margin * 2;
    const headerTop = margin * 1.1;
    const isSquare = height <= width * 1.05; // en el cuadrado la cabecera se compacta para dejar sitio a las cifras
    const header = buildImpactHeader({ fonts, impact, x: centerX, top: headerTop, maxWidth: contentWidth, anchor: "middle", titleMaxSize: width * (isSquare ? 0.085 : 0.11), bodySize: width * (isSquare ? 0.023 : 0.028), showSubtitle: !isSquare });
    const closingProbe = buildImpactClosing({ fonts, impact, x: centerX, top: 0, maxWidth: contentWidth, anchor: "middle", webOnly: isSquare });
    const closingTop = bodyBottom - margin * 0.5 - closingProbe.height;
    const closing = buildImpactClosing({ fonts, impact, x: centerX, top: closingTop, maxWidth: contentWidth, anchor: "middle", webOnly: isSquare });
    const attendanceTop = headerTop + header.height + margin * 0.5;
    const attendanceHeight = impact.attendance ? (isSquare ? 100 : height > 1500 ? 190 : 150) : 0;
    if (impact.attendance) {
      attendanceElements = buildImpactAttendance({ fonts, attendance: impact.attendance, left: margin, top: attendanceTop, width: contentWidth, height: attendanceHeight });
    }
    const gridTop = attendanceTop + (impact.attendance ? attendanceHeight + attendanceGap : 0);
    headerElements = header.elements;
    closingElements = closing.elements;
    gridElements = buildImpactGrid({ fonts, stats: impact.stats, left: margin, top: gridTop, gridWidth: contentWidth, gridHeight: closingTop - gridTop - margin * 0.4 });
  }

  return {
    width,
    height,
    placed: [
      { id: "backdrop", elements: backdrop },
      { id: "header", elements: headerElements },
      { id: "attendance", elements: attendanceElements },
      { id: "grid", elements: gridElements },
      { id: "closing", elements: closingElements },
      { id: "footer", elements: buildImpactFooter({ logos, width, top: bodyBottom, stripHeight, margin }) },
    ],
  };
};

// ── Render SVG ───────────────────────────────────────────────────────────────

const ImpactSvg = React.forwardRef(({ layout, label }, svgRef) => (
  <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox={`0 0 ${layout.width} ${layout.height}`} role="img" aria-label={label} style={{ display: "block", width: "100%", height: "100%" }}>
    {layout.placed.map((block) => (
      <g key={block.id}>{block.elements.map(renderElement)}</g>
    ))}
  </svg>
));

// ── Exportación ──────────────────────────────────────────────────────────────

const exportImpactRaster = async (svgElement, format, baseName, mimeType, fileExtension) => {
  const pixelWidth = format.width * IMPACT_RASTER_SCALE;
  const pixelHeight = format.height * IMPACT_RASTER_SCALE;
  const clone = svgElement.cloneNode(true);
  clone.setAttribute("width", `${pixelWidth}`);
  clone.setAttribute("height", `${pixelHeight}`);
  clone.removeAttribute("style");
  clone.removeAttribute("role");
  const svgText = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
  const svgUrl = URL.createObjectURL(new Blob([svgText], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const image = await new Promise((resolve, reject) => {
      const loadedImage = new Image();
      loadedImage.onload = () => resolve(loadedImage);
      loadedImage.onerror = reject;
      loadedImage.src = svgUrl;
    });
    const canvas = document.createElement("canvas");
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    canvas.getContext("2d").drawImage(image, 0, 0, pixelWidth, pixelHeight);
    const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, mimeType, 0.92));
    triggerDownload(imageBlob, `${baseName}.${fileExtension}`);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
};

// El PDF reutiliza exportPdfFile (medidas en cm): 1 px de diseño = 1/96 de pulgada
const exportImpactPdf = (svgElement, format, baseName) => {
  const centimetersPerPixel = 2.54 / 96;
  return exportPdfFile(svgElement, format.width * centimetersPerPixel, format.height * centimetersPerPixel, baseName);
};

// ── Página ───────────────────────────────────────────────────────────────────

const ImpactPage = () => {
  const [lang, setLang] = React.useState("es");
  const [assets, setAssets] = React.useState(null);
  const [loadFailed, setLoadFailed] = React.useState(false);
  const [formatId, setFormatId] = React.useState("square");
  const [busyFormat, setBusyFormat] = React.useState(null);
  const [exportFailed, setExportFailed] = React.useState(false);
  const svgRef = React.useRef(null);

  const content = window.CONTENT_EHU[lang];
  const ui = content.impacto.ui;
  const selectedFormat = IMPACT_FORMATS.find((format) => format.id === formatId);

  React.useEffect(() => {
    loadRollupAssets().then(setAssets).catch((error) => { console.error(error); setLoadFailed(true); });
  }, []);

  React.useEffect(() => { document.documentElement.lang = lang; document.title = `${ui.pageTitle} · INEDUS`; }, [lang, ui.pageTitle]);

  const layout = React.useMemo(
    () => (assets ? composeImpact({ fonts: assets.fonts, logos: assets.logos, content, format: selectedFormat }) : null),
    [assets, content, selectedFormat]
  );

  const baseName = `INEDUS2026_impacto_${selectedFormat.id}_${lang}`;

  const runExport = async (exportKind) => {
    if (!svgRef.current) return;
    setBusyFormat(exportKind);
    setExportFailed(false);
    try {
      if (exportKind === "png") await exportImpactRaster(svgRef.current, selectedFormat, baseName, "image/png", "png");
      if (exportKind === "jpg") await exportImpactRaster(svgRef.current, selectedFormat, baseName, "image/jpeg", "jpg");
      if (exportKind === "pdf") await exportImpactPdf(svgRef.current, selectedFormat, baseName);
    } catch (error) {
      console.error(error);
      setExportFailed(true);
    } finally {
      setBusyFormat(null);
    }
  };

  const sheetRatio = selectedFormat.width / selectedFormat.height;

  return (
    <div className="page">
      <style>{`
        .page { min-height: 100vh; display: grid; grid-template-columns: 340px 1fr; background: ${ROLLUP_PAPER}; color: ${ROLLUP_INK}; font-family: 'Geist', -apple-system, sans-serif; }
        .side { padding: 28px 24px; border-right: 1px solid #E2E8F0; background: #fff; display: flex; flex-direction: column; gap: 22px; position: sticky; top: 0; height: 100vh; overflow-y: auto; box-sizing: border-box; }
        .back { color: ${ROLLUP_MUTED}; font-size: 13px; text-decoration: none; }
        .back:hover { color: ${ROLLUP_PRIMARY}; }
        h1 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 36px; line-height: 1.05; color: ${ROLLUP_PRIMARY}; margin: 0; }
        .lead { margin: 6px 0 0; font-size: 14px; line-height: 1.5; color: ${ROLLUP_MUTED}; }
        .label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #94A3B8; margin-bottom: 8px; }
        .row { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip { border: 1px solid #CBD5E1; background: transparent; color: #334155; border-radius: 999px; padding: 7px 13px; font: inherit; font-size: 13px; cursor: pointer; }
        .chip:hover { border-color: ${ROLLUP_PRIMARY}; }
        .chip.on { background: ${ROLLUP_PRIMARY}; border-color: ${ROLLUP_PRIMARY}; color: #fff; }
        .lang { display: flex; border: 1px solid #CBD5E1; border-radius: 999px; overflow: hidden; width: max-content; }
        .lang button { border: 0; background: transparent; padding: 7px 16px; font: inherit; font-size: 12px; letter-spacing: 1px; color: #64748B; cursor: pointer; }
        .lang button.on { background: ${ROLLUP_PRIMARY}; color: #fff; }
        .dl { display: flex; flex-direction: column; gap: 8px; }
        .dl button { text-align: left; border: 0; background: ${ROLLUP_PRIMARY}; color: #fff; border-radius: 12px; padding: 12px 16px; font: inherit; font-size: 14px; cursor: pointer; }
        .dl button.secondary { background: transparent; color: ${ROLLUP_PRIMARY}; border: 1px solid ${ROLLUP_PRIMARY}; }
        .dl button:disabled { opacity: .55; cursor: progress; }
        .note { font-size: 12px; line-height: 1.5; color: #94A3B8; }
        .error { font-size: 13px; color: #B42318; }
        .stage { padding: 28px; display: flex; align-items: center; justify-content: center; height: 100vh; box-sizing: border-box; background: #EEF1F6; position: sticky; top: 0; }
        .sheet { box-shadow: 0 18px 50px rgba(15, 23, 42, .25); background: ${ROLLUP_PRIMARY}; }
        .status { color: ${ROLLUP_MUTED}; font-size: 14px; }
        @media (max-width: 820px) {
          .page { grid-template-columns: 1fr; }
          .side { position: static; height: auto; border-right: 0; border-bottom: 1px solid #E2E8F0; }
          .stage { position: static; height: auto; padding: 16px; }
          .sheet { width: 100% !important; max-width: 480px; }
        }
      `}</style>

      <aside className="side">
        <a className="back" href="/home">{ui.back}</a>
        <div>
          <h1>{ui.pageTitle}</h1>
          <p className="lead">{ui.pageLead}</p>
        </div>

        <div>
          <div className="label">{ui.language}</div>
          <div className="lang">
            {["es", "eu", "en"].map((code) => (
              <button key={code} className={lang === code ? "on" : ""} onClick={() => setLang(code)}>{code.toUpperCase()}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="label">{ui.format}</div>
          <div className="row">
            {IMPACT_FORMATS.map((format) => (
              <button key={format.id} className={`chip ${formatId === format.id ? "on" : ""}`} onClick={() => setFormatId(format.id)}>
                {ui[format.labelKey]} · {format.width}×{format.height}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="label">{ui.download} · {selectedFormat.width * IMPACT_RASTER_SCALE}×{selectedFormat.height * IMPACT_RASTER_SCALE} px</div>
          <div className="dl">
            <button disabled={!layout || busyFormat} onClick={() => runExport("png")}>{busyFormat === "png" ? ui.exporting : ui.png}</button>
            <button className="secondary" disabled={!layout || busyFormat} onClick={() => runExport("jpg")}>{busyFormat === "jpg" ? ui.exporting : ui.jpg}</button>
            <button className="secondary" disabled={!layout || busyFormat} onClick={() => runExport("pdf")}>{busyFormat === "pdf" ? ui.exporting : ui.pdf}</button>
          </div>
          {exportFailed && <p className="error">{ui.errorExport}</p>}
        </div>

        <p className="note">{ui.note}</p>
      </aside>

      <main className="stage">
        {loadFailed ? <p className="error">{ui.errorLoad}</p> : !layout ? <p className="status">{ui.loading}</p> : (
          <div className="sheet" style={{ aspectRatio: `${selectedFormat.width} / ${selectedFormat.height}`, width: `min(100%, calc((100vh - 56px) * ${sheetRatio}))` }}>
            <ImpactSvg ref={svgRef} layout={layout} label={ui.pageTitle} />
          </div>
        )}
      </main>
    </div>
  );
};

Object.assign(window, { ImpactPage, composeImpact, IMPACT_FORMATS });
