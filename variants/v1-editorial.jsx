// Variante 1 — Académico editorial
// Serif para titulares (Instrument Serif), sans-serif para cuerpo (Geist),
// mucho blanco, acento azul tinta, sensación de revista universitaria.

const V1 = ({ lang = "es", primary = "#1e3a8a" }) => {
  const c = window.CONTENT[lang];
  const s = v1Styles(primary);

  return (
    <div style={s.root}>
      {/* Top nav */}
      <header style={s.nav}>
        <div style={s.logoWrap}>
          <div style={s.logoMark}>
            <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
              <rect x="2" y="2" width="28" height="28" rx="2" stroke={primary} strokeWidth="1.5" />
              <path d="M10 22V10h6a4 4 0 010 8h-6M10 16h8" stroke={primary} strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <div style={s.logoWord}>Congressa</div>
            <div style={s.logoSub}>CIPP · 2026</div>
          </div>
        </div>
        <nav style={s.navLinks}>
          {Object.values(c.nav).map((n, i) => (
            <a key={i} style={s.navLink} href="#">{n}</a>
          ))}
        </nav>
        <div style={s.navRight}>
          <span style={s.langPill}>{lang.toUpperCase()}</span>
          <button style={s.navCta}>{c.ctas.register} →</button>
        </div>
      </header>

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroMeta}>
          <span style={s.heroKicker}>{c.eventShort}</span>
          <span style={s.heroDot}>·</span>
          <span style={s.heroKicker}>{c.dates}</span>
          <span style={s.heroDot}>·</span>
          <span style={s.heroKicker}>{c.location}</span>
        </div>

        <h1 style={s.heroTitle}>
          {c.eventFull.split(" ").slice(0, -3).join(" ")}{" "}
          <em style={s.heroTitleEm}>{c.eventFull.split(" ").slice(-3).join(" ")}</em>
        </h1>

        <p style={s.heroLead}>{c.heroLead}</p>

        <div style={s.heroTaglineRow}>
          <div style={s.heroRule} />
          <div style={s.heroTagline}>{c.tagline}</div>
        </div>

        <div style={s.ctaRow}>
          <button style={s.ctaPrimary}>{c.ctas.register}</button>
          <button style={s.ctaSecondary}>{c.ctas.submit}</button>
          <a style={s.ctaText} href="#programa">{c.ctas.program} →</a>
        </div>

        <div style={s.heroImage}>
          <div style={s.heroImageLabel}>Aula Magna · Universidad de Salamanca</div>
          <div style={s.heroImageInner}>
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <defs>
                <pattern id="v1-stripes" width="10" height="10" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#f5f2ec" />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#e6ddc9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#v1-stripes)" />
            </svg>
            <div style={s.heroImageCaption}>[ fotografía del aula histórica ]</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={s.stats}>
        {c.stats.map((st, i) => (
          <div key={i} style={s.statCell}>
            <div style={s.statN}>{st.n}</div>
            <div style={s.statL}>{st.l}</div>
          </div>
        ))}
      </section>

      {/* Axes */}
      <section style={s.section}>
        <div style={s.sectionHead}>
          <div style={s.sectionNumber}>I</div>
          <div>
            <h2 style={s.sectionTitle}>{c.axes.title}</h2>
            <p style={s.sectionLead}>{c.axes.lead}</p>
          </div>
        </div>
        <div style={s.axesGrid}>
          {c.axes.items.map((a, i) => (
            <article key={i} style={s.axCard}>
              <div style={s.axNum}>{a.id}</div>
              <h3 style={s.axTitle}>{a.title}</h3>
              <p style={s.axDesc}>{a.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Agenda */}
      <section style={{ ...s.section, background: "#faf7f1" }} id="programa">
        <div style={s.sectionHead}>
          <div style={s.sectionNumber}>II</div>
          <div>
            <h2 style={s.sectionTitle}>{c.agenda.title}</h2>
            <p style={s.sectionLead}>{c.agenda.lead}</p>
          </div>
        </div>

        <div style={s.agendaGrid}>
          {c.agenda.days.map((d, i) => (
            <div key={i} style={s.dayCol}>
              <div style={s.dayHead}>
                <div style={s.dayShort}>{d.short}</div>
                <div style={s.dayLabel}>{d.label}</div>
                <div style={s.dayTheme}>— {d.theme}</div>
              </div>
              <div style={s.sessions}>
                {d.sessions.map((ss, j) => (
                  <div key={j} style={s.sessRow}>
                    <div style={s.sessTime}>{ss.t}</div>
                    <div style={s.sessBody}>
                      <div style={s.sessType}>{ss.type} · {ss.room}</div>
                      <div style={s.sessTitle}>{ss.title}</div>
                      {ss.speaker && <div style={s.sessSpeaker}>{ss.speaker}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Speakers */}
      <section style={s.section}>
        <div style={s.sectionHead}>
          <div style={s.sectionNumber}>III</div>
          <div>
            <h2 style={s.sectionTitle}>{c.speakers.title}</h2>
            <p style={s.sectionLead}>{c.speakers.lead}</p>
          </div>
        </div>
        <div style={s.speakersGrid}>
          {c.speakers.items.map((sp, i) => (
            <div key={i} style={s.speakerCard}>
              <div style={s.speakerPortrait}>
                <svg width="100%" height="100%" preserveAspectRatio="none">
                  <defs>
                    <pattern id={`v1-portrait-${i}`} width="6" height="6" patternUnits="userSpaceOnUse">
                      <rect width="6" height="6" fill="#ece5d3" />
                      <circle cx="3" cy="3" r="0.6" fill="#c9bda0" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#v1-portrait-${i})`} />
                </svg>
                <div style={s.speakerInitials}>
                  {sp.name.split(" ").filter(x => !x.endsWith(".")).map(x => x[0]).slice(0, 2).join("")}
                </div>
              </div>
              <div style={s.speakerName}>{sp.name}</div>
              <div style={s.speakerRole}>{sp.role}</div>
              <div style={s.speakerTopic}>— {sp.topic}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CFP */}
      <section style={{ ...s.section, background: primary, color: "#fff" }}>
        <div style={s.sectionHead}>
          <div style={{ ...s.sectionNumber, color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>IV</div>
          <div>
            <h2 style={{ ...s.sectionTitle, color: "#fff" }}>{c.cfp.title}</h2>
            <p style={{ ...s.sectionLead, color: "rgba(255,255,255,0.75)" }}>{c.cfp.lead}</p>
          </div>
        </div>

        <div style={s.cfpGrid}>
          <div style={s.cfpTimeline}>
            {c.cfp.timeline.map((t, i) => (
              <div key={i} style={s.cfpStep}>
                <div style={{
                  ...s.cfpDot,
                  background: t.status === "done" ? "#fff" : t.status === "open" ? "#fff" : "transparent",
                  border: t.status === "open" ? "2px solid #fff" : t.status === "soon" ? "2px solid rgba(255,255,255,0.5)" : "2px solid rgba(255,255,255,0.25)",
                }} />
                <div style={s.cfpStepBody}>
                  <div style={s.cfpStepDate}>{t.date}</div>
                  <div style={s.cfpStepLabel}>{t.label}</div>
                  <div style={s.cfpStepStatus}>{c.cfp.statusLabels[t.status]}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={s.cfpAside}>
            <div style={s.cfpAsideHead}>Formatos de envío</div>
            {c.cfp.formats.map((f, i) => (
              <div key={i} style={s.cfpFormat}>
                <div style={s.cfpFormatName}>{f.f}</div>
                <div style={s.cfpFormatLen}>{f.len}</div>
              </div>
            ))}
            <div style={s.cfpNormsHead}>Normas</div>
            <div style={s.cfpNorms}>{c.cfp.norms}</div>
            <button style={s.cfpCta}>{c.ctas.submit} →</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerRow}>
          <div style={s.footerBrand}>
            <div style={s.logoWord}>Congressa</div>
            <div style={s.footerTag}>Plataforma de gestión de congresos académicos</div>
          </div>
          <div style={s.footerRight}>
            <div>{c.footer.contact}</div>
            <div style={s.footerCopy}>{c.footer.copy}</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const v1Styles = (primary) => ({
  root: {
    fontFamily: "'Geist', -apple-system, sans-serif",
    background: "#fbf9f4",
    color: "#1a1a1a",
    width: "100%",
    minHeight: "100%",
    fontSize: 15,
    lineHeight: 1.5,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    padding: "22px 64px",
    borderBottom: "1px solid #e9e2d2",
    background: "rgba(251,249,244,0.92)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 10 },
  logoMark: {
    width: 36, height: 36, border: `1px solid ${primary}`, borderRadius: 4,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  logoWord: {
    fontFamily: "'Instrument Serif', serif", fontSize: 20, letterSpacing: -0.2, color: primary,
  },
  logoSub: { fontSize: 10, letterSpacing: 1, color: "#7a7162", textTransform: "uppercase" },
  navLinks: { display: "flex", gap: 28, margin: "0 auto" },
  navLink: { color: "#3a3628", fontSize: 14, textDecoration: "none" },
  navRight: { display: "flex", alignItems: "center", gap: 14 },
  langPill: { fontSize: 11, letterSpacing: 1, color: "#7a7162", border: "1px solid #d8cfb8", padding: "4px 8px", borderRadius: 999 },
  navCta: {
    background: primary, color: "#fff", border: "none", padding: "10px 18px",
    borderRadius: 999, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
  },

  hero: { padding: "80px 64px 48px", maxWidth: 1280, margin: "0 auto" },
  heroMeta: { display: "flex", alignItems: "center", gap: 12, color: "#7a7162", fontSize: 13, letterSpacing: 0.3 },
  heroKicker: { textTransform: "uppercase", fontSize: 11, letterSpacing: 1.4 },
  heroDot: { color: "#c9bda0" },
  heroTitle: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: 92, lineHeight: 0.98, letterSpacing: -2, margin: "24px 0 0",
    color: "#1a1a1a", fontWeight: 400, maxWidth: 1000, textWrap: "balance",
  },
  heroTitleEm: { fontStyle: "italic", color: primary },
  heroLead: {
    marginTop: 28, maxWidth: 620, fontSize: 18, lineHeight: 1.55, color: "#3a3628", textWrap: "pretty",
  },
  heroTaglineRow: { display: "flex", alignItems: "center", gap: 16, marginTop: 36 },
  heroRule: { width: 56, height: 1, background: primary },
  heroTagline: { fontFamily: "'Instrument Serif', serif", fontSize: 22, fontStyle: "italic", color: primary },
  ctaRow: { display: "flex", alignItems: "center", gap: 16, marginTop: 44 },
  ctaPrimary: {
    background: primary, color: "#fff", border: "none", padding: "14px 28px",
    borderRadius: 999, fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
  },
  ctaSecondary: {
    background: "transparent", color: "#1a1a1a", border: "1px solid #1a1a1a",
    padding: "14px 28px", borderRadius: 999, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
  },
  ctaText: { color: primary, fontSize: 14, textDecoration: "none" },

  heroImage: {
    marginTop: 72, height: 420, background: "#f5f2ec", borderRadius: 4,
    position: "relative", overflow: "hidden", border: "1px solid #e9e2d2",
  },
  heroImageLabel: {
    position: "absolute", top: 20, left: 20, fontSize: 11, letterSpacing: 1.5,
    textTransform: "uppercase", color: "#7a7162", zIndex: 2,
  },
  heroImageInner: { width: "100%", height: "100%", position: "relative" },
  heroImageCaption: {
    position: "absolute", bottom: 20, right: 24, fontFamily: "monospace",
    fontSize: 11, color: "#a69a7b", zIndex: 2,
  },

  stats: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
    borderTop: "1px solid #e9e2d2", borderBottom: "1px solid #e9e2d2",
    maxWidth: 1280, margin: "0 auto",
  },
  statCell: { padding: "36px 40px", borderLeft: "1px solid #e9e2d2" },
  statN: { fontFamily: "'Instrument Serif', serif", fontSize: 52, color: primary, lineHeight: 1 },
  statL: { marginTop: 8, fontSize: 13, color: "#7a7162" },

  section: { padding: "96px 64px", maxWidth: 1280, margin: "0 auto" },
  sectionHead: { display: "flex", gap: 32, marginBottom: 56, alignItems: "flex-start" },
  sectionNumber: {
    fontFamily: "'Instrument Serif', serif", fontSize: 24, fontStyle: "italic",
    color: primary, paddingRight: 20, borderRight: "1px solid #d8cfb8", minWidth: 0,
  },
  sectionTitle: {
    fontFamily: "'Instrument Serif', serif", fontSize: 48, lineHeight: 1.05,
    margin: 0, fontWeight: 400, letterSpacing: -0.8,
  },
  sectionLead: { marginTop: 10, color: "#7a7162", fontSize: 16, maxWidth: 560 },

  axesGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 },
  axCard: {
    padding: "32px 28px", background: "#fff", border: "1px solid #e9e2d2",
    borderRadius: 4, minHeight: 180,
  },
  axNum: {
    fontFamily: "'Instrument Serif', serif", fontSize: 13, color: primary,
    letterSpacing: 2, marginBottom: 20,
  },
  axTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 24, margin: "0 0 10px", fontWeight: 400 },
  axDesc: { color: "#5a5244", fontSize: 14, lineHeight: 1.55, margin: 0 },

  agendaGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 },
  dayCol: { background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4, overflow: "hidden" },
  dayHead: { padding: "20px 20px 16px", borderBottom: "1px solid #e9e2d2", background: "#fbf9f4" },
  dayShort: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: primary },
  dayLabel: { fontFamily: "'Instrument Serif', serif", fontSize: 22, marginTop: 4 },
  dayTheme: { fontSize: 13, color: "#7a7162", fontStyle: "italic", marginTop: 2 },
  sessions: { padding: "8px 20px 20px" },
  sessRow: { display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px dashed #e9e2d2" },
  sessTime: { fontSize: 12, color: primary, fontFamily: "monospace", paddingTop: 2, minWidth: 42 },
  sessBody: { flex: 1 },
  sessType: { fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#a69a7b" },
  sessTitle: { fontSize: 14, marginTop: 4, color: "#1a1a1a", lineHeight: 1.35 },
  sessSpeaker: { fontSize: 12, color: "#7a7162", marginTop: 3, fontStyle: "italic" },

  speakersGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 },
  speakerCard: { display: "flex", flexDirection: "column" },
  speakerPortrait: {
    aspectRatio: "4/5", background: "#ece5d3", borderRadius: 4, position: "relative",
    overflow: "hidden", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center",
  },
  speakerInitials: {
    position: "absolute", fontFamily: "'Instrument Serif', serif", fontSize: 64,
    color: "rgba(0,0,0,0.15)", fontStyle: "italic",
  },
  speakerName: { fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400 },
  speakerRole: { fontSize: 13, color: "#5a5244", marginTop: 2 },
  speakerTopic: { fontSize: 12, color: primary, marginTop: 6, fontStyle: "italic" },

  cfpGrid: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64 },
  cfpTimeline: { position: "relative" },
  cfpStep: { display: "flex", gap: 20, paddingBottom: 28, position: "relative" },
  cfpDot: {
    width: 14, height: 14, borderRadius: 999, marginTop: 4, flexShrink: 0,
    position: "relative", zIndex: 2,
  },
  cfpStepBody: {
    flex: 1, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 24,
  },
  cfpStepDate: {
    fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
    color: "rgba(255,255,255,0.6)", fontFamily: "monospace",
  },
  cfpStepLabel: {
    fontFamily: "'Instrument Serif', serif", fontSize: 22, marginTop: 6, color: "#fff",
  },
  cfpStepStatus: { fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 4 },
  cfpAside: {
    padding: 32, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 4, height: "fit-content",
  },
  cfpAsideHead: {
    fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
    color: "rgba(255,255,255,0.7)", marginBottom: 18,
  },
  cfpFormat: { display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px dashed rgba(255,255,255,0.14)" },
  cfpFormatName: { fontFamily: "'Instrument Serif', serif", fontSize: 18, color: "#fff" },
  cfpFormatLen: { fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "monospace" },
  cfpNormsHead: {
    fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
    color: "rgba(255,255,255,0.7)", margin: "28px 0 10px",
  },
  cfpNorms: { fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 },
  cfpCta: {
    marginTop: 28, background: "#fff", color: primary, border: "none",
    padding: "14px 24px", borderRadius: 999, fontSize: 14, cursor: "pointer",
    fontFamily: "inherit", fontWeight: 500, width: "100%",
  },

  footer: { padding: "40px 64px", borderTop: "1px solid #e9e2d2", maxWidth: 1280, margin: "0 auto" },
  footerRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  footerBrand: {},
  footerTag: { fontSize: 12, color: "#7a7162", marginTop: 2 },
  footerRight: { textAlign: "right", fontSize: 13, color: "#5a5244" },
  footerCopy: { fontSize: 11, color: "#a69a7b", marginTop: 4 },
});

window.V1 = V1;
