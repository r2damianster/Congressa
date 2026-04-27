// Variante 2 — SaaS moderno monocromo
// Neutro cálido, acento único (el primary), tarjetas con sombras sutiles,
// tipografía sans limpia, muy Linear/Vercel/Stripe.

const V2 = ({ lang = "es", primary = "#1e3a8a" }) => {
  const c = window.CONTENT[lang];
  const s = v2Styles(primary);

  return (
    <div style={s.root}>
      {/* Top nav */}
      <header style={s.nav}>
        <div style={s.logoWrap}>
          <div style={s.logoDot} />
          <div style={s.logoWord}>Congressa</div>
          <div style={s.logoDivider}>/</div>
          <div style={s.logoEvent}>cipp-2026</div>
        </div>
        <nav style={s.navLinks}>
          {Object.values(c.nav).map((n, i) => (
            <a key={i} style={s.navLink} href="#">{n}</a>
          ))}
        </nav>
        <div style={s.navRight}>
          <a style={s.navGhost} href="#">{lang === "es" ? "Iniciar sesión" : "Sign in"}</a>
          <button style={s.navCta}>{c.ctas.register}</button>
        </div>
      </header>

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroLeft}>
          <div style={s.badge}>
            <span style={s.badgeDot} />
            {lang === "es" ? "Envíos abiertos · cierran 15 Jun" : "Submissions open · close Jun 15"}
          </div>
          <h1 style={s.heroTitle}>{c.eventFull}</h1>
          <p style={s.heroLead}>{c.heroLead}</p>

          <div style={s.heroMeta}>
            <div style={s.metaItem}>
              <div style={s.metaLabel}>{lang === "es" ? "Fechas" : "Dates"}</div>
              <div style={s.metaValue}>{c.dates}</div>
            </div>
            <div style={s.metaItem}>
              <div style={s.metaLabel}>{lang === "es" ? "Sede" : "Venue"}</div>
              <div style={s.metaValue}>{c.location}</div>
            </div>
            <div style={s.metaItem}>
              <div style={s.metaLabel}>{lang === "es" ? "Formato" : "Format"}</div>
              <div style={s.metaValue}>{c.hybrid}</div>
            </div>
          </div>

          <div style={s.ctaRow}>
            <button style={s.ctaPrimary}>{c.ctas.register} →</button>
            <button style={s.ctaSecondary}>{c.ctas.submit}</button>
          </div>

          <div style={s.partners}>
            <div style={s.partnersLabel}>{lang === "es" ? "Organizan" : "Hosted by"}</div>
            <div style={s.partnersRow}>
              {c.comite.universities.slice(0, 4).map((u, i) => (
                <div key={i} style={s.partnerChip}>{u}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={s.heroRight}>
          <div style={s.productCard}>
            <div style={s.productCardHead}>
              <div style={s.productCardDots}>
                <span style={{ ...s.pcDot, background: "#f87171" }} />
                <span style={{ ...s.pcDot, background: "#fbbf24" }} />
                <span style={{ ...s.pcDot, background: "#34d399" }} />
              </div>
              <div style={s.productCardTitle}>congressa.io/cipp-2026</div>
            </div>
            <div style={s.productCardBody}>
              <div style={s.pcSectionLabel}>{lang === "es" ? "Tu envío" : "Your submission"}</div>
              <div style={s.pcPaper}>
                <div style={s.pcPaperTop}>
                  <div style={s.pcPaperTitle}>
                    {lang === "es"
                      ? "Práctica recuperativa en aulas de secundaria"
                      : "Retrieval practice in secondary classrooms"}
                  </div>
                  <div style={s.pcBadge}>
                    <span style={s.pcBadgeDot} />
                    {lang === "es" ? "En revisión" : "Under review"}
                  </div>
                </div>
                <div style={s.pcPaperMeta}>
                  {lang === "es" ? "Eje 01 · Neuroeducación" : "Track 01 · Neuroeducation"} · DOCX · 5,420 {lang === "es" ? "palabras" : "words"}
                </div>
                <div style={s.pcProgress}>
                  <div style={s.pcProgressSteps}>
                    <div style={{ ...s.pcStep, ...s.pcStepDone }}>
                      <div style={s.pcStepCircle}>✓</div>
                      <div style={s.pcStepLabel}>{lang === "es" ? "Enviado" : "Submitted"}</div>
                    </div>
                    <div style={s.pcStepLine} />
                    <div style={{ ...s.pcStep, ...s.pcStepActive }}>
                      <div style={{ ...s.pcStepCircle, background: primary, color: "#fff", borderColor: primary }}>2</div>
                      <div style={s.pcStepLabel}>{lang === "es" ? "Revisión" : "Review"}</div>
                    </div>
                    <div style={{ ...s.pcStepLine, opacity: 0.3 }} />
                    <div style={s.pcStep}>
                      <div style={{ ...s.pcStepCircle, opacity: 0.4 }}>3</div>
                      <div style={{ ...s.pcStepLabel, opacity: 0.4 }}>{lang === "es" ? "Decisión" : "Decision"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={s.pcSectionLabel}>{lang === "es" ? "Reseñas recibidas" : "Reviews received"}</div>
              <div style={s.pcReviews}>
                {[
                  { r: "R-1", s: lang === "es" ? "Aceptar con cambios menores" : "Accept with minor changes", score: 4.2, color: "#10b981" },
                  { r: "R-2", s: lang === "es" ? "Revisar y reenviar" : "Revise and resubmit", score: 3.1, color: "#f59e0b" },
                  { r: "R-3", s: lang === "es" ? "Pendiente" : "Pending", score: null, color: "#9ca3af" },
                ].map((rv, i) => (
                  <div key={i} style={s.pcReview}>
                    <div style={s.pcReviewId}>{rv.r}</div>
                    <div style={s.pcReviewText}>{rv.s}</div>
                    <div style={{ ...s.pcReviewScore, color: rv.color }}>
                      {rv.score ? rv.score.toFixed(1) : "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section style={s.stripSection}>
        <div style={s.stripGrid}>
          {c.stats.map((st, i) => (
            <div key={i} style={s.stripCell}>
              <div style={s.stripN}>{st.n}</div>
              <div style={s.stripL}>{st.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Axes */}
      <section style={s.section}>
        <div style={s.sectionHead}>
          <div style={s.eyebrow}>01 · {lang === "es" ? "Investigación" : "Research"}</div>
          <h2 style={s.sectionTitle}>{c.axes.title}</h2>
          <p style={s.sectionLead}>{c.axes.lead}</p>
        </div>
        <div style={s.axesGrid}>
          {c.axes.items.map((a, i) => (
            <article key={i} style={s.axCard}>
              <div style={s.axNum}>{a.id}</div>
              <h3 style={s.axTitle}>{a.title}</h3>
              <p style={s.axDesc}>{a.desc}</p>
              <div style={s.axLink}>{lang === "es" ? "Ver ponencias" : "See papers"} →</div>
            </article>
          ))}
        </div>
      </section>

      {/* Agenda with tabs */}
      <section style={s.sectionDark} id="programa">
        <div style={s.sectionHead}>
          <div style={{ ...s.eyebrow, color: "rgba(255,255,255,0.55)" }}>02 · {lang === "es" ? "Agenda" : "Schedule"}</div>
          <h2 style={{ ...s.sectionTitle, color: "#fff" }}>{c.agenda.title}</h2>
          <p style={{ ...s.sectionLead, color: "rgba(255,255,255,0.6)" }}>{c.agenda.lead}</p>
        </div>
        <AgendaPanel content={c} primary={primary} />
      </section>

      {/* Speakers */}
      <section style={s.section}>
        <div style={s.sectionHead}>
          <div style={s.eyebrow}>03 · {lang === "es" ? "Invitados" : "Guests"}</div>
          <h2 style={s.sectionTitle}>{c.speakers.title}</h2>
          <p style={s.sectionLead}>{c.speakers.lead}</p>
        </div>
        <div style={s.speakersGrid}>
          {c.speakers.items.map((sp, i) => (
            <div key={i} style={s.speakerCard}>
              <div style={{ ...s.speakerAvatar, background: speakerColor(i) }}>
                {sp.name.split(" ").filter(x => !x.endsWith(".")).map(x => x[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div style={s.speakerName}>{sp.name}</div>
                <div style={s.speakerRole}>{sp.role}</div>
                <div style={s.speakerTopicV2}>{sp.topic}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={s.section}>
        <div style={s.sectionHead}>
          <div style={s.eyebrow}>04 · {lang === "es" ? "Inscripción" : "Registration"}</div>
          <h2 style={s.sectionTitle}>{c.registration.title}</h2>
          <p style={s.sectionLead}>{c.registration.lead}</p>
        </div>
        <div style={s.tiersGrid}>
          {c.registration.tiers.map((t, i) => (
            <div key={i} style={{ ...s.tier, ...(t.featured ? s.tierFeatured(primary) : {}) }}>
              {t.featured && <div style={s.tierBadge}>{lang === "es" ? "Recomendado" : "Recommended"}</div>}
              <div style={s.tierName}>{t.name}</div>
              <div style={{ ...s.tierPrice, color: t.featured ? primary : "#0a0a0a" }}>{t.price}</div>
              <div style={s.tierFeatures}>
                {t.features.map((f, j) => (
                  <div key={j} style={s.tierFeature}>
                    <span style={{ ...s.tierCheck, color: t.featured ? primary : "#0a0a0a" }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button style={{
                ...s.tierCta,
                background: t.featured ? primary : "#0a0a0a",
              }}>{c.ctas.register}</button>
            </div>
          ))}
        </div>
      </section>

      {/* CFP banner */}
      <section style={s.cfpBanner(primary)}>
        <div style={s.cfpBannerLeft}>
          <div style={{ ...s.eyebrow, color: "rgba(255,255,255,0.6)" }}>05 · Call for Papers</div>
          <h2 style={{ ...s.sectionTitle, color: "#fff", maxWidth: 560 }}>{c.cfp.title}</h2>
          <p style={{ ...s.sectionLead, color: "rgba(255,255,255,0.7)", maxWidth: 520 }}>{c.cfp.lead}</p>
          <div style={s.cfpBannerCtas}>
            <button style={s.cfpBannerPrimary(primary)}>{c.ctas.submit} →</button>
            <button style={s.cfpBannerSecondary}>{lang === "es" ? "Ver normas" : "See guidelines"}</button>
          </div>
        </div>
        <div style={s.cfpBannerRight}>
          {c.cfp.timeline.map((t, i) => (
            <div key={i} style={{
              ...s.cfpRow,
              opacity: t.status === "future" ? 0.5 : 1,
            }}>
              <div style={{
                ...s.cfpStatus,
                background: t.status === "done" ? "#fff" :
                            t.status === "open" ? "#fff" :
                            "transparent",
                border: t.status === "open" ? "none" :
                        t.status === "soon" ? "1px solid rgba(255,255,255,0.6)" :
                        "1px solid rgba(255,255,255,0.3)",
              }} />
              <div style={s.cfpLabel}>{t.label}</div>
              <div style={s.cfpDate}>{t.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerMain}>
          <div style={s.footerBrand}>
            <div style={{ ...s.logoWrap, marginBottom: 12 }}>
              <div style={s.logoDot} />
              <div style={s.logoWord}>Congressa</div>
            </div>
            <div style={s.footerTag}>
              {lang === "es"
                ? "Plataforma multitenant para congresos académicos. Fase 1–4."
                : "Multi-tenant platform for academic congresses. Phases 1–4."}
            </div>
          </div>
          <div style={s.footerCols}>
            {[
              [lang === "es" ? "Evento" : "Event", ["Programa", "Ponentes", "Sede"]],
              [lang === "es" ? "Participar" : "Participate", ["Inscripción", "Call for Papers", "Normas"]],
              [lang === "es" ? "Organización" : "Organization", ["Comité", "Patrocinadores", "Prensa"]],
            ].map((col, i) => (
              <div key={i} style={s.footerCol}>
                <div style={s.footerColHead}>{col[0]}</div>
                {col[1].map((li, j) => (
                  <a key={j} style={s.footerLi} href="#">{li}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={s.footerBottom}>
          <div>{c.footer.copy}</div>
          <div>{c.footer.contact}</div>
        </div>
      </footer>
    </div>
  );
};

const AgendaPanel = ({ content, primary }) => {
  const [day, setDay] = React.useState(0);
  const s = v2Styles(primary);
  const d = content.agenda.days[day];

  return (
    <div style={s.agendaWrap}>
      <div style={s.agendaTabs}>
        {content.agenda.days.map((dd, i) => (
          <button
            key={i}
            onClick={() => setDay(i)}
            style={{
              ...s.agendaTab,
              ...(day === i ? s.agendaTabActive(primary) : {}),
            }}
          >
            <div style={s.agendaTabShort}>{dd.short}</div>
            <div style={s.agendaTabLabel}>{dd.label}</div>
            <div style={s.agendaTabTheme}>{dd.theme}</div>
          </button>
        ))}
      </div>
      <div style={s.agendaList}>
        {d.sessions.map((ss, i) => (
          <div key={i} style={s.agendaRow}>
            <div style={s.agendaTime}>{ss.t}</div>
            <div style={s.agendaMain}>
              <div style={s.agendaTitle}>{ss.title}</div>
              {ss.speaker && <div style={s.agendaSpeaker}>{ss.speaker}</div>}
            </div>
            <div style={s.agendaRoom}>{ss.room}</div>
            <div style={{ ...s.agendaType, background: typeColor(ss.type) }}>{ss.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const typeColor = (t) => {
  const map = {
    Keynote: "rgba(250,204,21,0.15)",
    Plenary: "rgba(250,204,21,0.15)",
    Taller: "rgba(52,211,153,0.15)",
    Workshop: "rgba(52,211,153,0.15)",
    Simposio: "rgba(147,197,253,0.15)",
    Symposium: "rgba(147,197,253,0.15)",
    Panel: "rgba(244,114,182,0.15)",
    Pósters: "rgba(251,146,60,0.15)",
    Posters: "rgba(251,146,60,0.15)",
    Ponencias: "rgba(199,210,254,0.15)",
    Papers: "rgba(199,210,254,0.15)",
    Social: "rgba(248,113,113,0.15)",
    Editorial: "rgba(203,213,225,0.2)",
    Institucional: "rgba(203,213,225,0.2)",
    Institutional: "rgba(203,213,225,0.2)",
  };
  return map[t] || "rgba(255,255,255,0.1)";
};

const speakerColor = (i) => {
  const palette = ["#e0e7ff", "#fef3c7", "#dcfce7", "#fce7f3", "#e0f2fe", "#fed7aa"];
  return palette[i % palette.length];
};

const v2Styles = (primary) => ({
  root: {
    fontFamily: "'Geist', -apple-system, sans-serif",
    background: "#fafaf9",
    color: "#0a0a0a",
    width: "100%",
    minHeight: "100%",
    fontSize: 15,
    lineHeight: 1.5,
  },
  nav: {
    display: "flex", alignItems: "center", padding: "18px 48px",
    borderBottom: "1px solid #eceae6",
    background: "rgba(250,250,249,0.92)", backdropFilter: "blur(10px)",
    position: "sticky", top: 0, zIndex: 10,
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 10 },
  logoDot: {
    width: 22, height: 22, borderRadius: 5,
    background: `conic-gradient(from 120deg, ${primary}, #0a0a0a)`,
  },
  logoWord: { fontSize: 16, fontWeight: 600, letterSpacing: -0.3 },
  logoDivider: { color: "#cac7c1", fontSize: 16 },
  logoEvent: { fontSize: 14, color: "#6b6760", fontFamily: "monospace" },
  navLinks: { display: "flex", gap: 24, margin: "0 auto" },
  navLink: { color: "#3c3834", fontSize: 14, textDecoration: "none" },
  navRight: { display: "flex", alignItems: "center", gap: 12 },
  navGhost: { fontSize: 14, color: "#3c3834", textDecoration: "none" },
  navCta: {
    background: "#0a0a0a", color: "#fff", border: "none", padding: "10px 18px",
    borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
  },

  hero: {
    display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64,
    padding: "72px 48px 96px", maxWidth: 1360, margin: "0 auto", alignItems: "center",
  },
  heroLeft: {},
  badge: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "6px 14px 6px 10px", background: "#fff", border: "1px solid #eceae6",
    borderRadius: 999, fontSize: 13, color: "#3c3834",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  badgeDot: { width: 8, height: 8, borderRadius: 999, background: "#10b981" },
  heroTitle: {
    fontSize: 64, lineHeight: 1.02, letterSpacing: -1.8,
    margin: "24px 0 0", fontWeight: 500, maxWidth: 720, textWrap: "balance",
  },
  heroLead: { marginTop: 24, maxWidth: 540, fontSize: 17, color: "#52504c", textWrap: "pretty" },
  heroMeta: { display: "flex", gap: 40, marginTop: 36 },
  metaItem: {},
  metaLabel: {
    fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#8f8b84",
  },
  metaValue: { fontSize: 15, marginTop: 4, color: "#0a0a0a", fontWeight: 500 },

  ctaRow: { display: "flex", gap: 10, marginTop: 36 },
  ctaPrimary: {
    background: primary, color: "#fff", border: "none", padding: "13px 22px",
    borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
  },
  ctaSecondary: {
    background: "#fff", color: "#0a0a0a", border: "1px solid #d9d6d0",
    padding: "13px 22px", borderRadius: 8, fontSize: 14, cursor: "pointer",
    fontFamily: "inherit", fontWeight: 500,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },

  partners: { marginTop: 64 },
  partnersLabel: {
    fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#8f8b84", marginBottom: 12,
  },
  partnersRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  partnerChip: {
    padding: "6px 12px", background: "#fff", border: "1px solid #eceae6",
    borderRadius: 6, fontSize: 12, color: "#3c3834",
  },

  heroRight: {},
  productCard: {
    background: "#fff", border: "1px solid #e5e2dc", borderRadius: 14,
    overflow: "hidden", boxShadow: "0 20px 60px -20px rgba(10,10,10,0.18), 0 2px 6px rgba(10,10,10,0.06)",
  },
  productCardHead: {
    display: "flex", alignItems: "center", padding: "12px 16px",
    borderBottom: "1px solid #eceae6", background: "#fafaf9",
  },
  productCardDots: { display: "flex", gap: 6 },
  pcDot: { width: 10, height: 10, borderRadius: 999 },
  productCardTitle: {
    margin: "0 auto 0 24px", fontSize: 12, color: "#8f8b84", fontFamily: "monospace",
  },
  productCardBody: { padding: "24px 24px 28px" },
  pcSectionLabel: {
    fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#8f8b84",
    marginTop: 20, marginBottom: 10,
  },
  pcPaper: {
    border: "1px solid #eceae6", borderRadius: 10, padding: "16px 16px 18px", background: "#fafaf9",
  },
  pcPaperTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
  pcPaperTitle: { fontSize: 15, fontWeight: 500, flex: 1, lineHeight: 1.35 },
  pcBadge: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 10px", background: "#fff7ed", color: "#9a3412",
    borderRadius: 999, fontSize: 11, fontWeight: 500, flexShrink: 0,
  },
  pcBadgeDot: { width: 6, height: 6, borderRadius: 999, background: "#f97316" },
  pcPaperMeta: { fontSize: 12, color: "#8f8b84", marginTop: 6 },
  pcProgress: { marginTop: 16 },
  pcProgressSteps: { display: "flex", alignItems: "center", gap: 8 },
  pcStep: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 },
  pcStepDone: {},
  pcStepActive: {},
  pcStepCircle: {
    width: 24, height: 24, borderRadius: 999, background: "#fff",
    border: "1px solid #d9d6d0", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 600,
  },
  pcStepLabel: { fontSize: 10, color: "#52504c" },
  pcStepLine: { flex: 1, height: 1, background: "#d9d6d0" },

  pcReviews: { display: "flex", flexDirection: "column", gap: 8 },
  pcReview: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 14px", border: "1px solid #eceae6", borderRadius: 8, background: "#fff",
  },
  pcReviewId: { fontSize: 12, fontFamily: "monospace", color: "#8f8b84", width: 32 },
  pcReviewText: { fontSize: 13, flex: 1 },
  pcReviewScore: { fontSize: 13, fontWeight: 600, fontFamily: "monospace" },

  stripSection: {
    borderTop: "1px solid #eceae6", borderBottom: "1px solid #eceae6",
    background: "#fff",
  },
  stripGrid: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
    maxWidth: 1360, margin: "0 auto",
  },
  stripCell: { padding: "32px 48px", borderLeft: "1px solid #eceae6" },
  stripN: { fontSize: 36, fontWeight: 500, letterSpacing: -1 },
  stripL: { fontSize: 13, color: "#8f8b84", marginTop: 4 },

  section: { padding: "96px 48px", maxWidth: 1360, margin: "0 auto" },
  sectionDark: {
    padding: "96px 48px", background: "#0a0a0a", color: "#fff",
  },
  sectionHead: { marginBottom: 48, maxWidth: 760 },
  eyebrow: {
    fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase",
    color: "#8f8b84", marginBottom: 16, fontFamily: "monospace",
  },
  sectionTitle: {
    fontSize: 44, lineHeight: 1.05, letterSpacing: -1.2,
    margin: 0, fontWeight: 500, textWrap: "balance",
  },
  sectionLead: { marginTop: 14, color: "#52504c", fontSize: 17 },

  axesGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 },
  axCard: {
    padding: "28px 28px 24px", background: "#fff", border: "1px solid #eceae6",
    borderRadius: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
  },
  axNum: { fontSize: 12, color: primary, fontFamily: "monospace", letterSpacing: 1.5, marginBottom: 16 },
  axTitle: { fontSize: 22, margin: "0 0 8px", fontWeight: 500, letterSpacing: -0.4 },
  axDesc: { color: "#52504c", fontSize: 14.5, lineHeight: 1.55, margin: 0 },
  axLink: { marginTop: 20, fontSize: 13, color: primary, fontWeight: 500 },

  agendaWrap: {
    maxWidth: 1264, margin: "0 auto", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden",
  },
  agendaTabs: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  agendaTab: {
    background: "transparent", border: "none", borderRight: "1px solid rgba(255,255,255,0.1)",
    padding: "20px 24px", textAlign: "left", cursor: "pointer", color: "rgba(255,255,255,0.55)",
    fontFamily: "inherit", transition: "all 0.15s",
  },
  agendaTabActive: (p) => ({
    background: "rgba(255,255,255,0.05)", color: "#fff",
    borderBottom: `2px solid ${p}`,
  }),
  agendaTabShort: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "inherit", opacity: 0.7 },
  agendaTabLabel: { fontSize: 18, marginTop: 4, fontWeight: 500, color: "inherit" },
  agendaTabTheme: { fontSize: 13, marginTop: 2, color: "inherit", opacity: 0.6 },

  agendaList: { padding: "8px 0" },
  agendaRow: {
    display: "grid", gridTemplateColumns: "80px 1fr 180px 140px", gap: 24,
    alignItems: "center", padding: "18px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  agendaTime: { fontSize: 14, color: "#fff", fontFamily: "monospace" },
  agendaMain: {},
  agendaTitle: { fontSize: 15, color: "#fff", fontWeight: 500 },
  agendaSpeaker: { fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 2 },
  agendaRoom: { fontSize: 13, color: "rgba(255,255,255,0.55)" },
  agendaType: {
    justifySelf: "start",
    padding: "4px 10px", fontSize: 11, color: "#fff",
    borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)",
  },

  speakersGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
  speakerCard: {
    display: "flex", gap: 16, padding: "20px", background: "#fff",
    border: "1px solid #eceae6", borderRadius: 12,
    alignItems: "center",
  },
  speakerAvatar: {
    width: 56, height: 56, borderRadius: 999, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 15, fontWeight: 600, color: "#1a1a1a",
  },
  speakerName: { fontSize: 15, fontWeight: 600 },
  speakerRole: { fontSize: 13, color: "#52504c", marginTop: 1 },
  speakerTopicV2: {
    fontSize: 11, color: primary, marginTop: 6,
    fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1,
  },

  tiersGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  tier: {
    padding: "32px 28px", background: "#fff", border: "1px solid #eceae6",
    borderRadius: 14, position: "relative", display: "flex", flexDirection: "column",
  },
  tierFeatured: (p) => ({
    border: `2px solid ${p}`, boxShadow: `0 20px 50px -20px ${p}40`,
  }),
  tierBadge: {
    position: "absolute", top: -11, right: 20,
    padding: "4px 12px", background: primary, color: "#fff",
    borderRadius: 999, fontSize: 11, fontWeight: 500, letterSpacing: 0.3,
  },
  tierName: { fontSize: 14, color: "#52504c", letterSpacing: 0.2 },
  tierPrice: { fontSize: 48, fontWeight: 500, letterSpacing: -1.5, marginTop: 8 },
  tierFeatures: { margin: "24px 0 28px", display: "flex", flexDirection: "column", gap: 10, flex: 1 },
  tierFeature: { fontSize: 14, color: "#3c3834", display: "flex", gap: 10, alignItems: "flex-start" },
  tierCheck: { fontSize: 14 },
  tierCta: {
    color: "#fff", border: "none", padding: "13px 22px",
    borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
  },

  cfpBanner: (p) => ({
    margin: "0 48px 48px", background: p, color: "#fff", borderRadius: 16,
    padding: "64px 56px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64,
    maxWidth: 1264, marginLeft: "auto", marginRight: "auto",
  }),
  cfpBannerLeft: {},
  cfpBannerCtas: { display: "flex", gap: 10, marginTop: 32 },
  cfpBannerPrimary: (p) => ({
    background: "#fff", color: p, border: "none", padding: "13px 22px",
    borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
  }),
  cfpBannerSecondary: {
    background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)",
    padding: "13px 22px", borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
  },
  cfpBannerRight: {
    display: "flex", flexDirection: "column", gap: 2,
    background: "rgba(255,255,255,0.08)", padding: "20px 24px", borderRadius: 12,
    alignSelf: "center",
  },
  cfpRow: { display: "flex", alignItems: "center", gap: 14, padding: "12px 0" },
  cfpStatus: { width: 10, height: 10, borderRadius: 999, flexShrink: 0 },
  cfpLabel: { flex: 1, fontSize: 14, color: "#fff" },
  cfpDate: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" },

  footer: { padding: "56px 48px 40px", borderTop: "1px solid #eceae6", maxWidth: 1360, margin: "0 auto" },
  footerMain: { display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: 64, marginBottom: 48 },
  footerBrand: {},
  footerTag: { fontSize: 13, color: "#8f8b84", maxWidth: 260, lineHeight: 1.5 },
  footerCols: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 },
  footerCol: { display: "flex", flexDirection: "column", gap: 8 },
  footerColHead: { fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#8f8b84", marginBottom: 4 },
  footerLi: { fontSize: 14, color: "#3c3834", textDecoration: "none" },
  footerBottom: {
    display: "flex", justifyContent: "space-between", paddingTop: 24,
    borderTop: "1px solid #eceae6", fontSize: 12, color: "#8f8b84",
  },
});

window.V2 = V2;
