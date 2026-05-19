// V1 EHU — Editorial académico, actualizado al congreso real INEDUS 2026
// EHU + ULEAM + Colombia + Chile · Educación, innovación, inclusión y sostenibilidad

const V1_EHU = ({ primary = "#1e3a8a" }) => {
  const [lang, setLang] = React.useState('es');
  const c = window.CONTENT_EHU[lang];
  const s = v1ehuStyles(primary);

  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let autoScrollInterval;
    const startScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (window.innerWidth <= 768) {
           el.scrollBy({ left: 1, behavior: 'auto' });
           if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) el.scrollLeft = 0;
        }
      }, 100);
    };
    startScroll();
    el.addEventListener('touchstart', () => clearInterval(autoScrollInterval), { passive: true });
    el.addEventListener('touchend', () => { setTimeout(startScroll, 2000); }, { passive: true });
    return () => clearInterval(autoScrollInterval);
  }, []);

  return (
    <div style={s.root}>
      <style>{`
        @media (max-width: 768px) {
          
          .scroll-row {
            display: flex !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            margin-right: -16px;
            padding-right: 16px;
            padding-bottom: 24px;
            gap: 16px !important;
            /* Hide scrollbar */
            scrollbar-width: none;
          }
          .scroll-row::-webkit-scrollbar { display: none; }
          .scroll-row > * {
            flex: 0 0 85% !important;
            scroll-snap-align: center;
          }

          .nav-links, .lang-pill, .venue-divider { display: none !important; }
          .hero-venues, .cfp-grid, .footer-row { flex-direction: column !important; }
          .nav-right { margin-left: auto; }
          .hero-meta, .cta-row { justify-content: center; text-align: center; }
          .footer-row { text-align: center; align-items: center !important; gap: 24px; }
          .footer-right { text-align: center !important; }
          .section-head { flex-direction: column; gap: 16px !important; }
          .section-number { border-right: none !important; border-bottom: 1px solid #d8cfb8; padding-right: 0 !important; padding-bottom: 12px; width: 100%; }
          .oct-deadline { flex-direction: column; gap: 8px; align-items: flex-start !important; }
          .oct-deadline-v { text-align: left !important; }
          .hero-venues { text-align: center; }
          .hero-venues .venue { width: 100%; }

          .dest-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
          }
          .dest-card {
            padding: 8px 14px !important;
          }
          .dest-num {
            font-size: 16px !important;
          }

          .format-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
          }
          .format-grid > * {
            padding: 14px 16px !important;
          }

          .objs-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .objs-grid > * {
            min-height: auto !important;
            padding: 14px 12px !important;
          }

          .com-all-cols {
            columns: 1 !important;
          }

        }
      `}</style>
      {/* Top nav */}
      <header style={s.nav}>
        <div style={s.logoWrap}>
          <a href="https://www.uleam.edu.ec/" target="_blank" rel="noopener"><img src="./LOGO-ULEAM-VERTICAL.png" alt="ULEAM" style={s.uniLogo} /></a>
          <div style={s.logoDividerV} />
          <a href="https://www.ehu.eus/es/" target="_blank" rel="noopener"><img src="./miniatura_EHU_logotipo.png" alt="EHU" style={s.uniLogo} /></a>
        </div>
        <nav style={s.navLinks} className="nav-links">
          {Object.entries(c.nav).map(([k, v], i) => (
            <a key={i} style={s.navLink} href={`#${k}`}>{v}</a>
          ))}
        </nav>
        <div style={s.navRight}>
          <div style={s.langToggle} className="lang-pill">
            {['es', 'eu', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ ...s.langBtn, ...(lang === l ? { background: primary, color: '#fff' } : {}) }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="https://forms.gle/er4VkFhmJDhxDDuv6" target="_blank" rel="noopener" style={{ ...s.navCta, textDecoration: "none" }}>{c.ctas.submit} →</a>
        </div>
      </header>
      <div style={s.navSpacer} />

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroMeta} className="hero-meta">
          <span style={s.heroKicker}>{c.eventShort}</span>
          <span style={s.heroDot}>·</span>
          <span style={s.heroKicker}>{c.dates}</span>
          <span style={s.heroDot}>·</span>
          <span style={s.heroKicker}>{c.hybrid}</span>
        </div>

        <h1 style={s.heroTitle}>
          {c.heroTitleParts[0]} <em style={s.heroTitleEm}>{c.heroTitleParts[1]}</em> {c.heroTitleParts[2]}
        </h1>

        <div style={s.heroSubRow}>
          <div style={s.heroSubKicker}>— {c.subtitle}</div>
        </div>

        <p style={s.heroLead}>{c.heroLead}</p>

        <div style={s.heroTaglineRow}>
          <div style={s.heroRule} />
          <div style={s.heroTagline}>{c.tagline}</div>
        </div>

        <div style={s.ctaRow} className="cta-row">
          <a href="https://forms.gle/er4VkFhmJDhxDDuv6" target="_blank" rel="noopener" style={{ ...s.ctaPrimary, textDecoration: "none" }}>{c.ctas.submit}</a>
          <a style={s.ctaText} href="#propuestas">{c.ui.verBases}</a>
        </div>

        <div style={s.heroVenues} className="hero-venues">
          <div style={s.venue}>
            <a href="https://www.ehu.eus/es/" target="_blank" rel="noopener"><img src="./miniatura_EHU_logotipo.png" alt="EHU" style={s.venueLogo} /></a>
            <div style={s.venueLabel}>{c.venues.v1label}</div>
            <div style={s.venueName}>{c.venues.v1name}</div>
            <div style={s.venueDetail}>{c.venues.v1detail}</div>
          </div>
          <div style={s.venueDivider} className="venue-divider">↔</div>
          <div style={s.venue}>
            <a href="https://www.uleam.edu.ec/" target="_blank" rel="noopener"><img src="./LOGO-ULEAM-VERTICAL.png" alt="ULEAM" style={s.venueLogo} /></a>
            <div style={s.venueLabel}>{c.venues.v2label}</div>
            <div style={s.venueName}>{c.venues.v2name}</div>
            <div style={s.venueDetail}>{c.venues.v2detail}</div>
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

      {/* Presentación + objetivos */}
      <section style={s.section} id="presentacion">
        <div style={s.sectionHead} className="section-head">
          <div style={s.sectionNumber} className="section-number">I</div>
          <div>
            <h2 style={s.sectionTitle}>{c.presentacion.title}</h2>
            <p style={s.sectionLead}>{c.presentacion.lead}</p>
          </div>
        </div>
        <div style={s.objsGrid} className="objs-grid" ref={scrollRef}>
          {c.presentacion.objetivos.map((a, i) => (
            <article key={i} style={s.axCard}>
              <div style={s.axNum}>{a.id}</div>
              <h3 style={s.axTitle}>{a.title}</h3>
              <p style={s.axDesc}>{a.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Destinatarios */}
      <section style={{ ...s.section, background: "#faf7f1" }} id="destinatarios">
        <div style={s.sectionHead} className="section-head">
          <div style={s.sectionNumber} className="section-number">II</div>
          <div>
            <h2 style={s.sectionTitle}>{c.destinatarios.title}</h2>
            <p style={s.sectionLead}>{c.destinatarios.lead}</p>
          </div>
        </div>
        <div style={s.destGrid} className="dest-grid">
          {c.destinatarios.items.map((d, i) => (
            <div key={i} style={s.destCard} className="dest-card">
              <div style={s.destNum} className="dest-num">0{i + 1}</div>
              <div style={s.destText}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Líneas temáticas */}
      <section style={s.section}>
        <div style={s.sectionHead} className="section-head">
          <div style={s.sectionNumber} className="section-number">III</div>
          <div>
            <h2 style={s.sectionTitle}>{c.lineas.title}</h2>
            <p style={s.sectionLead}>{c.lineas.lead}</p>
          </div>
        </div>
        <div style={s.lineasGrid}>
          {c.lineas.items.map((a, i) => (
            <article key={i} style={s.lineaCard}>
              <div style={s.axNum}>{a.id}</div>
              <h3 style={s.axTitle}>{a.title}</h3>
              <p style={s.axDesc}>{a.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Formatos */}
      <section style={{ ...s.section, background: "#faf7f1" }}>
        <div style={s.sectionHead} className="section-head">
          <div style={s.sectionNumber} className="section-number">IV</div>
          <div>
            <h2 style={s.sectionTitle}>{c.formatos.title}</h2>
          </div>
        </div>
        <div style={s.formatGrid} className="format-grid">
          {c.formatos.items.map((f, i) => (
            <div key={i} style={s.formatCard}>
              <div style={s.formatHead}>
                <div style={s.formatName}>{f.f}</div>
                <div style={s.formatLen}>{f.len}</div>
              </div>
              <p style={s.formatDesc}>{f.desc}</p>
              {f.url && <a href={f.url} target="_blank" rel="noopener" style={s.formatLink}>{f.urlLabel} →</a>}
            </div>
          ))}
        </div>
      </section>

      {/* Propuestas / CFP */}
      <section style={{ ...s.section, background: primary, color: "#fff" }} id="propuestas">
        <div style={s.sectionHead} className="section-head">
          <div className="section-number" style={{ ...s.sectionNumber, color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>V</div>
          <div>
            <h2 style={{ ...s.sectionTitle, color: "#fff" }}>{c.propuestas.title}</h2>
            <p style={{ ...s.sectionLead, color: "rgba(255,255,255,0.75)" }}>{c.propuestas.lead}</p>
          </div>
        </div>

        <div style={s.cfpGrid} className="cfp-grid">
          <div style={s.cfpTimeline}>
            {c.propuestas.timeline.map((t, i) => (
              <div key={i} style={s.cfpStep}>
                <div style={{
                  ...s.cfpDot,
                  background: t.status === "open" ? "#fff" : "transparent",
                  border: t.status === "open" ? "2px solid #fff" :
                          t.status === "soon" ? "2px solid rgba(255,255,255,0.5)" :
                          "2px solid rgba(255,255,255,0.25)",
                }} />
                <div style={s.cfpStepBody}>
                  <div style={s.cfpStepDate}>{t.date}</div>
                  <div style={s.cfpStepLabel}>{t.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={s.cfpAside}>
            <div style={s.cfpAsideHead}>{c.ui.cfpAside}</div>
            {c.propuestas.normas.porFormato.map((pf, i) => (
              <div key={i} style={s.cfpFormat}>
                <div style={s.cfpFormatName}>{pf.f}</div>
                <div style={s.cfpFormatLen}>{pf.req}</div>
                {pf.url && <a href={pf.url} target="_blank" rel="noopener" style={s.cfpFormatLink}>Plantilla Canva →</a>}
              </div>
            ))}

            <div style={s.cfpAsideHead}>{c.ui.cfpForms}</div>
            {c.propuestas.materiales.map((m, i) => (
              <div key={i} style={s.cfpFormat}>
                <div style={s.cfpFormatName}>{m.tipo}</div>
                <div style={s.cfpFormatLen}>{m.desc}</div>
                {m.url && <a href={m.url} target="_blank" rel="noopener" style={s.cfpFormatLink}>{m.urlLabel} →</a>}
              </div>
            ))}

            <a href="https://forms.gle/er4VkFhmJDhxDDuv6" target="_blank" rel="noopener" style={{ ...s.cfpCta, textDecoration: "none", display: "block", textAlign: "center" }}>{c.ctas.submit} →</a>
          </div>
        </div>
      </section>

      {/* Matrícula y publicación */}
      <section style={s.section} id="matricula">
        <div style={s.sectionHead} className="section-head">
          <div style={s.sectionNumber} className="section-number">VI</div>
          <div>
            <h2 style={s.sectionTitle}>{c.matricula.title}</h2>
            <p style={s.sectionLead}>{c.matricula.lead}</p>
          </div>
        </div>
        <div style={s.matPubGrid}>
          <div style={s.matCard}>
            <p style={s.matInstruction}>{c.matricula.instruccion}</p>
            <div style={s.matFields}>
              <div style={s.matRow}>
                <span style={s.matK}>IBAN</span>
                <span style={s.matV}>{c.matricula.iban}</span>
              </div>
              <div style={s.matRow}>
                <span style={s.matK}>SWIFT / BIC</span>
                <span style={s.matV}>{c.matricula.swift}</span>
              </div>
              <div style={s.matRow}>
                <span style={s.matK}>{c.matricula.conceptoLabel}</span>
                <span style={s.matV}>{c.matricula.concepto}</span>
              </div>
            </div>
            <p style={s.matNota}>{c.matricula.nota}</p>
          </div>
          <div style={s.octCard}>
            <div style={s.octK}>{c.publicacion.octaedro.h}</div>
            <p style={s.octBody}>{c.publicacion.octaedro.body}</p>
            <div style={s.octDeadline} className="oct-deadline">
              <span style={s.normK}>{c.ui.pubDeadline}</span>
              <span style={s.octDeadlineV} className="oct-deadline-v">{c.publicacion.deadline}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Presentación día */}
      <section style={s.section} id="programa">
        <div style={s.sectionHead} className="section-head">
          <div style={s.sectionNumber} className="section-number">VII</div>
          <div>
            <h2 style={s.sectionTitle}>{c.presentacionDia.title}</h2>
            <p style={s.sectionLead}>{c.presentacionDia.lead}</p>
          </div>
        </div>
      </section>

      {/* Comités */}
      <section style={{ ...s.section, background: "#faf7f1" }} id="comites">
        <div style={s.sectionHead} className="section-head">
          <div style={s.sectionNumber} className="section-number">VIII</div>
          <div>
            <h2 style={s.sectionTitle}>{c.comites.title}</h2>
            <p style={s.sectionLead}>{c.comites.lead}</p>
          </div>
        </div>
        <div style={s.comAllCols} className="com-all-cols">
          {[1, 0, 2].map((idx, pos) => {
            const g = c.comites.grupos[idx];
            return (
              <React.Fragment key={idx}>
                <div style={{ ...s.comGroupLabel, ...(pos === 0 ? { marginTop: 0 } : { marginTop: 28 }) }}>{g.nombre}</div>
                {g.miembros.map((m, j) => (
                  <div key={j} style={s.comRowFlat}>
                    <div style={s.comName}>{m.n}</div>
                    <div style={s.comAff}>{m.a}</div>
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Contact CTA */}
      <section style={s.contactSec} id="contacto">
        <div style={s.contactInner}>
          <div style={s.contactKicker}>{c.ui.contactKicker}</div>
          <h3 style={s.contactH}>{c.ui.contactH}</h3>
          <a href={`mailto:${c.footer.contactSection}`} style={s.contactMailSm}>{c.footer.contactSection}</a>
          <div style={{ marginTop: 8 }}>
            <a href={`mailto:${c.footer.contact2Section}`} style={s.contactMailSm}>{c.footer.contact2Section}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerRow} className="footer-row">
          <div style={s.footerBrand}>
            <div style={s.logoWord}>Congressa</div>
            <div style={s.footerTag}>Plataforma de gestión de congresos académicos · <a href="mailto:arturo.rodriguez@uleam.edu.ec" style={{ color: "inherit", textDecoration: "underline" }}>Creado por Arturo Rodríguez</a></div>
          </div>
          <div style={s.footerRight} className="footer-right">
            <div style={{ fontSize: 11, letterSpacing: 1, color: "#a69a7b", textTransform: "uppercase", marginBottom: 4 }}>Contacto INEDUS 2026</div>
            <div><a href={`mailto:${c.footer.contact2}`} style={{ color: "inherit", textDecoration: "none" }}>{c.footer.contact2}</a></div>
            <div style={s.footerCopy}>{c.footer.copy}</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const v1ehuStyles = (primary) => ({
  root: {
    fontFamily: "'Geist', -apple-system, sans-serif",
    background: "#fbf9f4",
    color: "#1a1a1a",
    width: "100%",
    minHeight: "100%",
    fontSize: 15,
    lineHeight: 1.55,
  },
  nav: {
    display: "flex", alignItems: "center", padding: "clamp(14px, 3vw, 22px) clamp(16px, 4vw, 64px)",
    borderBottom: "1px solid #e9e2d2",
    background: "rgba(251,249,244,0.97)", backdropFilter: "blur(10px)",
    position: "fixed", top: 0, left: 0, right: 0,
    zIndex: 100, boxSizing: "border-box",
  },
  navSpacer: { height: "clamp(64px, 10vw, 80px)" },
  logoWrap: { display: "flex", alignItems: "center", gap: 12 },
  uniLogo: { height: 36, width: "auto", objectFit: "contain" },
  logoDividerV: { width: 1, height: 28, background: "#d8cfb8" },
  navLinks: { display: "flex", gap: 14, margin: "0 auto", flexShrink: 1, flexWrap: "nowrap", overflow: "hidden" },
  navLink: { color: "#3a3628", fontSize: 12, textDecoration: "none", whiteSpace: "nowrap" },
  navRight: { display: "flex", alignItems: "center", gap: 14, flexShrink: 0 },
  langToggle: { display: "flex", border: "1px solid #d8cfb8", borderRadius: 999, overflow: "hidden" },
  langBtn: { background: "transparent", border: "none", padding: "5px 10px", fontSize: 11, letterSpacing: 1, color: "#7a7162", cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s, color 0.15s" },
  navCta: { background: primary, color: "#fff", border: "none", padding: "10px 18px", borderRadius: 999, fontSize: 13, cursor: "pointer", fontFamily: "inherit" },

  hero: { padding: "clamp(32px, 6vw, 80px) clamp(16px, 4vw, 64px) clamp(32px, 5vw, 48px)", maxWidth: 1280, margin: "0 auto" },
  heroMeta: { display: "flex", alignItems: "center", gap: 12, color: "#7a7162", flexWrap: "wrap" },
  heroKicker: { textTransform: "uppercase", fontSize: 11, letterSpacing: 1.4 },
  heroDot: { color: "#c9bda0" },
  heroTitle: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: "clamp(40px, 8vw, 80px)", lineHeight: 1.0, letterSpacing: -1.8, margin: "16px 0 0",
    color: "#1a1a1a", fontWeight: 400, maxWidth: 1100, textWrap: "balance",
  },
  heroTitleEm: { fontStyle: "italic", color: primary },
  heroSubRow: { marginTop: 16 },
  heroSubKicker: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(18px, 4vw, 22px)", fontStyle: "italic", color: "#5a5244" },
  heroLead: { marginTop: 20, maxWidth: 660, fontSize: "clamp(16px, 3vw, 18px)", lineHeight: 1.55, color: "#3a3628", textWrap: "pretty" },
  heroTaglineRow: { display: "flex", alignItems: "center", gap: 16, marginTop: 24 },
  heroRule: { width: 56, height: 1, background: primary },
  heroTagline: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(16px, 3vw, 20px)", fontStyle: "italic", color: primary, maxWidth: 700 },
  ctaRow: { display: "flex", alignItems: "center", gap: 16, marginTop: 28, flexWrap: "wrap" },
  ctaPrimary: { background: primary, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 999, fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 },
  ctaSecondary: { background: "transparent", color: "#1a1a1a", border: "1px solid #1a1a1a", padding: "14px 28px", borderRadius: 999, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  ctaText: { color: primary, fontSize: 14, textDecoration: "none" },

  heroVenues: {
    marginTop: 40, padding: "clamp(16px, 3vw, 24px) clamp(16px, 4vw, 32px)",
    background: "#fff", border: "1px solid #e9e2d2", borderRadius: 6,
    display: "grid", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 32, alignItems: "center",
  },
  venue: {},
  venueLogo: { height: 52, width: "auto", objectFit: "contain", marginBottom: 16, display: "block" },
  venueLabel: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#a69a7b" },
  venueName: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px, 4vw, 28px)", marginTop: 6, color: primary },
  venueDetail: { fontSize: 14, color: "#5a5244", marginTop: 4 },
  venueDivider: { fontFamily: "'Instrument Serif', serif", fontSize: 36, color: "#c9bda0", fontStyle: "italic" },

  stats: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
    borderTop: "1px solid #e9e2d2", borderBottom: "1px solid #e9e2d2",
    maxWidth: 1280, margin: "0 auto",
  },
  statCell: { padding: "clamp(24px, 4vw, 36px) clamp(20px, 4vw, 40px)", borderBottom: "1px solid #e9e2d2", borderLeft: "1px solid #e9e2d2" },
  statN: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px, 6vw, 52px)", color: primary, lineHeight: 1 },
  statL: { marginTop: 8, fontSize: 13, color: "#7a7162" },

  section: { padding: "clamp(24px, 5vw, 64px) clamp(16px, 4vw, 64px)", maxWidth: 1280, margin: "0 auto" },
  sectionHead: { display: "flex", gap: 32, marginBottom: 36, alignItems: "flex-start" },
  sectionNumber: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(20px, 4vw, 24px)", fontStyle: "italic", color: primary, paddingRight: 20, borderRight: "1px solid #d8cfb8" },
  sectionTitle: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 6vw, 44px)", lineHeight: 1.05, margin: 0, fontWeight: 400, letterSpacing: -0.8 },
  sectionLead: { marginTop: 10, color: "#7a7162", fontSize: 16, maxWidth: 640 },

  objsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 },
  axCard: { padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 28px)", background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4, minHeight: 140 },
  axNum: { fontFamily: "'Instrument Serif', serif", fontSize: 13, color: primary, letterSpacing: 2, marginBottom: 10 },
  axTitle: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(20px, 4vw, 24px)", margin: "0 0 10px", fontWeight: 400 },
  axDesc: { color: "#5a5244", fontSize: 14, lineHeight: 1.55, margin: 0 },

  destGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 },
  destCard: { display: "flex", gap: 20, padding: "clamp(16px, 4vw, 20px) clamp(16px, 4vw, 24px)", background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4, alignItems: "flex-start" },
  destNum: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px, 4vw, 28px)", fontStyle: "italic", color: primary, lineHeight: 1 },
  destText: { fontSize: 15, color: "#3a3628", flex: 1 },

  lineasGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  lineaCard: { padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 28px)", background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4 },

  formatGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  formatCard: { padding: "clamp(20px, 4vw, 28px)", background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4 },
  formatHead: { paddingBottom: 16, marginBottom: 16, borderBottom: "1px dashed #d8cfb8" },
  formatName: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(20px, 4vw, 24px)", color: primary },
  formatLen: { fontSize: 12, color: "#7a7162", fontFamily: "monospace", marginTop: 4 },
  formatDesc: { fontSize: 14, color: "#5a5244", margin: 0, lineHeight: 1.55 },
  formatLink: { display: "inline-block", marginTop: 10, fontSize: 13, color: primary, textDecoration: "underline", textDecorationColor: "rgba(30,58,138,0.4)", textUnderlineOffset: 3 },

  cfpGrid: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 },
  cfpTimeline: {},
  cfpStep: { display: "flex", gap: 16, paddingBottom: 16 },
  cfpDot: { width: 12, height: 12, borderRadius: 999, marginTop: 5, flexShrink: 0 },
  cfpStepBody: { flex: 1, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 14 },
  cfpStepDate: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" },
  cfpStepLabel: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(18px, 4vw, 22px)", marginTop: 6, color: "#fff", lineHeight: 1.25 },
  cfpAside: { padding: 32, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 4, height: "fit-content" },
  cfpAsideHead: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginTop: 4, marginBottom: 14 },
  normRow: { display: "flex", justifyContent: "space-between", gap: 16, padding: "10px 0", borderBottom: "1px dashed rgba(255,255,255,0.14)", fontSize: 13 },
  normK: { color: "rgba(255,255,255,0.55)", textTransform: "uppercase", fontSize: 10, letterSpacing: 1, paddingTop: 2, minWidth: 88 },
  normV: { color: "#fff", textAlign: "right", flex: 1 },
  cfpNote: { fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 14, fontStyle: "italic", lineHeight: 1.5 },
  checkRow: { display: "flex", gap: 8, alignItems: "baseline", padding: "5px 0", borderBottom: "1px dashed rgba(255,255,255,0.1)" },
  checkMark: { fontSize: 13, color: "rgba(255,255,255,0.5)", flexShrink: 0 },
  checkText: { fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 },
  cfpFormat: { padding: "12px 0", borderBottom: "1px dashed rgba(255,255,255,0.14)" },
  cfpFormatName: { fontFamily: "'Instrument Serif', serif", fontSize: 17, color: "#fff" },
  cfpFormatLen: { fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 },
  cfpFormatLink: { fontSize: 12, color: "#fff", marginTop: 6, display: "inline-block", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.4)", textUnderlineOffset: 3 },
  cfpCta: { marginTop: 24, background: "#fff", color: primary, border: "none", padding: "14px 24px", borderRadius: 999, fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, width: "100%" },

  presGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  presCard: { padding: "clamp(20px, 4vw, 28px)", background: "#faf7f1", border: "1px solid #e9e2d2", borderRadius: 4 },
  presH: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(20px, 4vw, 24px)", color: primary, marginBottom: 12 },
  presBody: { fontSize: 14, color: "#3a3628", margin: 0, lineHeight: 1.6 },
  presNota: { marginTop: 32, padding: "16px 24px", background: "#fff8e6", border: "1px solid #e8d895", borderRadius: 4, fontSize: 14, color: "#5a4a2a" },
  presNotaK: { fontWeight: 600, color: "#8a6a1a", textTransform: "uppercase", fontSize: 11, letterSpacing: 1, marginRight: 6 },

  pubGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 24, marginBottom: 40 },
  pubNormHead: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#a69a7b", marginBottom: 14 },
  pubNormRow: { display: "flex", justifyContent: "space-between", gap: 16, padding: "10px 0", borderBottom: "1px dashed #e9e2d2", fontSize: 13 },
  pubNormK: { color: "#7a7162", textTransform: "uppercase", fontSize: 10, letterSpacing: 1, paddingTop: 2, minWidth: 88, flexShrink: 0 },
  pubNormV: { color: "#1a1a1a", textAlign: "right", flex: 1 },
  octCard: { padding: 32, background: "#fff", border: `1px solid ${primary}`, borderRadius: 4 },
  octK: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px, 4vw, 28px)", color: primary },
  octBody: { fontSize: 14, color: "#3a3628", marginTop: 12, lineHeight: 1.6 },
  octDeadline: { marginTop: 24, paddingTop: 20, borderTop: "1px dashed #d8cfb8", display: "flex", justifyContent: "space-between", alignItems: "baseline" },
  octDeadlineV: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(16px, 3vw, 18px)", color: primary },
  pubNorms: { padding: 32, background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4 },

  estructurasRow: { paddingTop: 32, borderTop: "1px solid #e9e2d2", marginTop: 8 },
  estHead: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#a69a7b", marginBottom: 16 },
  estGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  estCard: { padding: "clamp(16px, 4vw, 20px) clamp(16px, 4vw, 24px)", background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4 },
  estTipo: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(16px, 3vw, 18px)", color: primary, marginBottom: 6 },
  estBody: { fontSize: 13, color: "#5a5244", lineHeight: 1.55 },

  elementosRow: { marginTop: 24 },
  elList: { listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 },
  elLi: { padding: "10px 16px", background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4, fontSize: 13, color: "#3a3628" },

  matPubGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 24 },
  matCard: { padding: "clamp(24px, 4vw, 40px)", background: "#fff", border: `1px solid ${primary}`, borderRadius: 4 },
  matInstruction: { fontSize: 15, color: "#3a3628", margin: "0 0 24px" },
  matFields: { display: "flex", flexDirection: "column", gap: 0 },
  matRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "12px 0", borderBottom: "1px dashed #e9e2d2" },
  matK: { fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", color: "#7a7162", minWidth: 130, flexShrink: 0 },
  matV: { fontFamily: "monospace", fontSize: 15, color: primary, textAlign: "right" },
  matNota: { marginTop: 20, fontSize: 13, color: "#7a7162", fontStyle: "italic", lineHeight: 1.55, margin: "20px 0 0" },

  comiteGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 },
  comiteCard: { display: "flex", gap: 20, padding: "clamp(16px, 4vw, 20px) clamp(16px, 4vw, 24px)", background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4, alignItems: "center" },
  comiteNum: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(18px, 4vw, 22px)", color: primary },
  comiteName: { fontSize: 16, color: "#3a3628" },

  orgsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 },
  orgCard: { padding: "clamp(24px, 4vw, 32px) clamp(20px, 4vw, 32px) clamp(20px, 4vw, 28px)", background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4 },
  orgNum: { fontFamily: "'Instrument Serif', serif", fontSize: 13, color: primary, letterSpacing: 2, marginBottom: 10 },
  orgName: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px, 4vw, 30px)", color: "#1a1a1a", lineHeight: 1.1 },
  orgParent: { fontSize: 14, color: primary, marginTop: 6 },
  orgCountry: { fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#a69a7b", marginTop: 12 },

  comitesWrap: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  comGrupo: { background: "#fff", border: "1px solid #e9e2d2", borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" },
  comGrupoHead: { padding: "clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px) clamp(16px, 4vw, 20px)", borderBottom: "1px solid #e9e2d2", background: "#fbf9f4" },
  comGrupoKicker: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: primary, fontFamily: "monospace" },
  comGrupoTitle: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px, 4vw, 26px)", margin: "8px 0 4px", fontWeight: 400 },
  comGrupoCount: { fontSize: 12, color: "#7a7162", fontStyle: "italic" },
  comList: { padding: "8px 24px 20px" },
  comRow: { display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderBottom: "1px dashed #e9e2d2", alignItems: "baseline" },
  comName: { fontSize: 14, color: "#1a1a1a", flex: 1 },
  comAff: { fontSize: 11, color: "#7a7162", fontFamily: "monospace", letterSpacing: 0.3, textAlign: "right" },

  comAllCols: { columns: 3, columnGap: 40, columnRule: "1px solid #e9e2d2" },
  comGroupLabel: { fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase", color: primary, fontFamily: "monospace", paddingBottom: 8, borderBottom: `2px solid ${primary}`, breakInside: "avoid", breakAfter: "avoid", display: "block" },
  comRowFlat: { display: "flex", justifyContent: "space-between", gap: 12, padding: "7px 0", borderBottom: "1px dashed #e9e2d2", alignItems: "baseline", breakInside: "avoid" },

  contactSec: { background: "#1a1a1a", color: "#fff", padding: "clamp(32px, 6vw, 72px) clamp(16px, 4vw, 64px)" },
  contactInner: { maxWidth: 1280, margin: "0 auto", textAlign: "center" },
  contactKicker: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.55)" },
  contactH: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px, 6vw, 40px)", fontWeight: 400, margin: "12px 0 20px", letterSpacing: -0.6 },
  contactMail: { fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px, 4vw, 28px)", color: "#fff", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.4)", textUnderlineOffset: 6 },
  contactMailSm: { fontFamily: "'Geist', sans-serif", fontSize: "clamp(14px, 2.5vw, 18px)", color: "#fff", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.4)", textUnderlineOffset: 4, display: "block" },

  footer: { padding: "clamp(24px, 5vw, 40px) clamp(16px, 4vw, 64px)", borderTop: "1px solid #e9e2d2", maxWidth: 1280, margin: "0 auto" },
  footerRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  footerBrand: {},
  footerTag: { fontSize: 12, color: "#7a7162", marginTop: 2 },
  footerRight: { textAlign: "right", fontSize: 13, color: "#5a5244" },
  footerCopy: { fontSize: 11, color: "#a69a7b", marginTop: 4, maxWidth: 360 },
});

window.V1_EHU = V1_EHU;
