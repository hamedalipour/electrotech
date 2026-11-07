/** جراحی آبگرمکن/پکیج در content JSON ها */
const fs = require('fs');

// ---------- prices.json ----------
{
  const j = JSON.parse(fs.readFileSync('content/prices.json', 'utf8'));
  for (const cat of j.priceCategories) {
    // حذف ردیف‌های آبگرمکن/پکیج
    cat.rows = cat.rows.filter((r) => !/آبگرمکن|پکیج/.test(r.service + ' ' + (r.note || '') + ' ' + (r.size || '')));
    // اصلاح عنوان دسته
    cat.title = cat.title.replace('قطعات هیتر و المنت و گاز', 'هیتر و قطعات گرمایشی');
    cat.title = cat.title.replace('هیتر و قطعات گرمایشی و گاز', 'هیتر و قطعات گرمایشی');
  }
  // اصلاح سرویس‌های نام‌برده در ردیف‌ها
  for (const cat of j.priceCategories) {
    for (const r of cat.rows) {
      r.service = r.service.replace('تست نشتی گاز و رفع نشتی (اجاق، آبگرمکن، پکیج)', 'تست نشتی گاز و رفع نشتی (اجاق گاز)');
      r.service = r.service.replace('سرویس و پاک‌سازی مشعل و پایلوت', 'سرویس و پاک‌سازی شعله‌پخش‌کن اجاق گاز');
    }
  }
  // عنوان دسته گاز
  for (const cat of j.priceCategories) {
    if (cat.id === 'heating') cat.title = 'هیتر و قطعات گرمایشی';
    if (cat.id === 'gas') cat.title = 'گاز و لوله‌کشی';
  }
  j.priceDisclaimer = String(j.priceDisclaimer).split('آبگرمکن و پکیج').join('اجاق گاز');
  fs.writeFileSync('content/prices.json', JSON.stringify(j, null, 2) + '\n', 'utf8');
  console.log('prices.json done — categories:', j.priceCategories.map((c) => `${c.id}(${c.rows.length})`).join(' '));
}

// ---------- faqs.json ----------
{
  const j = JSON.parse(fs.readFileSync('content/faqs.json', 'utf8'));
  let total = 0;
  for (const g of j.faqGroups) {
    const before = g.faqs.length;
    g.faqs = g.faqs.filter((f) => !/آبگرمکن|پکیج/.test(f.q));
    for (const f of g.faqs)
      f.a = f.a.split('آبگرمکن و پکیج').join('اجاق گاز').split('آبگرمکن').join('اجاق گاز').split('پکیج').join('اجاق گاز');
    total += before - g.faqs.length;
  }
  fs.writeFileSync('content/faqs.json', JSON.stringify(j, null, 2) + '\n', 'utf8');
  console.log('faqs.json done — removed:', total);
}

// ---------- testimonials.json ----------
{
  const j = JSON.parse(fs.readFileSync('content/testimonials.json', 'utf8'));
  const arr = j.testimonials ?? j;
  for (const t of arr) {
    for (const k of Object.keys(t)) {
      if (typeof t[k] === 'string') t[k] = t[k].split('آبگرمکن و پکیج').join('اجاق گاز').split('آبگرمکن').join('اجاق گاز').split('پکیج').join('اجاق گاز').split('قطعات هیتر و المنت').join('موتور و هیتر');
    }
  }
  fs.writeFileSync('content/testimonials.json', JSON.stringify(j, null, 2) + '\n', 'utf8');
  console.log('testimonials.json done');
}

// ---------- site.json ----------
{
  const j = JSON.parse(fs.readFileSync('content/site.json', 'utf8'));
  let t = JSON.stringify(j, null, 2);
  t = t.split('آبگرمکن و پکیج').join('اجاق گاز').split('، آبگرمکن').join('').split('آبگرمکن و ').join('').split(' آبگرمکن').join('').split('آبگرمکن').join('');
  t = t.split('پکیج و ').join('').split(' و پکیج').join('').split('پکیج').join('');
  fs.writeFileSync('content/site.json', t + '\n', 'utf8');
  const back = JSON.parse(fs.readFileSync('content/site.json', 'utf8'));
  console.log('site.json done — name:', back.name);
}

// ---------- tags: removes آبگرمکن from areas keywords etc (همه JSONهای باقی content) ----------
{
  for (const f of ['content/faqs.json', 'content/testimonials.json']) {
    const t = fs.readFileSync(f, 'utf8');
    if (/آبگرمکن|پکیج/.test(t)) console.log('⚠ باقی در', f);
  }
}
