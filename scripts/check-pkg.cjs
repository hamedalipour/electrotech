// بررسی bytes توضیح package.json
const fs = require('fs');
const t = fs.readFileSync('package.json', 'utf8');
const line = t.split('\n').find((l) => l.includes('description'));
console.log(line);
console.log('contains TV word:', t.includes('تلویزیون'));
