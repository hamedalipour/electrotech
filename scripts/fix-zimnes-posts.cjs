/** حذف زیمنس از متن سه مقاله دانشی */
const fs = require('fs');

function sub(f, pairs) {
  let t = fs.readFileSync(f, 'utf8');
  for (const [a, b] of pairs) {
    if (!t.includes(a)) { console.log('MISS', f, '→', a.slice(0, 40)); continue; }
    t = t.split(a).join(b);
  }
  fs.writeFileSync(f, t, 'utf8');
  console.log('done', f);
}

sub('content/posts/dishwasher-e24.json', [
  ['خطای E24 در ظرفشویی‌های بوش و زیمنس (و همان کد', 'خطای E24 در ظرفشویی‌های بوش (و همان کد'],
  ['خطای E24 ظرفشویی بوش و زیمنس یعنی چه؟', 'خطای E24 ظرفشویی بوش یعنی چه؟'],
]);
sub('content/posts/side-by-side-issues.json', [
  ['"بوش و زیمنس: خطاهای دیفراست و سنسور دما در نمایشگر"', '"بوش و سامسونگ: خطاهای دیفراست و سنسور دما در نمایشگر"'],
]);
sub('content/posts/washer-no-drain.json', [
  ['"بوش و زیمنس: E24 و E25 در ظرفشویی‌های خانواده"', '"بوش: E24 و E25 در ظرفشویی‌های خانواده"'],
]);
