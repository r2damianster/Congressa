const fs = require('fs');
const file = 'variants/v1-ehu.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add hook for auto-scroll
code = code.replace(
  'const s = v1ehuStyles(primary);',
  `const s = v1ehuStyles(primary);

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
      }, 40);
    };
    startScroll();
    el.addEventListener('touchstart', () => clearInterval(autoScrollInterval), { passive: true });
    el.addEventListener('touchend', () => { setTimeout(startScroll, 2000); }, { passive: true });
    return () => clearInterval(autoScrollInterval);
  }, []);`
);

// 2. Add ref to objsGrid
code = code.replace(
  '<div style={s.objsGrid} className="scroll-row">',
  '<div style={s.objsGrid} className="scroll-row" ref={scrollRef}>'
);

// 3. Add mobile CSS rules for hero-venues and dest-grid
const extraCSS = `
          .hero-venues { text-align: center; }
          .hero-venues .venue { width: 100%; }

          .dest-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
          }
          .dest-card {
            padding: 12px 16px !important;
          }
          .dest-num {
            font-size: 18px !important;
          }
`;
code = code.replace('.oct-deadline-v { text-align: left !important; }', '.oct-deadline-v { text-align: left !important; }' + extraCSS);

// 4. Update destGrid classes
code = code.replace(
  '<div style={s.destGrid} className="scroll-row">',
  '<div style={s.destGrid} className="dest-grid">'
);
code = code.replace(
  '<div key={i} style={s.destCard}>',
  '<div key={i} style={s.destCard} className="dest-card">'
);
code = code.replace(
  '<div style={s.destNum}>0{i + 1}</div>',
  '<div style={s.destNum} className="dest-num">0{i + 1}</div>'
);

// 5. Remove scroll-row from lineas, format, pres
code = code.replace('<div style={s.lineasGrid} className="scroll-row">', '<div style={s.lineasGrid}>');
code = code.replace('<div style={s.formatGrid} className="scroll-row">', '<div style={s.formatGrid}>');
code = code.replace('<div style={s.presGrid} className="scroll-row">', '<div style={s.presGrid}>');

fs.writeFileSync(file, code);
console.log("Patched v1-ehu.jsx successfully!");
