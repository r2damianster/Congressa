// Página pública /archivos — plantillas y recursos descargables de INEDUS 2026.
// Los textos viven en CONTENT_EHU[lang].files (shared-content-ehu.jsx), en ES / EU / EN.

const FilesPage = () => {
  const [lang, setLang] = React.useState(window.getInitialLang);
  const content = window.CONTENT_EHU[lang];
  const filesContent = content.files;
  const styles = filesPageStyles();

  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${filesContent.pageTitle} · INEDUS 2026`;
  }, [lang]);

  const handleLangChange = (nextLang) => {
    setLang(nextLang);
    window.saveLang(nextLang);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <a href={`/home`} style={styles.logoLink}>
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
        <a href="/home" style={styles.backLink}>{filesContent.back}</a>
        <h1 style={styles.title}>
          <span style={styles.star}>★</span> {filesContent.pageTitle}
        </h1>
        <p style={styles.lead}>{filesContent.pageLead}</p>

        {filesContent.groups.map((group, groupIndex) => (
          <section key={groupIndex} style={styles.group}>
            <h2 style={styles.groupTitle}>{group.title}</h2>
            <div style={styles.grid}>
              {group.items.map((item, itemIndex) => (
                <article key={itemIndex} style={styles.card}>
                  <span style={styles.kindBadge}>{item.kind}</span>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardDescription}>{item.desc}</p>
                  <div style={styles.linkRow}>
                    {item.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        {...(link.internal ? {} : { download: true })}
                        style={styles.downloadButton}
                      >
                        {link.internal ? '' : '↓ '}{link.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer style={styles.footer}>{content.footer.copy}</footer>
    </div>
  );
};

const filesPageStyles = () => ({
  page: { fontFamily: "'Geist', -apple-system, sans-serif", color: "#1B2433", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px clamp(16px, 5vw, 56px)", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" },
  logoLink: { display: "flex" },
  logo: { height: 44, width: "auto" },
  langToggle: { display: "flex", border: "1px solid #CBD5E1", borderRadius: 999, overflow: "hidden" },
  langButton: { background: "transparent", border: "none", padding: "5px 10px", fontSize: 11, letterSpacing: 1, color: "#64748B", cursor: "pointer", fontFamily: "inherit" },
  langButtonActive: { background: "#1A3A6B", color: "#FFFFFF" },
  main: { flex: 1, width: "100%", maxWidth: 1000, margin: "0 auto", padding: "32px clamp(16px, 5vw, 56px) 56px" },
  backLink: { color: "#2A78B0", fontSize: 14, textDecoration: "none" },
  title: { fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, fontSize: "clamp(34px, 6vw, 52px)", color: "#1A3A6B", margin: "20px 0 8px", lineHeight: 1.1 },
  star: { color: "#3A9ECC" },
  lead: { fontSize: 17, color: "#475569", lineHeight: 1.55, maxWidth: 680, margin: "0 0 12px" },
  group: { marginTop: 36 },
  groupTitle: { fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#64748B", fontWeight: 600, margin: "0 0 14px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 },
  card: { background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: 22, display: "flex", flexDirection: "column", gap: 10 },
  kindBadge: { alignSelf: "flex-start", fontSize: 11, fontWeight: 600, letterSpacing: 1, color: "#1A3A6B", background: "#E6F1F8", borderRadius: 999, padding: "3px 10px" },
  cardTitle: { fontSize: 20, fontWeight: 600, color: "#1A3A6B", margin: 0 },
  cardDescription: { fontSize: 15, color: "#475569", lineHeight: 1.5, margin: 0, flex: 1 },
  linkRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 },
  downloadButton: { background: "#1A3A6B", color: "#FFFFFF", fontSize: 14, fontWeight: 500, textDecoration: "none", borderRadius: 8, padding: "9px 16px" },
  footer: { textAlign: "center", fontSize: 12, color: "#94A3B8", padding: "20px 16px", borderTop: "1px solid #E2E8F0", background: "#FFFFFF" },
});

Object.assign(window, { FilesPage });
