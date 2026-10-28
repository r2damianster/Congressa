// Página previa /ecuador — avisa de que el programa (PDF) está en hora de España
// y muestra la equivalencia con Ecuador antes de abrir la agenda.
// Los textos viven en CONTENT_EHU[lang].ui.ecuadorGate* (shared-content-ehu.jsx), en ES / EU / EN.

const EcuadorGatePage = () => {
  const [lang, setLang] = React.useState(window.getInitialLang);
  const uiContent = window.CONTENT_EHU[lang].ui;
  const styles = ecuadorGateStyles();

  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${uiContent.ecuadorGateTitle} · INEDUS 2026`;
  }, [lang]);

  const handleLangChange = (nextLang) => {
    setLang(nextLang);
    window.saveLang(nextLang);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <a href="/home" style={styles.logoLink}>
          <img src="./LOGOINEDUS.jpeg" alt="INEDUS 2026" style={styles.logo} />
        </a>
        <div style={styles.langToggle}>
          {['es', 'eu', 'en'].map(langOption => (
            <button
              key={langOption}
              onClick={() => handleLangChange(langOption)}
              style={{ ...styles.langButton, ...(lang === langOption ? styles.langButtonActive : {}) }}
            >
              {langOption.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.title}>{uiContent.ecuadorGateTitle}</h1>
          <p style={styles.lead}>{uiContent.ecuadorGateLead}</p>

          <div style={styles.table}>
            <div style={styles.tableHeaderRow}>
              <span style={styles.tableHeaderCell}>{uiContent.ecuadorGateSpainLabel}</span>
              <span style={styles.tableHeaderCell}>{uiContent.ecuadorGateEcuadorLabel}</span>
            </div>
            {uiContent.ecuadorGateRows.map(timeRow => (
              <div key={timeRow.spain} style={styles.tableRow}>
                <span style={styles.timeSpain}>{timeRow.spain}</span>
                <span style={styles.arrow}>→</span>
                <span style={styles.timeEcuador}>{timeRow.ecuador}</span>
                <span style={styles.timeNote}>{timeRow.note}</span>
              </div>
            ))}
          </div>

          <a href="./Programa_INEDUS2026.pdf" style={styles.agendaButton}>{uiContent.ecuadorGateCta} →</a>
          <a href="/home" style={styles.backLink}>{uiContent.ecuadorGateBack}</a>
        </div>
      </main>
    </div>
  );
};

const ecuadorGateStyles = () => ({
  page: { fontFamily: "'Geist', -apple-system, sans-serif", color: "#1B2433", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px clamp(16px, 5vw, 56px)", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" },
  logoLink: { display: "flex" },
  logo: { height: 44, width: "auto" },
  langToggle: { display: "flex", border: "1px solid #CBD5E1", borderRadius: 999, overflow: "hidden" },
  langButton: { background: "transparent", border: "none", padding: "5px 10px", fontSize: 11, letterSpacing: 1, color: "#64748B", cursor: "pointer", fontFamily: "inherit" },
  langButtonActive: { background: "#1A3A6B", color: "#FFFFFF" },
  main: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px" },
  card: { width: "100%", maxWidth: 640, background: "#FFFFFF", border: "1px solid #E2E8F0", borderTop: "6px solid #E0A100", borderRadius: 14, padding: "clamp(22px, 5vw, 40px)", display: "flex", flexDirection: "column", gap: 20 },
  title: { fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, fontSize: "clamp(32px, 7vw, 46px)", color: "#1A3A6B", margin: 0, lineHeight: 1.1 },
  lead: { fontSize: 19, color: "#334155", lineHeight: 1.5, margin: 0 },
  table: { display: "flex", flexDirection: "column", gap: 8 },
  tableHeaderRow: { display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#64748B", fontWeight: 600, padding: "0 4px" },
  tableHeaderCell: {},
  tableRow: { display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: 14, rowGap: 2, background: "#F1F5F9", borderRadius: 10, padding: "12px 16px" },
  timeSpain: { fontSize: 32, fontWeight: 600, color: "#1A3A6B", minWidth: 90 },
  arrow: { fontSize: 24, color: "#64748B" },
  timeEcuador: { fontSize: 32, fontWeight: 700, color: "#B45309", minWidth: 90 },
  timeNote: { fontSize: 14, color: "#64748B", flexBasis: "100%" },
  agendaButton: { background: "#1A3A6B", color: "#FFFFFF", fontSize: 18, fontWeight: 600, textDecoration: "none", borderRadius: 10, padding: "16px 24px", textAlign: "center" },
  backLink: { color: "#2A78B0", fontSize: 14, textDecoration: "none", textAlign: "center" },
});

Object.assign(window, { EcuadorGatePage });
