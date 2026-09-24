// Roll up INEDUS 2026 — diseño en SVG (todo el texto convertido a trazados) + exportación PDF / SVG / PNG.
// Depende de: opentype.js, qrcode-generator, jsPDF, svg2pdf.js (CDN), CONTENT_EHU, PROGRAMA y PONENTES.

const ROLLUP_PRIMARY = "#1A3A6B";
const ROLLUP_ACCENT = "#3A9ECC";
const ROLLUP_ACCENT_LIGHT = "#9BD8F2";
const ROLLUP_PAPER = "#FBF9F4";
const ROLLUP_INK = "#1F2937";
const ROLLUP_MUTED = "#475569";
const ROLLUP_TINT = "#E6EDF7";
const ROLLUP_URL = "https://www.inedus.net";

const ROLLUP_FONT_FILES = {
  sans: "https://cdn.jsdelivr.net/npm/@fontsource/geist/files/geist-latin-400-normal.woff",
  sansBold: "https://cdn.jsdelivr.net/npm/@fontsource/geist/files/geist-latin-600-normal.woff",
  serif: "https://cdn.jsdelivr.net/npm/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff",
  serifItalic: "https://cdn.jsdelivr.net/npm/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff",
};

const ROLLUP_LOGO_FILES = {
  inedus: "LOGOINEDUS.jpeg",
  kideon: "KideON-EHU.jpeg",
  uleam: "LOGO-ULEAM-VERTICAL.png",
  ehu: "miniatura_EHU_logotipo.png",
};

// Medidas en cm (ancho × alto)
const ROLLUP_SIZES = [
  { id: "85x200", widthCm: 85, heightCm: 200, group: "rollup" },
  { id: "80x200", widthCm: 80, heightCm: 200, group: "rollup" },
  { id: "100x200", widthCm: 100, heightCm: 200, group: "rollup" },
  { id: "120x200", widthCm: 120, heightCm: 200, group: "rollup" },
  { id: "60x160", widthCm: 60, heightCm: 160, group: "rollup" },
  { id: "a0", widthCm: 84.1, heightCm: 118.9, group: "a", label: "A0" },
  { id: "a1", widthCm: 59.4, heightCm: 84.1, group: "a", label: "A1" },
  { id: "a2", widthCm: 42, heightCm: 59.4, group: "a", label: "A2" },
  { id: "a3", widthCm: 29.7, heightCm: 42, group: "a", label: "A3" },
];

const ROLLUP_SIZES_LANDSCAPE = [
  { id: "h-a0", widthCm: 118.9, heightCm: 84.1, group: "a", label: "A0" },
  { id: "h-a1", widthCm: 84.1, heightCm: 59.4, group: "a", label: "A1" },
  { id: "h-a2", widthCm: 59.4, heightCm: 42, group: "a", label: "A2" },
  { id: "h-a3", widthCm: 42, heightCm: 29.7, group: "a", label: "A3" },
  { id: "h-a4", widthCm: 29.7, heightCm: 21, group: "a", label: "A4" },
  { id: "h-120x80", widthCm: 120, heightCm: 80, group: "rollup" },
  { id: "h-90x60", widthCm: 90, heightCm: 60, group: "rollup" },
  { id: "h-200x85", widthCm: 200, heightCm: 85, group: "rollup" },
];

// ── Carga de recursos ────────────────────────────────────────────────────────

const fetchAsDataUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const readImageSize = (dataUrl) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = reject;
    image.src = dataUrl;
  });

const loadRollupAssets = async () => {
  const fontEntries = await Promise.all(
    Object.entries(ROLLUP_FONT_FILES).map(async ([fontName, fontUrl]) => {
      const fontResponse = await fetch(fontUrl);
      if (!fontResponse.ok) throw new Error(`No se pudo cargar ${fontUrl}`);
      return [fontName, opentype.parse(await fontResponse.arrayBuffer())];
    })
  );
  const logoEntries = await Promise.all(
    Object.entries(ROLLUP_LOGO_FILES).map(async ([logoName, logoFile]) => {
      const href = await fetchAsDataUrl(logoFile);
      const { width, height } = await readImageSize(href);
      return [logoName, { href, width, height }];
    })
  );
  return { fonts: Object.fromEntries(fontEntries), logos: Object.fromEntries(logoEntries) };
};

// ── Texto → trazados ─────────────────────────────────────────────────────────

const measureText = (font, text, size, tracking = 0) => {
  if (!tracking) return font.getAdvanceWidth(text, size);
  return Array.from(text).reduce((total, character) => total + font.getAdvanceWidth(character, size) + tracking, -tracking);
};

const wrapText = (font, text, size, maxWidth, tracking = 0) => {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = "";
  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (currentLine && measureText(font, candidate, size, tracking) > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = candidate;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
};

const textPathData = (font, text, x, baselineY, size, tracking = 0) => {
  if (!tracking) return font.getPath(text, x, baselineY, size).toPathData(2);
  let cursorX = x;
  return Array.from(text)
    .map((character) => {
      const characterPath = font.getPath(character, cursorX, baselineY, size).toPathData(2);
      cursorX += font.getAdvanceWidth(character, size) + tracking;
      return characterPath;
    })
    .join(" ");
};

// Párrafo con salto de línea automático. `top` es el borde superior del párrafo; devuelve elementos y altura.
const paragraph = (font, text, { x, top = 0, size, fill, anchor = "middle", maxWidth, lineHeight, tracking = 0 }) => {
  const lines = wrapText(font, text, size, maxWidth, tracking);
  const lineStep = lineHeight || size * 1.2;
  const elements = lines.map((line, lineIndex) => {
    const lineWidth = measureText(font, line, size, tracking);
    const startX = anchor === "middle" ? x - lineWidth / 2 : anchor === "end" ? x - lineWidth : x;
    const baselineY = top + lineIndex * lineStep + (lineStep + size * 0.7) / 2;
    return { kind: "path", d: textPathData(font, line, startX, baselineY, size, tracking), fill };
  });
  return { elements, height: lines.length * lineStep, lines };
};

const fitTextSize = (font, texts, maxSize, maxWidth) => {
  const widestAtOne = Math.max(...texts.map((text) => measureText(font, text, 1)));
  return Math.min(maxSize, maxWidth / widestAtOne);
};

// ── QR vectorial ─────────────────────────────────────────────────────────────

const qrPathData = (url, x, y, side) => {
  const qr = qrcode(0, "M");
  qr.addData(url);
  qr.make();
  const moduleCount = qr.getModuleCount();
  const moduleSize = side / moduleCount;
  let pathData = "";
  for (let row = 0; row < moduleCount; row++) {
    for (let column = 0; column < moduleCount; column++) {
      if (qr.isDark(row, column)) {
        pathData += `M${(x + column * moduleSize).toFixed(2)} ${(y + row * moduleSize).toFixed(2)}h${(moduleSize + 0.15).toFixed(2)}v${(moduleSize + 0.15).toFixed(2)}h-${(moduleSize + 0.15).toFixed(2)}z`;
      }
    }
  }
  return pathData;
};

// ── Datos del programa ───────────────────────────────────────────────────────

const plenarySpeakerNames = (dayNumber) => {
  const day = (window.PROGRAMA || []).find((programDay) => programDay.day === dayNumber);
  if (!day) return [];
  return day.sessions
    .filter((session) => session.type === "plenaria")
    .flatMap((session) => session.speakers)
    .map((speakerId) => window.PONENTES?.[speakerId]?.name)
    .filter(Boolean);
};

// ── Bloques del diseño ───────────────────────────────────────────────────────
// Cada bloque devuelve { height, elements } en coordenadas locales (y = 0 arriba del bloque).

const buildLayoutBlocks = ({ fonts, logos, content, designWidth, venueLayout = "cards" }) => {
  const rollup = content.rollup;
  const margin = 72;
  const contentWidth = designWidth - margin * 2;
  const centerX = designWidth / 2;
  const logoWidthFor = (logo, targetHeight) => (logo.width / logo.height) * targetHeight;
  const chevronDepth = 70;

  // Cabecera
  const buildHeader = () => {
    const elements = [];
    const logoPillWidth = 330;
    const logoInnerWidth = logoPillWidth - 44;
    const logoInnerHeight = (logos.inedus.height / logos.inedus.width) * logoInnerWidth;
    const logoPillHeight = logoInnerHeight + 44;
    let cursorY = 64;
    const logoPill = { kind: "rect", x: centerX - logoPillWidth / 2, y: cursorY, width: logoPillWidth, height: logoPillHeight, radius: 22, fill: "#FFFFFF" };
    const logoImage = { kind: "image", href: logos.inedus.href, x: centerX - logoInnerWidth / 2, y: cursorY + 22, width: logoInnerWidth, height: logoInnerHeight };
    cursorY += logoPillHeight + 44;

    const kicker = paragraph(fonts.sansBold, rollup.kicker.toUpperCase(), { x: centerX, top: cursorY, size: 26, fill: ROLLUP_ACCENT_LIGHT, maxWidth: contentWidth, tracking: 6 });
    cursorY += kicker.height + 14;

    const titleParts = content.heroTitleParts;
    const titleSize = fitTextSize(fonts.serif, titleParts, 100, contentWidth);
    const titleLines = titleParts.map((part, partIndex) => {
      const isLast = partIndex === titleParts.length - 1;
      const font = isLast ? fonts.serifItalic : fonts.serif;
      const line = paragraph(font, part, { x: centerX, top: cursorY, size: titleSize, fill: isLast ? ROLLUP_ACCENT_LIGHT : "#FFFFFF", maxWidth: contentWidth * 1.2, lineHeight: titleSize * 1.08 });
      cursorY += line.height;
      return line;
    });
    cursorY += 26;

    const tagline = paragraph(fonts.serifItalic, content.tagline, { x: centerX, top: cursorY, size: 40, fill: "#CBD9F0", maxWidth: Math.min(contentWidth, 800), lineHeight: 50 });
    cursorY += tagline.height + 56;

    const bodyHeight = cursorY;
    const totalHeight = bodyHeight + chevronDepth;
    const accentShape = { kind: "path", d: `M0 0H${designWidth}V${bodyHeight - 4 + 16}L${centerX} ${totalHeight + 16}L0 ${bodyHeight - 4 + 16}Z`, fill: ROLLUP_ACCENT };
    const primaryShape = { kind: "path", d: `M0 0H${designWidth}V${bodyHeight - 4}L${centerX} ${totalHeight}L0 ${bodyHeight - 4}Z`, fill: ROLLUP_PRIMARY };
    elements.push(accentShape, primaryShape, logoPill, logoImage, ...kicker.elements);
    titleLines.forEach((line) => elements.push(...line.elements));
    elements.push(...tagline.elements);
    return { height: totalHeight + 16, elements };
  };

  // Fechas
  const buildDates = () => {
    const bigSize = 200;
    const big = paragraph(fonts.serif, rollup.dateBig, { x: centerX, top: 0, size: bigSize, fill: ROLLUP_PRIMARY, maxWidth: contentWidth, lineHeight: bigSize * 0.92 });
    const month = paragraph(fonts.sansBold, rollup.dateMonth.toUpperCase(), { x: centerX, top: big.height + 6, size: 40, fill: ROLLUP_ACCENT, maxWidth: contentWidth, tracking: 9 });
    const hybrid = paragraph(fonts.sansBold, content.hybrid, { x: centerX, top: big.height + month.height + 34, size: 32, fill: ROLLUP_INK, maxWidth: Math.min(contentWidth, 820), lineHeight: 44 });
    return { height: big.height + month.height + 34 + hybrid.height, elements: [...big.elements, ...month.elements, ...hybrid.elements] };
  };

  // Sedes
  const buildVenuesRows = () => {
    const cardGap = 24;
    const cardPadding = 30;
    const logoColumnWidth = 150;
    const logoHeight = 110;
    const textX = margin + cardPadding + logoColumnWidth + 24;
    const textWidth = designWidth - margin - cardPadding - textX;
    const venueDefinitions = [
      { label: content.venues.v1label, name: content.venues.v1name, detail: rollup.v1short, logo: logos.ehu },
      { label: content.venues.v2label, name: content.venues.v2name, detail: content.venues.v2detail, logo: logos.uleam },
    ];
    let cursorY = 0;
    const elements = [];
    venueDefinitions.forEach((definition) => {
      const label = paragraph(fonts.sansBold, definition.label.toUpperCase(), { x: textX, top: cardPadding, size: 19, fill: ROLLUP_ACCENT, anchor: "start", maxWidth: textWidth, tracking: 2.5, lineHeight: 28 });
      const name = paragraph(fonts.serif, definition.name, { x: textX, top: cardPadding + label.height + 8, size: 44, fill: ROLLUP_PRIMARY, anchor: "start", maxWidth: textWidth, lineHeight: 50 });
      const detail = paragraph(fonts.sans, definition.detail, { x: textX, top: cardPadding + label.height + 8 + name.height + 6, size: 24, fill: ROLLUP_MUTED, anchor: "start", maxWidth: textWidth, lineHeight: 32 });
      const cardHeight = Math.max(logoHeight, label.height + 8 + name.height + 6 + detail.height) + cardPadding * 2;
      const logoWidth = logoWidthFor(definition.logo, logoHeight);
      elements.push(
        { kind: "rect", x: margin, y: cursorY, width: contentWidth, height: cardHeight, radius: 22, fill: "#FFFFFF", stroke: "#D9E2EF", strokeWidth: 2 },
        { kind: "image", href: definition.logo.href, x: margin + cardPadding + (logoColumnWidth - logoWidth) / 2, y: cursorY + (cardHeight - logoHeight) / 2, width: logoWidth, height: logoHeight },
        ...[...label.elements, ...name.elements, ...detail.elements].map((element) => ({ ...element, transformY: cursorY }))
      );
      cursorY += cardHeight + cardGap;
    });
    return { height: cursorY - cardGap, elements };
  };

  const buildVenues = () => {
    if (venueLayout === "rows") return buildVenuesRows();
    const cardGap = 24;
    const cardWidth = (contentWidth - cardGap) / 2;
    const cardPadding = 30;
    const innerWidth = cardWidth - cardPadding * 2;
    const venueDefinitions = [
      { label: content.venues.v1label, name: content.venues.v1name, detail: rollup.v1short, logo: logos.ehu, logoHeight: 110 },
      { label: content.venues.v2label, name: content.venues.v2name, detail: content.venues.v2detail, logo: logos.uleam, logoHeight: 110 },
    ];
    const cards = venueDefinitions.map((definition, cardIndex) => {
      const cardX = margin + cardIndex * (cardWidth + cardGap);
      const cardCenterX = cardX + cardWidth / 2;
      const elements = [];
      let cursorY = cardPadding;
      const label = paragraph(fonts.sansBold, definition.label.toUpperCase(), { x: cardCenterX, top: cursorY, size: 19, fill: ROLLUP_ACCENT, maxWidth: innerWidth, tracking: 2.5, lineHeight: 28 });
      cursorY += label.height + 18;
      const logoWidth = logoWidthFor(definition.logo, definition.logoHeight);
      elements.push({ kind: "image", href: definition.logo.href, x: cardCenterX - logoWidth / 2, y: cursorY, width: logoWidth, height: definition.logoHeight });
      cursorY += definition.logoHeight + 22;
      const name = paragraph(fonts.serif, definition.name, { x: cardCenterX, top: cursorY, size: 46, fill: ROLLUP_PRIMARY, maxWidth: innerWidth, lineHeight: 52 });
      cursorY += name.height + 10;
      const detail = paragraph(fonts.sans, definition.detail, { x: cardCenterX, top: cursorY, size: 24, fill: ROLLUP_MUTED, maxWidth: innerWidth, lineHeight: 32 });
      cursorY += detail.height + cardPadding;
      elements.unshift(...label.elements);
      elements.push(...name.elements, ...detail.elements);
      return { cardX, height: cursorY, elements };
    });
    const cardHeight = Math.max(...cards.map((card) => card.height));
    const elements = cards.flatMap((card) => [
      { kind: "rect", x: card.cardX, y: 0, width: cardWidth, height: cardHeight, radius: 22, fill: "#FFFFFF", stroke: "#D9E2EF", strokeWidth: 2 },
      ...card.elements,
    ]);
    return { height: cardHeight, elements };
  };

  // Cifras
  const buildStats = () => {
    const stats = content.stats;
    const cellWidth = contentWidth / stats.length;
    const elements = [];
    let rowHeight = 0;
    stats.forEach((stat, statIndex) => {
      const cellCenterX = margin + statIndex * cellWidth + cellWidth / 2;
      const number = paragraph(fonts.serif, stat.n, { x: cellCenterX, top: 0, size: 96, fill: ROLLUP_PRIMARY, maxWidth: cellWidth, lineHeight: 96 });
      const label = paragraph(fonts.sans, stat.l, { x: cellCenterX, top: number.height + 4, size: 23, fill: ROLLUP_MUTED, maxWidth: cellWidth - 24, lineHeight: 30 });
      elements.push(...number.elements, ...label.elements);
      rowHeight = Math.max(rowHeight, number.height + 4 + label.height);
    });
    for (let dividerIndex = 1; dividerIndex < stats.length; dividerIndex++) {
      elements.push({ kind: "rect", x: margin + dividerIndex * cellWidth - 1, y: 10, width: 2, height: rowHeight - 20, fill: "#D9E2EF" });
    }
    return { height: rowHeight, elements };
  };

  // Líneas temáticas + formatos
  const buildLines = () => {
    const elements = [];
    const head = paragraph(fonts.serif, rollup.head_lines, { x: centerX, top: 0, size: 64, fill: ROLLUP_PRIMARY, maxWidth: contentWidth, lineHeight: 72 });
    elements.push(...head.elements);
    let cursorY = head.height + 12;
    elements.push({ kind: "rect", x: centerX - 40, y: cursorY, width: 80, height: 5, radius: 2.5, fill: ROLLUP_ACCENT });
    cursorY += 5 + 34;
    content.lineas.items.forEach((item) => {
      const number = paragraph(fonts.sansBold, item.id, { x: margin, top: cursorY, size: 34, fill: ROLLUP_ACCENT, anchor: "start", maxWidth: 90, lineHeight: 46 });
      const title = paragraph(fonts.sansBold, item.title, { x: margin + 96, top: cursorY, size: 34, fill: ROLLUP_INK, anchor: "start", maxWidth: contentWidth - 96, lineHeight: 46 });
      elements.push(...number.elements, ...title.elements);
      cursorY += title.height + 24;
    });
    cursorY += 6;
    // Píldoras de formato, centradas y en varias filas si hace falta
    const pillSize = 26;
    const pillHeight = 58;
    const pillGap = 16;
    const pills = content.formatos.items.map((format) => ({ text: format.f, width: measureText(fonts.sansBold, format.f, pillSize) + 50 }));
    const rows = [];
    let currentRow = [];
    let currentRowWidth = 0;
    pills.forEach((pill) => {
      const nextWidth = currentRowWidth + (currentRow.length ? pillGap : 0) + pill.width;
      if (currentRow.length && nextWidth > contentWidth) {
        rows.push(currentRow);
        currentRow = [pill];
        currentRowWidth = pill.width;
      } else {
        currentRow.push(pill);
        currentRowWidth = nextWidth;
      }
    });
    if (currentRow.length) rows.push(currentRow);
    rows.forEach((row) => {
      const rowWidth = row.reduce((total, pill) => total + pill.width, 0) + pillGap * (row.length - 1);
      let pillX = centerX - rowWidth / 2;
      row.forEach((pill) => {
        elements.push({ kind: "rect", x: pillX, y: cursorY, width: pill.width, height: pillHeight, radius: pillHeight / 2, fill: ROLLUP_TINT });
        const pillText = paragraph(fonts.sansBold, pill.text, { x: pillX + pill.width / 2, top: cursorY, size: pillSize, fill: ROLLUP_PRIMARY, maxWidth: pill.width, lineHeight: pillHeight });
        elements.push(...pillText.elements);
        pillX += pill.width + pillGap;
      });
      cursorY += pillHeight + pillGap;
    });
    return { height: cursorY - pillGap, elements };
  };

  // Programa
  const buildProgram = () => {
    const elements = [];
    const head = paragraph(fonts.serif, rollup.head_program, { x: centerX, top: 0, size: 64, fill: ROLLUP_PRIMARY, maxWidth: contentWidth, lineHeight: 72 });
    elements.push(...head.elements);
    let cursorY = head.height + 12;
    elements.push({ kind: "rect", x: centerX - 40, y: cursorY, width: 80, height: 5, radius: 2.5, fill: ROLLUP_ACCENT });
    cursorY += 5 + 34;
    const dayPillWidth = 200;
    const textX = margin + dayPillWidth + 30;
    const textWidth = contentWidth - dayPillWidth - 30;
    ["28", "29", "30"].forEach((dayNumber, dayIndex) => {
      const summary = paragraph(fonts.sans, rollup[`d${dayNumber}`], { x: textX, top: cursorY, size: 27, fill: ROLLUP_INK, anchor: "start", maxWidth: textWidth, lineHeight: 37 });
      const speakerNames = plenarySpeakerNames(dayNumber);
      const speakers = speakerNames.length
        ? paragraph(fonts.sansBold, `${rollup.plenary}: ${speakerNames.join(" · ")}`, { x: textX, top: cursorY + summary.height + 8, size: 25, fill: ROLLUP_PRIMARY, anchor: "start", maxWidth: textWidth, lineHeight: 34 })
        : { elements: [], height: -8 };
      const rowHeight = Math.max(summary.height + 8 + speakers.height, 62);
      elements.push({ kind: "rect", x: margin, y: cursorY + 2, width: dayPillWidth, height: 62, radius: 14, fill: ROLLUP_PRIMARY });
      const dayLabel = paragraph(fonts.sansBold, `${dayNumber} ${rollup.monthShort}`, { x: margin + dayPillWidth / 2, top: cursorY + 2, size: 30, fill: "#FFFFFF", maxWidth: dayPillWidth, lineHeight: 62, tracking: 2 });
      elements.push(...dayLabel.elements, ...summary.elements, ...speakers.elements);
      cursorY += rowHeight + (dayIndex < 2 ? 34 : 0);
    });
    return { height: cursorY, elements };
  };

  // Pie: QR + web + logos
  const buildFooter = () => {
    const elements = [];
    const bandPadding = 64;
    const qrCardSide = 320;
    const qrSide = qrCardSide - 50;
    const bandHeight = bandPadding * 2 + qrCardSide;
    elements.push({ kind: "rect", x: 0, y: 0, width: designWidth, height: bandHeight, fill: ROLLUP_PRIMARY });
    elements.push({ kind: "rect", x: margin, y: bandPadding, width: qrCardSide, height: qrCardSide, radius: 24, fill: "#FFFFFF" });
    elements.push({ kind: "path", d: qrPathData(ROLLUP_URL, margin + 25, bandPadding + 25, qrSide), fill: ROLLUP_PRIMARY });
    const textX = margin + qrCardSide + 50;
    const textWidth = designWidth - margin - textX;
    const scan = paragraph(fonts.sansBold, rollup.scan.toUpperCase(), { x: textX, top: 0, size: 24, fill: ROLLUP_ACCENT_LIGHT, anchor: "start", maxWidth: textWidth, tracking: 3, lineHeight: 34 });
    const webSize = Math.min(88, fitTextSize(fonts.serifItalic, [rollup.web], 88, textWidth));
    const web = paragraph(fonts.serifItalic, rollup.web, { x: textX, top: 0, size: webSize, fill: "#FFFFFF", anchor: "start", maxWidth: textWidth + 40, lineHeight: webSize * 1.15 });
    const contact = paragraph(fonts.sans, content.footer.contact2, { x: textX, top: 0, size: 26, fill: "#CBD9F0", anchor: "start", maxWidth: textWidth, lineHeight: 36 });
    const stackHeight = scan.height + 14 + web.height + 22 + contact.height;
    const stackTop = bandPadding + (qrCardSide - stackHeight) / 2;
    const shift = (paragraphResult, offsetY) => paragraphResult.elements.map((element) => ({ ...element, transformY: stackTop + offsetY }));
    elements.push(...shift(scan, 0), ...shift(web, scan.height + 14), ...shift(contact, scan.height + 14 + web.height + 22));

    // Franja blanca con logos
    const stripPadding = 44;
    const logoHeight = 96;
    const logoOrder = ["inedus", "uleam", "ehu", "kideon"];
    const logoWidths = logoOrder.map((logoName) => logoWidthFor(logos[logoName], logoHeight));
    const totalLogoWidth = logoWidths.reduce((total, width) => total + width, 0);
    const logoGap = Math.max(24, (contentWidth - totalLogoWidth) / (logoOrder.length - 1));
    const stripHeight = stripPadding * 2 + logoHeight;
    const rowWidth = totalLogoWidth + logoGap * (logoOrder.length - 1);
    let logoX = centerX - rowWidth / 2;
    elements.push({ kind: "rect", x: 0, y: bandHeight, width: designWidth, height: stripHeight, fill: "#FFFFFF" });
    logoOrder.forEach((logoName, logoIndex) => {
      elements.push({ kind: "image", href: logos[logoName].href, x: logoX, y: bandHeight + stripPadding, width: logoWidths[logoIndex], height: logoHeight });
      if (logoIndex < logoOrder.length - 1) {
        elements.push({ kind: "rect", x: logoX + logoWidths[logoIndex] + logoGap / 2 - 1, y: bandHeight + stripPadding + 10, width: 2, height: logoHeight - 20, fill: "#D9E2EF" });
      }
      logoX += logoWidths[logoIndex] + logoGap;
    });
    return { height: bandHeight + stripHeight, elements };
  };

  // Cabecera apaisada: logo · título · fechas en una sola franja
  const buildHeaderWide = () => {
    const elements = [];
    const padding = 56;
    const logoPillWidth = 300;
    const logoInnerWidth = logoPillWidth - 40;
    const logoInnerHeight = (logos.inedus.height / logos.inedus.width) * logoInnerWidth;
    const logoPillHeight = logoInnerHeight + 40;
    const datesWidth = 430;
    const titleX = margin + logoPillWidth + 70;
    const titleWidth = designWidth - margin - datesWidth - 70 - titleX;
    const datesCenterX = designWidth - margin - datesWidth / 2;

    const kicker = paragraph(fonts.sansBold, rollup.kicker.toUpperCase(), { x: titleX, top: 0, size: 24, fill: ROLLUP_ACCENT_LIGHT, anchor: "start", maxWidth: titleWidth, tracking: 6, lineHeight: 34 });
    const titleParts = content.heroTitleParts;
    const titleSize = fitTextSize(fonts.serif, titleParts, 92, titleWidth);
    let titleTop = kicker.height + 12;
    const titleLines = titleParts.map((part, partIndex) => {
      const isLast = partIndex === titleParts.length - 1;
      const line = paragraph(isLast ? fonts.serifItalic : fonts.serif, part, { x: titleX, top: titleTop, size: titleSize, fill: isLast ? ROLLUP_ACCENT_LIGHT : "#FFFFFF", anchor: "start", maxWidth: titleWidth * 1.2, lineHeight: titleSize * 1.08 });
      titleTop += line.height;
      return line;
    });
    const titleStackHeight = titleTop;

    const dateBig = paragraph(fonts.serif, rollup.dateBig, { x: datesCenterX, top: 0, size: 150, fill: "#FFFFFF", maxWidth: datesWidth, lineHeight: 140 });
    const dateMonth = paragraph(fonts.sansBold, rollup.dateMonth.toUpperCase(), { x: datesCenterX, top: dateBig.height + 2, size: 30, fill: ROLLUP_ACCENT_LIGHT, maxWidth: datesWidth, tracking: 7, lineHeight: 42 });
    const dateHybrid = paragraph(fonts.sansBold, content.hybrid, { x: datesCenterX, top: dateBig.height + dateMonth.height + 22, size: 24, fill: "#CBD9F0", maxWidth: datesWidth, lineHeight: 34 });
    const datesStackHeight = dateBig.height + dateMonth.height + 22 + dateHybrid.height;

    const bandHeight = padding * 2 + Math.max(logoPillHeight, titleStackHeight, datesStackHeight);
    const centered = (stackHeight) => (bandHeight - stackHeight) / 2;
    const shift = (paragraphResult, offsetY) => paragraphResult.elements.map((element) => ({ ...element, transformY: offsetY }));

    elements.push({ kind: "rect", x: 0, y: 0, width: designWidth, height: bandHeight, fill: ROLLUP_PRIMARY });
    elements.push({ kind: "rect", x: 0, y: bandHeight, width: designWidth, height: 14, fill: ROLLUP_ACCENT });
    elements.push({ kind: "rect", x: margin, y: centered(logoPillHeight), width: logoPillWidth, height: logoPillHeight, radius: 20, fill: "#FFFFFF" });
    elements.push({ kind: "image", href: logos.inedus.href, x: margin + 20, y: centered(logoPillHeight) + 20, width: logoInnerWidth, height: logoInnerHeight });
    const titleOffset = centered(titleStackHeight);
    elements.push(...shift(kicker, titleOffset));
    titleLines.forEach((line) => elements.push(...shift(line, titleOffset)));
    const datesOffset = centered(datesStackHeight);
    elements.push(...shift(dateBig, datesOffset), ...shift(dateMonth, datesOffset), ...shift(dateHybrid, datesOffset));
    elements.push({ kind: "rect", x: designWidth - margin - datesWidth - 35, y: datesOffset + 10, width: 2, height: datesStackHeight - 20, fill: ROLLUP_ACCENT_LIGHT, opacity: 0.35 });
    return { height: bandHeight + 14, elements };
  };

  // Pie apaisado: QR · web · logos en una sola franja
  const buildFooterWide = () => {
    const elements = [];
    const bandPadding = 40;
    const qrCardSide = 210;
    const bandHeight = bandPadding * 2 + qrCardSide;
    elements.push({ kind: "rect", x: 0, y: 0, width: designWidth, height: bandHeight, fill: ROLLUP_PRIMARY });
    elements.push({ kind: "rect", x: margin, y: bandPadding, width: qrCardSide, height: qrCardSide, radius: 20, fill: "#FFFFFF" });
    elements.push({ kind: "path", d: qrPathData(ROLLUP_URL, margin + 18, bandPadding + 18, qrCardSide - 36), fill: ROLLUP_PRIMARY });

    const logoHeight = 84;
    const logoOrder = ["inedus", "uleam", "ehu", "kideon"];
    const logoWidths = logoOrder.map((logoName) => logoWidthFor(logos[logoName], logoHeight));
    const logoGap = 36;
    const panelPadding = 34;
    const panelWidth = logoWidths.reduce((total, width) => total + width, 0) + logoGap * (logoOrder.length - 1) + panelPadding * 2;
    const panelHeight = logoHeight + panelPadding * 2;
    const panelX = designWidth - margin - panelWidth;
    const panelY = (bandHeight - panelHeight) / 2;
    elements.push({ kind: "rect", x: panelX, y: panelY, width: panelWidth, height: panelHeight, radius: 20, fill: "#FFFFFF" });
    let logoX = panelX + panelPadding;
    logoOrder.forEach((logoName, logoIndex) => {
      elements.push({ kind: "image", href: logos[logoName].href, x: logoX, y: panelY + panelPadding, width: logoWidths[logoIndex], height: logoHeight });
      logoX += logoWidths[logoIndex] + logoGap;
    });

    const textX = margin + qrCardSide + 50;
    const textWidth = panelX - 50 - textX;
    const scan = paragraph(fonts.sansBold, rollup.scan.toUpperCase(), { x: textX, top: 0, size: 22, fill: ROLLUP_ACCENT_LIGHT, anchor: "start", maxWidth: textWidth, tracking: 3, lineHeight: 32 });
    const webSize = fitTextSize(fonts.serifItalic, [rollup.web], 80, textWidth);
    const web = paragraph(fonts.serifItalic, rollup.web, { x: textX, top: 0, size: webSize, fill: "#FFFFFF", anchor: "start", maxWidth: textWidth * 1.2, lineHeight: webSize * 1.15 });
    const contact = paragraph(fonts.sans, content.footer.contact2, { x: textX, top: 0, size: 24, fill: "#CBD9F0", anchor: "start", maxWidth: textWidth, lineHeight: 34 });
    const stackHeight = scan.height + 10 + web.height + 14 + contact.height;
    const stackTop = (bandHeight - stackHeight) / 2;
    const shift = (paragraphResult, offsetY) => paragraphResult.elements.map((element) => ({ ...element, transformY: stackTop + offsetY }));
    elements.push(...shift(scan, 0), ...shift(web, scan.height + 10), ...shift(contact, scan.height + 10 + web.height + 14));
    return { height: bandHeight, elements };
  };

  return {
    headerWide: buildHeaderWide(),
    footerWide: buildFooterWide(),
    header: buildHeader(),
    dates: buildDates(),
    venues: buildVenues(),
    stats: buildStats(),
    lines: buildLines(),
    program: buildProgram(),
    footer: buildFooter(),
  };
};

// ── Composición según la medida ──────────────────────────────────────────────
// Prueba anchos de diseño crecientes (texto relativamente más pequeño) hasta que cabe el máximo de bloques.

const DISPLAY_ORDER = ["header", "dates", "venues", "stats", "lines", "program", "footer"];
const DROP_ORDER = ["stats", "lines", "program"]; // se descartan en este orden si no caben
const DESIGN_WIDTHS = [1000, 1080, 1160, 1240, 1340, 1460, 1600, 1760];
const MIN_GAP = 60;
const MAX_GAP = 130;

const composeRollup = ({ fonts, logos, content, widthCm, heightCm }) => {
  const aspectRatio = heightCm / widthCm;
  for (let droppedCount = 0; droppedCount <= DROP_ORDER.length; droppedCount++) {
    const dropped = DROP_ORDER.slice(0, droppedCount);
    for (const designWidth of DESIGN_WIDTHS) {
      const designHeight = designWidth * aspectRatio;
      const blocks = buildLayoutBlocks({ fonts, logos, content, designWidth });
      const shownIds = DISPLAY_ORDER.filter((blockId) => !dropped.includes(blockId));
      const blocksHeight = shownIds.reduce((total, blockId) => total + blocks[blockId].height, 0);
      const gapCount = shownIds.length - 1;
      if (blocksHeight + gapCount * MIN_GAP <= designHeight) {
        const freeSpace = designHeight - blocksHeight;
        const gap = Math.min(MAX_GAP, freeSpace / gapCount);
        const leftover = freeSpace - gap * gapCount;
        const headerExtra = leftover * 0.5;
        const datesExtra = leftover * 0.5;
        let cursorY = 0;
        const placed = shownIds.map((blockId) => {
          const block = blocks[blockId];
          const placedBlock = { id: blockId, y: cursorY, elements: block.elements, height: block.height };
          let advance = block.height;
          if (blockId === "header") advance += headerExtra;
          if (blockId === "dates") advance += datesExtra;
          cursorY += advance + gap;
          return placedBlock;
        });
        // El pie se ancla siempre al borde inferior
        const footerBlock = placed.find((block) => block.id === "footer");
        footerBlock.y = designHeight - footerBlock.height;
        return { designWidth, designHeight, placed, dropped, overflow: false };
      }
    }
  }
  // Ni siquiera cabe lo obligatorio: se muestra lo mínimo comprimido
  const designWidth = DESIGN_WIDTHS[DESIGN_WIDTHS.length - 1];
  const designHeight = designWidth * aspectRatio;
  const blocks = buildLayoutBlocks({ fonts, logos, content, designWidth });
  const shownIds = ["header", "dates", "venues", "footer"];
  let cursorY = 0;
  const placed = shownIds.map((blockId) => {
    const placedBlock = { id: blockId, y: cursorY, elements: blocks[blockId].elements, height: blocks[blockId].height };
    cursorY += blocks[blockId].height + 20;
    return placedBlock;
  });
  return { designWidth, designHeight, placed, dropped: DROP_ORDER, overflow: true };
};

const LANDSCAPE_DESIGN_WIDTHS = [1700, 1850, 2000, 2200, 2400, 2650, 2900, 3200, 3600, 4000];
const COLUMN_MARGIN = 72;
const COLUMN_GAP = 48;

const composeLandscape = ({ fonts, logos, content, widthCm, heightCm }) => {
  const aspectRatio = heightCm / widthCm;
  const stackColumn = (blocks) => {
    let cursorY = 0;
    const placedColumn = blocks.map((block) => {
      const placedBlock = { block, y: cursorY };
      cursorY += block.height + MIN_GAP;
      return placedBlock;
    });
    return { placedColumn, height: cursorY - MIN_GAP };
  };
  for (const dropStats of [false, true]) {
    for (const designWidth of LANDSCAPE_DESIGN_WIDTHS) {
      const designHeight = designWidth * aspectRatio;
      const columnWidth = (designWidth - COLUMN_MARGIN * 2 - COLUMN_GAP * 2) / 3;
      const wide = buildLayoutBlocks({ fonts, logos, content, designWidth, venueLayout: "rows" });
      const narrow = buildLayoutBlocks({ fonts, logos, content, designWidth: columnWidth + COLUMN_MARGIN * 2, venueLayout: "rows" });
      const columnDefinitions = [
        dropStats ? [narrow.venues] : [narrow.venues, narrow.stats],
        [narrow.lines],
        [narrow.program],
      ].map(stackColumn);
      const bodyHeight = Math.max(...columnDefinitions.map((column) => column.height));
      const freeSpace = designHeight - wide.headerWide.height - wide.footerWide.height - bodyHeight;
      if (freeSpace >= MIN_GAP * 2) {
        const gap = freeSpace / 2;
        const bodyTop = wide.headerWide.height + gap;
        const placed = [
          { id: "header", x: 0, y: 0, elements: wide.headerWide.elements, height: wide.headerWide.height },
          ...columnDefinitions.flatMap((column, columnIndex) =>
            column.placedColumn.map((entry, entryIndex) => ({
              id: `column-${columnIndex}-${entryIndex}`,
              x: columnIndex * (columnWidth + COLUMN_GAP) + COLUMN_MARGIN - COLUMN_MARGIN,
              y: bodyTop + entry.y,
              elements: entry.block.elements,
              height: entry.block.height,
            }))
          ),
          { id: "footer", x: 0, y: designHeight - wide.footerWide.height, elements: wide.footerWide.elements, height: wide.footerWide.height },
        ];
        return { designWidth, designHeight, placed, dropped: dropStats ? ["stats"] : [], overflow: false };
      }
    }
  }
  // No cabe ni comprimido: mínimo imprescindible
  const designWidth = LANDSCAPE_DESIGN_WIDTHS[LANDSCAPE_DESIGN_WIDTHS.length - 1];
  const designHeight = designWidth * aspectRatio;
  const wide = buildLayoutBlocks({ fonts, logos, content, designWidth, venueLayout: "rows" });
  return {
    designWidth, designHeight, overflow: true, dropped: DROP_ORDER,
    placed: [
      { id: "header", x: 0, y: 0, elements: wide.headerWide.elements, height: wide.headerWide.height },
      { id: "footer", x: 0, y: designHeight - wide.footerWide.height, elements: wide.footerWide.elements, height: wide.footerWide.height },
    ],
  };
};

const composeForSize = (options) => (options.heightCm < options.widthCm ? composeLandscape(options) : composeRollup(options));

// ── Render SVG ───────────────────────────────────────────────────────────────

const renderElement = (element, elementIndex) => {
  const translate = element.transformY ? `translate(0 ${element.transformY})` : undefined;
  if (element.kind === "rect") {
    return <rect key={elementIndex} x={element.x} y={element.y} width={element.width} height={element.height} rx={element.radius || 0} fill={element.fill || "none"} fillOpacity={element.opacity} stroke={element.stroke} strokeWidth={element.strokeWidth} />;
  }
  if (element.kind === "image") {
    return <image key={elementIndex} href={element.href} x={element.x} y={element.y} width={element.width} height={element.height} preserveAspectRatio="xMidYMid meet" />;
  }
  return <path key={elementIndex} d={element.d} fill={element.fill} transform={translate} />;
};

const RollUpSvg = React.forwardRef(({ layout, label }, svgRef) => (
  <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox={`0 0 ${layout.designWidth} ${layout.designHeight}`} role="img" aria-label={label} style={{ display: "block", width: "100%", height: "100%" }}>
    <rect x="0" y="0" width={layout.designWidth} height={layout.designHeight} fill={ROLLUP_PAPER} />
    {layout.placed.map((block) => (
      <g key={block.id} transform={`translate(${block.x || 0} ${block.y})`}>{block.elements.map(renderElement)}</g>
    ))}
  </svg>
));

// ── Exportación ──────────────────────────────────────────────────────────────

const triggerDownload = (blob, fileName) => {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
};

const serializeSvg = (svgElement, widthCm, heightCm) => {
  const clone = svgElement.cloneNode(true);
  clone.setAttribute("width", `${widthCm * 10}mm`);
  clone.setAttribute("height", `${heightCm * 10}mm`);
  clone.removeAttribute("style");
  clone.removeAttribute("role");
  return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
};

const exportSvgFile = (svgElement, widthCm, heightCm, baseName) => {
  const svgText = serializeSvg(svgElement, widthCm, heightCm);
  triggerDownload(new Blob([svgText], { type: "image/svg+xml;charset=utf-8" }), `${baseName}.svg`);
};

const exportPdfFile = async (svgElement, widthCm, heightCm, baseName) => {
  const { jsPDF } = window.jspdf;
  const widthMm = widthCm * 10;
  const heightMm = heightCm * 10;
  const pdf = new jsPDF({ orientation: heightMm >= widthMm ? "portrait" : "landscape", unit: "mm", format: [widthMm, heightMm], compress: true });
  const clone = svgElement.cloneNode(true);
  clone.setAttribute("width", `${widthMm}`);
  clone.setAttribute("height", `${heightMm}`);
  clone.removeAttribute("style");
  const holder = document.createElement("div");
  holder.style.cssText = "position:fixed;left:-99999px;top:0;visibility:hidden";
  holder.appendChild(clone);
  document.body.appendChild(holder);
  try {
    await window.svg2pdf.svg2pdf(clone, pdf, { x: 0, y: 0, width: widthMm, height: heightMm });
  } finally {
    holder.remove();
  }
  pdf.save(`${baseName}.pdf`);
};

const exportPngFile = async (svgElement, widthCm, heightCm, baseName) => {
  const maxSide = 3600;
  const scale = maxSide / Math.max(widthCm, heightCm);
  const pixelWidth = Math.round(widthCm * scale);
  const pixelHeight = Math.round(heightCm * scale);
  const svgText = serializeSvg(svgElement, widthCm, heightCm).replace(/width="[^"]*mm"/, `width="${pixelWidth}"`).replace(/height="[^"]*mm"/, `height="${pixelHeight}"`);
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
    const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    triggerDownload(pngBlob, `${baseName}.png`);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
};

// ── Página ───────────────────────────────────────────────────────────────────

const formatCm = (value) => `${Number(value.toFixed(1))}`;

const RollUpPage = () => {
  const [lang, setLang] = React.useState("es");
  const [assets, setAssets] = React.useState(null);
  const [loadFailed, setLoadFailed] = React.useState(false);
  const [orientation, setOrientation] = React.useState("portrait");
  const [sizeId, setSizeId] = React.useState("85x200");
  const [customWidthCm, setCustomWidthCm] = React.useState(85);
  const [customHeightCm, setCustomHeightCm] = React.useState(200);
  const [busyFormat, setBusyFormat] = React.useState(null);
  const [exportFailed, setExportFailed] = React.useState(false);
  const svgRef = React.useRef(null);

  const content = window.CONTENT_EHU[lang];
  const ui = content.rollup.ui;

  React.useEffect(() => {
    loadRollupAssets().then(setAssets).catch((error) => { console.error(error); setLoadFailed(true); });
  }, []);

  React.useEffect(() => { document.documentElement.lang = lang; document.title = `${ui.pageTitle} · INEDUS`; }, [lang, ui.pageTitle]);

  const selectedSize = sizeId === "custom"
    ? { widthCm: Math.min(300, Math.max(20, Number(customWidthCm) || 85)), heightCm: Math.min(400, Math.max(20, Number(customHeightCm) || 200)) }
    : [...ROLLUP_SIZES, ...ROLLUP_SIZES_LANDSCAPE].find((size) => size.id === sizeId);

  const layout = React.useMemo(
    () => (assets ? composeForSize({ fonts: assets.fonts, logos: assets.logos, content, widthCm: selectedSize.widthCm, heightCm: selectedSize.heightCm }) : null),
    [assets, content, selectedSize.widthCm, selectedSize.heightCm]
  );

  const sizeLabel = (size) => size.label ? `${size.label} · ${formatCm(size.widthCm)}×${formatCm(size.heightCm)} cm` : `${formatCm(size.widthCm)}×${formatCm(size.heightCm)} cm`;
  const baseName = `INEDUS2026_rollup_${formatCm(selectedSize.widthCm)}x${formatCm(selectedSize.heightCm)}cm_${lang}`;

  const runExport = async (format) => {
    if (!svgRef.current) return;
    setBusyFormat(format);
    setExportFailed(false);
    try {
      const exporters = { pdf: exportPdfFile, svg: async (...args) => exportSvgFile(...args), png: exportPngFile };
      await exporters[format](svgRef.current, selectedSize.widthCm, selectedSize.heightCm, baseName);
    } catch (error) {
      console.error(error);
      setExportFailed(true);
    } finally {
      setBusyFormat(null);
    }
  };

  const sizesForOrientation = orientation === "portrait" ? ROLLUP_SIZES : ROLLUP_SIZES_LANDSCAPE;
  const groupedSizes = { rollup: sizesForOrientation.filter((size) => size.group === "rollup"), a: sizesForOrientation.filter((size) => size.group === "a") };
  const chooseOrientation = (nextOrientation) => {
    setOrientation(nextOrientation);
    setSizeId(nextOrientation === "portrait" ? "85x200" : "h-a1");
  };

  const sizeButton = (size) => (
    <button key={size.id} onClick={() => setSizeId(size.id)} className={`chip ${sizeId === size.id ? "on" : ""}`}>{sizeLabel(size)}</button>
  );

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
        .dims { display: flex; gap: 10px; margin-top: 10px; }
        .dims label { flex: 1; font-size: 12px; color: ${ROLLUP_MUTED}; display: flex; flex-direction: column; gap: 4px; }
        .dims input { border: 1px solid #CBD5E1; border-radius: 8px; padding: 8px 10px; font: inherit; font-size: 14px; width: 100%; box-sizing: border-box; }
        .dl { display: flex; flex-direction: column; gap: 8px; }
        .dl button { text-align: left; border: 0; background: ${ROLLUP_PRIMARY}; color: #fff; border-radius: 12px; padding: 12px 16px; font: inherit; font-size: 14px; cursor: pointer; }
        .dl button.secondary { background: transparent; color: ${ROLLUP_PRIMARY}; border: 1px solid ${ROLLUP_PRIMARY}; }
        .dl button:disabled { opacity: .55; cursor: progress; }
        .note { font-size: 12px; line-height: 1.5; color: #94A3B8; }
        .error { font-size: 13px; color: #B42318; }
        .stage { padding: 28px; display: flex; align-items: center; justify-content: center; height: 100vh; box-sizing: border-box; background: #EEF1F6; position: sticky; top: 0; }
        .sheet { height: 100%; max-width: 100%; box-shadow: 0 18px 50px rgba(15, 23, 42, .25); background: ${ROLLUP_PAPER}; }
        .status { color: ${ROLLUP_MUTED}; font-size: 14px; }
        @media (max-width: 820px) {
          .page { grid-template-columns: 1fr; }
          .side { position: static; height: auto; border-right: 0; border-bottom: 1px solid #E2E8F0; }
          .stage { position: static; height: auto; padding: 16px; }
          .sheet { height: auto; width: 100%; max-width: 480px; }
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
          <div className="label">{ui.orientation}</div>
          <div className="lang">
            <button className={orientation === "portrait" ? "on" : ""} onClick={() => chooseOrientation("portrait")}>{ui.portraitLabel}</button>
            <button className={orientation === "landscape" ? "on" : ""} onClick={() => chooseOrientation("landscape")}>{ui.landscapeLabel}</button>
          </div>
        </div>

        <div>
          <div className="label">{ui.size} · {orientation === "portrait" ? ui.rollups : ui.posters}</div>
          <div className="row">{groupedSizes.rollup.map(sizeButton)}</div>
          <div className="label" style={{ marginTop: 14 }}>{ui.a4}</div>
          <div className="row">{groupedSizes.a.map(sizeButton)}</div>
          <div className="label" style={{ marginTop: 14 }}>{ui.custom}</div>
          <div className="row"><button className={`chip ${sizeId === "custom" ? "on" : ""}`} onClick={() => setSizeId("custom")}>{ui.custom}</button></div>
          {sizeId === "custom" && (
            <div className="dims">
              <label>{ui.width}<input type="number" min="20" max="300" value={customWidthCm} onChange={(event) => setCustomWidthCm(event.target.value)} /></label>
              <label>{ui.height}<input type="number" min="20" max="400" value={customHeightCm} onChange={(event) => setCustomHeightCm(event.target.value)} /></label>
            </div>
          )}
        </div>

        <div>
          <div className="label">{ui.download} · {formatCm(selectedSize.widthCm)}×{formatCm(selectedSize.heightCm)} cm</div>
          <div className="dl">
            <button disabled={!layout || busyFormat} onClick={() => runExport("pdf")}>{busyFormat === "pdf" ? ui.exporting : ui.pdf}</button>
            <button className="secondary" disabled={!layout || busyFormat} onClick={() => runExport("svg")}>{busyFormat === "svg" ? ui.exporting : ui.svg}</button>
            <button className="secondary" disabled={!layout || busyFormat} onClick={() => runExport("png")}>{busyFormat === "png" ? ui.exporting : ui.png}</button>
          </div>
          {exportFailed && <p className="error">{ui.errorExport}</p>}
        </div>

        <p className="note">{ui.note}</p>
      </aside>

      <main className="stage">
        {loadFailed ? <p className="error">{ui.errorLoad}</p> : !layout ? <p className="status">{ui.loading}</p> : (
          <div className="sheet" style={{ aspectRatio: `${selectedSize.widthCm} / ${selectedSize.heightCm}` }}>
            <RollUpSvg ref={svgRef} layout={layout} label={ui.pageTitle} />
          </div>
        )}
      </main>
    </div>
  );
};

Object.assign(window, { RollUpPage, composeRollup, composeLandscape, ROLLUP_SIZES, ROLLUP_SIZES_LANDSCAPE });
