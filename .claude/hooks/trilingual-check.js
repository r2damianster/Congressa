// PostToolUse hook — CIIIES 2026 trilingual guard
// Fires after Edit/Write; injects reminder into Claude's context
// when the edited file is part of the EHU/CIIIES landing.

const EHU_PATTERN = /v1-ehu\.jsx|shared-content-ehu\.jsx|Landing CIIIES/i;

let raw = '';
process.stdin.on('data', chunk => raw += chunk);
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw);
    const filePath = (input.tool_input && input.tool_input.file_path) || '';
    if (EHU_PATTERN.test(filePath)) {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PostToolUse',
          additionalContext:
            '⚠️ REGLA TRILINGÜE CIIIES 2026: acabas de editar un archivo del landing EHU. ' +
            'Si el cambio afecta contenido visible, UI labels o strings de navegación, ' +
            'DEBES aplicarlo en los 3 idiomas (es / eu / en) dentro de shared-content-ehu.jsx. ' +
            'No hagas commits hasta verificar que las 3 versiones estén actualizadas.'
        }
      }));
    }
  } catch (_) {}
});
