/** جستجوی واژه‌های قدیمی تلویزیون‌محور در src و content */
const fs = require('fs');
const path = require('path');
const PAT =
  /backlight|power-board|mainboard|android-tv|T-Con|تلویزیون|دوو|پیچ\u200cگوشتی|پیچگوشتی|اندروید|بک‌لایت/g;
const results = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (!['node_modules', '.next', 'out', '.git'].includes(f)) walk(p);
    } else if (/\.(tsx?|json|md|mjs|html|css)$/.test(f)) {
      const t = fs.readFileSync(p, 'utf8');
      PAT.lastIndex = 0;
      let m;
      const seen = new Set();
      while ((m = PAT.exec(t))) {
        const line = t.slice(0, m.index).split('\n').length;
        const key = `${p}:${line}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push(`${key} → ${m[0]} :: ${t.split('\n')[line - 1].trim().slice(0, 90)}`);
        }
      }
    }
  }
}
walk('src');
walk('content');
console.log(results.join('\n') || 'CLEAN — no leftovers');
console.log('total:', results.length);
