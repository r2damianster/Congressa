// Variante 3 — Denso informativo
// Layout tipo dashboard público, grid amplio, monoespaciada para metadatos,
// agenda al frente, densidad alta, estilo revista técnica / Pitchfork / Bloomberg.

const V3 = ({ lang = "es", primary = "#1e3a8a" }) => {
  const c = window.CONTENT[lang];
  const s = v3Styles(primary);

  return (
    <div style={s.root}>
      {/* Ticker top */}
      <div style={s.ticker}>
        <div style={s.tickerInner}>
          <span style={s.tickerItem}><span style={s.tickerDot} />{lang === "es" ? "Envíos abiertos · cierran 15 Jun" : "Submissions open · close Jun 15"}</span>
          <span style={s.tickerItem}>{c.dates}</span>
          <span style={s.tickerItem}>{c.location}</span>
          <span style={s.tickerItem}>{lang === "es" ? "37 países confirmados" : "37 countries confirmed"}</span>
          <span style={s.tickerItem}>{lang === "es" ? "+120 ponencias aceptadas" : "+120 accepted papers"}</span>
        </div>
      </div>

      {/* Nav */}
      <header style={s.nav}>
        <div style={s.navLeft}>
          <div style={s.logoMark} />
          <div>
            <div style={s.logoWord}>CONGRESSA</div>
            <div style={s.logoSub}>cipp-2026 · salamanca</div>
          </div>
        </div>
        <nav style={s.navLinks}>
          {Object.entries(c.nav).map(([k, v], i) => (
            <a key={k} style={s.navLink} href={`#${k}`}>
              <span style={s.navLinkNum}>0{i + 1}</span> {v}
            </a>
          ))}
        </nav>
        <div style={s.navRight}>
          <span style={s.navTime}>{new Date().toLocaleTimeString(lang === "es" ? "es-ES" : "en-US", { hour: "2-digit", minute: "2-digit" })} CET</span>
          <button style={s.navCta}>{c.ctas.register} →</button>
        </div>
      </header>

      {/* Hero dashboard */}
      <section style={s.heroGrid}>
        {/* Left: title card */}
        <div style={s.heroTitle}>
          <div style={s.panelKicker}>
            <span>[ {lang === "es" ? "EVENTO" : "EVENT"} ]</span>
            <span>·</span>
            <span>{c.eventShort}</span>
          </div>
          <h1 style={s.heroH1}>{c.eventFull}</h1>
          <div style={s.heroTaglineV3}>— {c.tagline}</div>
          <p style={s.heroDesc}>{c.heroLead}</p>

          <div style={s.heroFooter}>
            <div style={s.heroFooterL}>
              <div style={s.heroFootRow}>
                <span style={s.heroFootK}>{lang === "es" ? "Fechas" : "Dates"}</span>
                <span style={s.heroFootV}>{c.dates}</span>
              </div>
              <div style={s.heroFootRow}>
                <span style={s.heroFootK}>{lang === "es" ? "Sede" : "Venue"}</span>
                <span style={s.heroFootV}>{c.location}</span>
              </div>
              <div style={s.heroFootRow}>
                <span style={s.heroFootK}>{lang === "es" ? "Modalidad" : "Format"}</span>
                <span style={s.heroFootV}>{c.hybrid}</span>
              </div>
            </div>
            <div style={s.heroCtas}>
              <button style={s.ctaPrimary}>{c.ctas.register}</button>
              <button style={s.ctaSecondary}>{c.ctas.submit}</button>
            </div>
          </div>
        </div>

        {/* Right: now + countdown */}
        <div style={s.heroSidePanels}>
          <div style={s.panel}>
            <div style={s.panelLabel}>// {lang === "es" ? "CUENTA REGRESIVA" : "COUNTDOWN"}</div>
            <div style={s.countdown}>
              {[
                { n: "172", l: lang === "es" ? "días" : "days" },
                { n: "08", l: "h" },
                { n: "44", l: "min" },
              ].map((x, i) => (
                <div key={i} style={s.countdownCell}>
                  <div style={s.countdownN}>{x.n}</div>
                  <div style={s.countdownL}>{x.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={s.panel}>
            <div style={s.panelLabel}>// CFP · {lang === "es" ? "ESTADO DE ENVÍOS" : "SUBMISSION STATUS"}</div>
            <div style={s.cfpStatusRow}>
              <div style={s.cfpBigN}>342</div>
              <div>
                <div style={s.cfpBigL}>{lang === "es" ? "Manuscritos recibidos" : "Manuscripts received"}</div>
                <div style={s.cfpSubL}>{lang === "es" ? "hasta hoy · cierre 15 Jun" : "to date · closes Jun 15"}</div>
              </div>
            </div>
            <div style={s.cfpBar}>
              <div style={{ ...s.cfpBarFill, width: "68%", background: primary }} />
            </div>
            <div style={s.cfpBreakdown}>
              <div style={s.cfpBreakRow}>
                <span style={s.cfpBreakDot(primary)} /> {lang === "es" ? "Eje 01 Neuroeducación" : "Track 01 Neuroed."} <span style={s.cfpBreakN}>89</span>
              </div>
              <div style={s.cfpBreakRow}>
                <span style={s.cfpBreakDot("#10b981")} /> {lang === "es" ? "Eje 02 Instrucción" : "Track 02 Instruction"} <span style={s.cfpBreakN}>112</span>
              </div>
              <div style={s.cfpBreakRow}>
                <span style={s.cfpBreakDot("#f59e0b")} /> {lang === "es" ? "Eje 03 Tecnología" : "Track 03 EdTech"} <span style={s.cfpBreakN}>76</span>
              </div>
              <div style={s.cfpBreakRow}>
                <span style={s.cfpBreakDot("#ec4899")} /> {lang === "es" ? "Eje 04 Psicodidáctica" : "Track 04 Psychodidactics"} <span style={s.cfpBreakN}>65</span>
              </div>
            </div>
          </div>

          <div style={s.panel}>
            <div style={s.panelLabel}>// {lang === "es" ? "PRÓXIMO HITO" : "NEXT MILESTONE"}</div>
            <div style={s.milestone}>
              <div style={s.milestoneDate}>15 / 06 / 2026</div>
              <div style={s.milestoneLabel}>{lang === "es" ? "Cierre de envíos de manuscritos" : "Manuscript submission deadline"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda mega panel */}
      <section style={s.agendaSec} id="programa">
        <div style={s.secHead}>
          <div style={s.secNum}>§ 01</div>
          <h2 style={s.secTitle}>{c.agenda.title.toUpperCase()}</h2>
          <div style={s.secMeta}>
            <span>{c.agenda.days.length} {lang === "es" ? "días" : "days"}</span>
            <span>·</span>
            <span>{c.agenda.days.reduce((n, d) => n + d.sessions.length, 0)} {lang === "es" ? "sesiones" : "sessions"}</span>
            <span>·</span>
            <span>6 {lang === "es" ? "salas" : "rooms"}</span>
          </div>
        </div>

        <div style={s.agendaTable}>
          <div style={s.agendaTableHead}>
            <div>{lang === "es" ? "HORA" : "TIME"}</div>
            <div>{lang === "es" ? "SESIÓN" : "SESSION"}</div>
            <div>{lang === "es" ? "PONENTE / DETALLE" : "SPEAKER / DETAIL"}</div>
            <div>{lang === "es" ? "TIPO" : "TYPE"}</div>
            <div>{lang === "es" ? "SALA" : "ROOM"}</div>
          </div>
          {c.agenda.days.map((d, di) => (
            <React.Fragment key={di}>
              <div style={s.agendaDayRow}>
                <div style={s.agendaDayDate}>{d.label}</div>
                <div style={s.agendaDayTheme}>— {d.theme}</div>
                <div style={s.agendaDayShort}>{d.short}</div>
              </div>
              {d.sessions.map((ss, si) => (
                <div key={si} style={s.agendaRow}>
                  <div style={s.agendaT}>{ss.t}</div>
                  <div style={s.agendaTitle}>{ss.title}</div>
                  <div style={s.agendaSpeaker}>{ss.speaker || "—"}</div>
                  <div>
                    <span style={{ ...s.typeBadge, borderColor: typeColorV3(ss.type).border, color: typeColorV3(ss.type).color }}>{ss.type}</span>
                  </div>
                  <div style={s.agendaRoom}>{ss.room}</div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Axes as rows */}
      <section style={s.axesSec}>
        <div style={s.secHead}>
          <div style={s.secNum}>§ 02</div>
          <h2 style={s.secTitle}>{c.axes.title.toUpperCase()}</h2>
          <div style={s.secMeta}>
            <span>{c.axes.lead}</span>
          </div>
        </div>
        <div style={s.axesRows}>
          {c.axes.items.map((a, i) => (
            <div key={i} style={s.axRow}>
              <div style={s.axRowNum}>{a.id}</div>
              <div style={s.axRowTitle}>{a.title}</div>
              <div style={s.axRowDesc}>{a.desc}</div>
              <div style={s.axRowStats}>
                {[89, 112, 76, 65][i]} {lang === "es" ? "envíos" : "submissions"}
              </div>
              <div style={s.axRowCta}>{lang === "es" ? "Ver" : "View"} →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Speakers row */}
      <section style={s.speakersSec}>
        <div style={s.secHead}>
          <div style={s.secNum}>§ 03</div>
          <h2 style={s.secTitle}>{c.speakers.title.toUpperCase()}</h2>
          <div style={s.secMeta}>
            <span>6 {lang === "es" ? "de 24 confirmados" : "of 24 confirmed"}</span>
          </div>
        </div>
        <div style={s.spGrid}>
          {c.speakers.items.map((sp, i) => (
            <div key={i} style={s.spCard}>
              <div style={s.spHead}>
                <div style={s.spAvatar}>
                  {sp.name.split(" ").filter(x => !x.endsWith(".")).map(x => x[0]).slice(0, 2).join("")}
                </div>
                <div style={s.spIndex}>0{i + 1}</div>
              </div>
              <div style={s.spName}>{sp.name}</div>
              <div style={s.spRole}>{sp.role}</div>
              <div style={s.spTopic}>{sp.topic}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CFP + registration split */}
      <section style={s.splitSec}>
        <div style={s.cfpPanel}>
          <div style={s.panelLabel} style={{ color: "rgba(255,255,255,0.55)" }}>// § 04 · CALL FOR PAPERS</div>
          <h3 style={s.splitTitle}>{c.cfp.title}</h3>
          <p style={s.splitLead}>{c.cfp.lead}</p>

          <div style={s.cfpTLv3}>
            {c.cfp.timeline.map((t, i) => (
              <div key={i} style={{
                ...s.cfpTLrow,
                opacity: t.status === "future" ? 0.45 : 1,
              }}>
                <div style={{
                  ...s.cfpTLdot,
                  background: t.status === "done" ? "#fff" :
                              t.status === "open" ? primary : "transparent",
                  borderColor: t.status === "open" ? primary : "rgba(255,255,255,0.4)",
                }} />
                <div style={s.cfpTLdate}>{t.date}</div>
                <div style={s.cfpTLlabel}>{t.label}</div>
                <div style={s.cfpTLstatus}>[{c.cfp.statusLabels[t.status]}]</div>
              </div>
            ))}
          </div>

          <div style={s.cfpFormats}>
            {c.cfp.formats.map((f, i) => (
              <div key={i} style={s.cfpFmt}>
                <div style={s.cfpFmtName}>{f.f}</div>
                <div style={s.cfpFmtLen}>{f.len}</div>
              </div>
            ))}
          </div>
          <button style={{ ...s.ctaPrimary, marginTop: 24 }}>{c.ctas.submit} →</button>
        </div>

        <div style={s.regPanel}>
          <div style={s.panelLabel}>// § 05 · {lang === "es" ? "INSCRIPCIÓN" : "REGISTRATION"}</div>
          <h3 style={s.splitTitleDark}>{c.registration.title}</h3>
          <p style={s.splitLeadDark}>{c.registration.lead}</p>

          <div style={s.regTable}>
            <div style={s.regHead}>
              <div>{lang === "es" ? "CATEGORÍA" : "CATEGORY"}</div>
              <div style={{ textAlign: "right" }}>{lang === "es" ? "PRECIO" : "PRICE"}</div>
            </div>
            {c.registration.tiers.map((t, i) => (
              <div key={i} style={{ ...s.regRow, ...(t.featured ? { background: "#f5f3ee" } : {}) }}>
                <div>
                  <div style={s.regName}>{t.name}{t.featured && <span style={s.regFeatured(primary)}> · {lang === "es" ? "recomendado" : "recommended"}</span>}</div>
                  <div style={s.regFeatures}>{t.features.join(" · ")}</div>
                </div>
                <div style={{ ...s.regPrice, color: t.featured ? primary : "#0a0a0a" }}>{t.price}</div>
              </div>
            ))}
          </div>
          <button style={{ ...s.ctaPrimary, marginTop: 24, width: "100%" }}>{c.ctas.register} →</button>
        </div>
      </section>

      {/* Organizers */}
      <section style={s.orgSec}>
        <div style={s.secHead}>
          <div style={s.secNum}>§ 06</div>
          <h2 style={s.secTitle}>{c.comite.title.toUpperCase()}</h2>
        </div>
        <div style={s.orgGrid}>
          {c.comite.universities.map((u, i) => (
            <div key={i} style={s.orgCell}>
              <div style={s.orgNum}>0{i + 1}</div>
              <div style={s.orgName}>{u}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerRow}>
          <div style={s.footerL}>
            <div style={s.logoWord}>CONGRESSA</div>
            <div style={s.footerTag}>
              {lang === "es"
                ? "Plataforma multitenant para congresos académicos · Fases 1–4"
                : "Multi-tenant platform for academic congresses · Phases 1–4"}
            </div>
          </div>
          <div style={s.footerR}>
            <div>{c.footer.contact}</div>
            <div style={s.footerCopy}>{c.footer.copy}</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const typeColorV3 = (t) => {
  const map = {
    Keynote: { color: "#92400e", border: "#fcd34d" },
    Plenary: { color: "#92400e", border: "#fcd34d" },
    Taller: { color: "#065f46", border: "#6ee7b7" },
    Workshop: { color: "#065f46", border: "#6ee7b7" },
    Simposio: { color: "#1e40af", border: "#93c5fd" },
    Symposium: { color: "#1e40af", border: "#93c5fd" },
    Panel: { color: "#9d174d", border: "#f9a8d4" },
    Pósters: { color: "#9a3412", border: "#fdba74" },
    Posters: { color: "#9a3412", border: "#fdba74" },
    Ponencias: { color: "#3730a3", border: "#c7d2fe" },
    Papers: { color: "#3730a3", border: "#c7d2fe" },
    Social: { color: "#991b1b", border: "#fca5a5" },
    Editorial: { color: "#334155", border: "#cbd5e1" },
    Institucional: { color: "#334155", border: "#cbd5e1" },
    Institutional: { color: "#334155", border: "#cbd5e1" },
  };
  return map[t] || { color: "#334155", border: "#cbd5e1" };
};

const v3Styles = (primary) => ({
  root: {
    fontFamily: "'Geist', -apple-system, sans-serif",
    background: "#f5f3ee",
    color: "#0f0f0f",
    width: "100%",
    minHeight: "100%",
    fontSize: 14,
    lineHeight: 1.5,
  },
  ticker: {
    background: "#0f0f0f", color: "#fff", overflow: "hidden",
    borderBottom: "1px solid #0f0f0f",
  },
  tickerInner: {
    display: "flex", gap: 40, padding: "8px 32px", fontSize: 12,
    fontFamily: "monospace", letterSpacing: 0.5, textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  tickerItem: { display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.75)" },
  tickerDot: { width: 6, height: 6, borderRadius: 999, background: "#10b981" },

  nav: {
    display: "flex", alignItems: "center", padding: "18px 32px",
    borderBottom: "2px solid #0f0f0f", background: "#f5f3ee",
    position: "sticky", top: 0, zIndex: 10,
  },
  navLeft: { display: "flex", alignItems: "center", gap: 12 },
  logoMark: {
    width: 32, height: 32, background: "#0f0f0f",
    clipPath: "polygon(0 0, 100% 0, 100% 60%, 60% 100%, 0 100%)",
  },
  logoWord: { fontSize: 14, fontWeight: 700, letterSpacing: 2, fontFamily: "monospace" },
  logoSub: { fontSize: 10, color: "#6b6760", fontFamily: "monospace", letterSpacing: 0.5 },
  navLinks: { display: "flex", gap: 22, margin: "0 auto" },
  navLink: {
    fontSize: 13, color: "#0f0f0f", textDecoration: "none",
    display: "flex", alignItems: "baseline", gap: 6,
  },
  navLinkNum: { fontSize: 10, color: "#9a958a", fontFamily: "monospace" },
  navRight: { display: "flex", alignItems: "center", gap: 16 },
  navTime: { fontSize: 12, color: "#6b6760", fontFamily: "monospace" },
  navCta: {
    background: "#0f0f0f", color: "#fff", border: "none", padding: "10px 16px",
    fontSize: 12, cursor: "pointer", fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase",
  },

  heroGrid: {
    display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 1,
    background: "#0f0f0f", borderBottom: "1px solid #0f0f0f",
  },
  heroTitle: {
    padding: "56px 48px 48px", background: "#f5f3ee",
    display: "flex", flexDirection: "column",
  },
  panelKicker: {
    fontSize: 11, letterSpacing: 1.5, color: "#6b6760",
    fontFamily: "monospace", display: "flex", gap: 10, marginBottom: 24,
  },
  heroH1: {
    fontSize: 68, lineHeight: 1.0, letterSpacing: -2, fontWeight: 600,
    margin: 0, textWrap: "balance",
  },
  heroTaglineV3: {
    fontSize: 18, color: primary, marginTop: 20,
    fontFamily: "monospace",
  },
  heroDesc: {
    marginTop: 24, fontSize: 16, color: "#3a3834", maxWidth: 620, textWrap: "pretty",
  },

  heroFooter: {
    marginTop: "auto", paddingTop: 40, display: "flex", justifyContent: "space-between",
    alignItems: "flex-end", gap: 24,
  },
  heroFooterL: { display: "flex", flexDirection: "column", gap: 10 },
  heroFootRow: { display: "flex", gap: 16, fontFamily: "monospace", fontSize: 13 },
  heroFootK: { width: 80, color: "#6b6760", textTransform: "uppercase", fontSize: 11, letterSpacing: 1 },
  heroFootV: { color: "#0f0f0f" },
  heroCtas: { display: "flex", gap: 8 },

  ctaPrimary: {
    background: "#0f0f0f", color: "#fff", border: "none",
    padding: "12px 20px", fontSize: 12, cursor: "pointer",
    fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase",
  },
  ctaSecondary: {
    background: "transparent", color: "#0f0f0f", border: "1px solid #0f0f0f",
    padding: "12px 20px", fontSize: 12, cursor: "pointer",
    fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase",
  },

  heroSidePanels: {
    background: "#0f0f0f", color: "#fff", padding: "32px",
    display: "flex", flexDirection: "column", gap: 20,
  },
  panel: {
    border: "1px solid rgba(255,255,255,0.12)", padding: "18px 20px",
  },
  panelLabel: {
    fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.55)",
    fontFamily: "monospace", marginBottom: 16,
  },
  countdown: { display: "flex", gap: 16 },
  countdownCell: { flex: 1, borderRight: "1px solid rgba(255,255,255,0.08)", paddingRight: 16 },
  countdownN: {
    fontSize: 42, fontWeight: 500, letterSpacing: -1.5, lineHeight: 1,
    fontFamily: "monospace", color: "#fff",
  },
  countdownL: {
    fontSize: 10, letterSpacing: 1, color: "rgba(255,255,255,0.6)",
    fontFamily: "monospace", textTransform: "uppercase", marginTop: 4,
  },

  cfpStatusRow: { display: "flex", alignItems: "flex-end", gap: 16 },
  cfpBigN: {
    fontSize: 48, fontWeight: 500, letterSpacing: -1.5, lineHeight: 1,
    fontFamily: "monospace", color: "#fff",
  },
  cfpBigL: { fontSize: 13, color: "#fff" },
  cfpSubL: { fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", marginTop: 2 },
  cfpBar: { height: 4, background: "rgba(255,255,255,0.1)", marginTop: 16, position: "relative" },
  cfpBarFill: { position: "absolute", top: 0, left: 0, bottom: 0 },
  cfpBreakdown: { marginTop: 14, display: "flex", flexDirection: "column", gap: 6 },
  cfpBreakRow: {
    display: "flex", alignItems: "center", gap: 10,
    fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.75)",
  },
  cfpBreakDot: (col) => ({
    width: 8, height: 8, borderRadius: 999, background: col,
  }),
  cfpBreakN: { marginLeft: "auto", color: "#fff" },

  milestone: {},
  milestoneDate: {
    fontSize: 32, fontFamily: "monospace", letterSpacing: 1,
    fontWeight: 500, color: "#fff",
  },
  milestoneLabel: { fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 },

  agendaSec: { padding: "64px 32px", borderBottom: "1px solid #d8d3c4" },
  secHead: {
    display: "flex", alignItems: "baseline", gap: 20, marginBottom: 32,
    paddingBottom: 20, borderBottom: "1px solid #0f0f0f",
  },
  secNum: { fontFamily: "monospace", fontSize: 13, color: "#6b6760" },
  secTitle: {
    fontSize: 32, fontWeight: 700, letterSpacing: -0.8, margin: 0,
  },
  secMeta: {
    marginLeft: "auto", display: "flex", gap: 10, fontFamily: "monospace",
    fontSize: 12, color: "#6b6760",
  },

  agendaTable: { background: "#fff", border: "1px solid #0f0f0f" },
  agendaTableHead: {
    display: "grid", gridTemplateColumns: "80px 1.8fr 1.2fr 140px 140px",
    gap: 20, padding: "12px 24px", background: "#0f0f0f", color: "rgba(255,255,255,0.75)",
    fontSize: 10, letterSpacing: 1.5, fontFamily: "monospace",
  },
  agendaDayRow: {
    display: "grid", gridTemplateColumns: "1fr auto auto", gap: 20,
    padding: "16px 24px", background: "#faf8f2",
    borderTop: "1px solid #d8d3c4", borderBottom: "1px solid #d8d3c4",
    alignItems: "baseline",
  },
  agendaDayDate: { fontSize: 15, fontWeight: 600 },
  agendaDayTheme: { fontSize: 13, color: primary, fontStyle: "italic" },
  agendaDayShort: { fontSize: 11, fontFamily: "monospace", color: "#6b6760", letterSpacing: 1 },

  agendaRow: {
    display: "grid", gridTemplateColumns: "80px 1.8fr 1.2fr 140px 140px",
    gap: 20, padding: "14px 24px", borderBottom: "1px dashed #e9e3d2",
    alignItems: "center",
  },
  agendaT: { fontFamily: "monospace", fontSize: 13, color: primary },
  agendaTitle: { fontSize: 14, color: "#0f0f0f" },
  agendaSpeaker: { fontSize: 13, color: "#6b6760", fontStyle: "italic" },
  typeBadge: {
    padding: "3px 8px", fontSize: 10, fontFamily: "monospace",
    letterSpacing: 0.5, textTransform: "uppercase",
    border: "1px solid", borderRadius: 2,
  },
  agendaRoom: { fontSize: 12, fontFamily: "monospace", color: "#6b6760" },

  axesSec: { padding: "64px 32px", borderBottom: "1px solid #d8d3c4" },
  axesRows: { display: "flex", flexDirection: "column" },
  axRow: {
    display: "grid",
    gridTemplateColumns: "60px 1fr 2fr 140px 80px",
    gap: 32, padding: "24px 8px",
    alignItems: "center", borderBottom: "1px solid #d8d3c4",
  },
  axRowNum: {
    fontFamily: "monospace", fontSize: 32, fontWeight: 500,
    color: primary, lineHeight: 1,
  },
  axRowTitle: { fontSize: 20, fontWeight: 500, letterSpacing: -0.3 },
  axRowDesc: { fontSize: 14, color: "#3a3834" },
  axRowStats: {
    fontFamily: "monospace", fontSize: 12, color: "#6b6760", textAlign: "right",
  },
  axRowCta: {
    fontFamily: "monospace", fontSize: 12, color: primary,
    textTransform: "uppercase", letterSpacing: 1, textAlign: "right",
  },

  speakersSec: { padding: "64px 32px", borderBottom: "1px solid #d8d3c4" },
  spGrid: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 1, background: "#d8d3c4" },
  spCard: {
    background: "#f5f3ee", padding: "20px", display: "flex", flexDirection: "column", gap: 6,
  },
  spHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  spAvatar: {
    width: 56, height: 56, background: "#0f0f0f", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, fontWeight: 600, fontFamily: "monospace",
  },
  spIndex: { fontFamily: "monospace", fontSize: 11, color: "#6b6760" },
  spName: { fontSize: 15, fontWeight: 600, letterSpacing: -0.3, lineHeight: 1.2 },
  spRole: { fontSize: 12, color: "#6b6760" },
  spTopic: {
    fontSize: 10, color: primary, fontFamily: "monospace",
    letterSpacing: 1, textTransform: "uppercase", marginTop: 6,
  },

  splitSec: {
    display: "grid", gridTemplateColumns: "1.1fr 1fr",
    borderBottom: "1px solid #d8d3c4",
  },
  cfpPanel: {
    padding: "64px 48px", background: "#0f0f0f", color: "#fff",
  },
  regPanel: {
    padding: "64px 48px", background: "#faf8f2",
  },
  splitTitle: {
    fontSize: 40, fontWeight: 600, letterSpacing: -1, margin: "16px 0 12px",
  },
  splitTitleDark: {
    fontSize: 40, fontWeight: 600, letterSpacing: -1, margin: "16px 0 12px", color: "#0f0f0f",
  },
  splitLead: { fontSize: 15, color: "rgba(255,255,255,0.7)", maxWidth: 500 },
  splitLeadDark: { fontSize: 15, color: "#3a3834", maxWidth: 500 },
  cfpTLv3: {
    marginTop: 28, display: "flex", flexDirection: "column",
  },
  cfpTLrow: {
    display: "grid", gridTemplateColumns: "16px 120px 1fr auto",
    gap: 16, padding: "14px 0", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "monospace", fontSize: 13,
  },
  cfpTLdot: {
    width: 10, height: 10, borderRadius: 999,
    border: "2px solid rgba(255,255,255,0.4)",
  },
  cfpTLdate: { color: "rgba(255,255,255,0.7)" },
  cfpTLlabel: { color: "#fff" },
  cfpTLstatus: { color: "rgba(255,255,255,0.5)", fontSize: 11 },

  cfpFormats: {
    marginTop: 28, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
    background: "rgba(255,255,255,0.12)",
  },
  cfpFmt: {
    background: "#0f0f0f", padding: "14px 16px",
  },
  cfpFmtName: { fontSize: 14, color: "#fff", fontWeight: 500 },
  cfpFmtLen: { fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.55)", marginTop: 4 },

  regTable: { marginTop: 28, border: "1px solid #0f0f0f" },
  regHead: {
    display: "grid", gridTemplateColumns: "1fr auto",
    padding: "12px 20px", background: "#0f0f0f", color: "#fff",
    fontSize: 11, fontFamily: "monospace", letterSpacing: 1,
  },
  regRow: {
    display: "grid", gridTemplateColumns: "1fr auto", gap: 20,
    padding: "18px 20px", borderBottom: "1px dashed #d8d3c4",
    alignItems: "center",
  },
  regName: { fontSize: 16, fontWeight: 500 },
  regFeatured: (p) => ({
    fontSize: 11, color: p, fontFamily: "monospace",
    letterSpacing: 0.5, fontWeight: 400,
  }),
  regFeatures: { fontSize: 12, color: "#6b6760", marginTop: 4 },
  regPrice: {
    fontSize: 24, fontWeight: 600, fontFamily: "monospace", letterSpacing: -0.5,
  },

  orgSec: { padding: "64px 32px", borderBottom: "1px solid #d8d3c4" },
  orgGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
    background: "#d8d3c4", border: "1px solid #d8d3c4",
  },
  orgCell: {
    background: "#f5f3ee", padding: "24px 28px",
    display: "flex", alignItems: "baseline", gap: 20,
  },
  orgNum: { fontFamily: "monospace", fontSize: 13, color: "#6b6760" },
  orgName: { fontSize: 16, fontWeight: 500 },

  footer: {
    padding: "40px 32px", background: "#0f0f0f", color: "#fff",
  },
  footerRow: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
  },
  footerL: {},
  footerTag: { fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 6, maxWidth: 400 },
  footerR: { textAlign: "right", fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.7)" },
  footerCopy: { fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 },
});

window.V3 = V3;
