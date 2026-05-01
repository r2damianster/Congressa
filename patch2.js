const fs = require('fs');
const file = 'variants/v1-ehu.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Update global margins to be tighter on mobile (quemando espacio)
code = code.replace(/clamp\(56px, 8vw, 96px\)/g, 'clamp(32px, 6vw, 96px)');
code = code.replace(/clamp\(48px, 8vw, 80px\)/g, 'clamp(32px, 6vw, 80px)');
code = code.replace(/clamp\(48px, 8vw, 72px\)/g, 'clamp(32px, 6vw, 72px)');
code = code.replace(/clamp\(32px, 5vw, 40px\)/g, 'clamp(24px, 5vw, 40px)');
code = code.replace(/clamp\(20px, 5vw, 64px\)/g, 'clamp(16px, 4vw, 64px)');

// 2. Prevent grid overflow by adding min(100%, Xpx) to grids
code = code.replace(/minmax\((\d+)px/g, 'minmax(min(100%, $1px)');

// 3. Add .scroll-row to the <style> block
const scrollCSS = `
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
`;
code = code.replace('.nav-links, .lang-pill', scrollCSS + '\n          .nav-links, .lang-pill');

// 4. Add className="scroll-row" to specific grids
code = code.replace(/style=\{s\.objsGrid\}/g, 'style={s.objsGrid} className="scroll-row"');
code = code.replace(/style=\{s\.destGrid\}/g, 'style={s.destGrid} className="scroll-row"');
code = code.replace(/style=\{s\.lineasGrid\}/g, 'style={s.lineasGrid} className="scroll-row"');
code = code.replace(/style=\{s\.formatGrid\}/g, 'style={s.formatGrid} className="scroll-row"');
code = code.replace(/style=\{s\.presGrid\}/g, 'style={s.presGrid} className="scroll-row"');
code = code.replace(/style=\{s\.estGrid\}/g, 'style={s.estGrid} className="scroll-row"');
code = code.replace(/style=\{s\.orgsGrid\}/g, 'style={s.orgsGrid} className="scroll-row"');
code = code.replace(/style=\{s\.comitesWrap\}/g, 'style={s.comitesWrap} className="scroll-row"');

// 5. Make cards smaller padding
code = code.replace(/padding: "32px 28px"/g, 'padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 28px)"');
code = code.replace(/padding: "20px 24px"/g, 'padding: "clamp(16px, 4vw, 20px) clamp(16px, 4vw, 24px)"');
code = code.replace(/padding: "28px"/g, 'padding: "clamp(20px, 4vw, 28px)"');
code = code.replace(/padding: "32px 32px 28px"/g, 'padding: "clamp(24px, 4vw, 32px) clamp(20px, 4vw, 32px) clamp(20px, 4vw, 28px)"');
code = code.replace(/padding: "24px 24px 20px"/g, 'padding: "clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px) clamp(16px, 4vw, 20px)"');
code = code.replace(/minHeight: 180/g, 'minHeight: 140');

fs.writeFileSync(file, code);
console.log('Patched variants/v1-ehu.jsx successfully with horizontal scroll');
