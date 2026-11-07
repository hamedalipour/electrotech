/** حذف اشاره‌های آبگرمکن/پکیج از دو مقاله + touch-posts */
const fs = require('fs');

// ---------- appliance-maintenance.json ----------
{
  const p = JSON.parse(fs.readFileSync('content/posts/appliance-maintenance.json', 'utf8'));
  p.excerpt = p.excerpt.split('آبگرمکن و خشک‌کن').join('اجاق گاز و خشک‌کن');
  p.keywords = p.keywords.filter((k) => !/آبگرمکن/.test(k));
  p.seoDescription = p.seoDescription.split('آبگرمکن و خشک‌کن').join('اجاق گاز و خشک‌کن');
  p.relatedServices = p.relatedServices.filter((s) => s !== 'water-heater');
  // سالانه: سرویس آبگرمکن → سرویس اجاق گاز، رسوب‌زدایی هیتر بماند
  const year = p.blocks.find((b) => b.type === 'list' && b.items.some((i) => /سرویس آبگرمکن/.test(i)));
  if (year) {
    year.items = year.items.map((i) =>
      i
        .replace('سرویس آبگرمکن: تمیزکاری پیلوت و الکترود، تست سنسور شعله و بررسی رگولاتور.', 'سرویس اجاق گاز: بازدید پایه و شعله‌پخش‌کن، تمیزکاری نازل‌ها و تست نشتی گاز.')
        .replace('آب‌بندی و نصب مجدد لوله‌های فرسوده پیش از سرما؛ بیشترین شکایت‌ها زمستان ثبت می‌شود.', 'بازدید لوله‌های ورودی آب و شیرهای فرسوده؛ لوله‌های بادامک‌دار را پیش از سرما عوض کنید.')
    );
  }
  p.faqs = p.faqs.filter((f) => !/آبگرمکن/.test(f.q));
  p.faqs.push({
    q: 'سرویس دوره‌ای یخچال هم لازم است؟',
    a: 'سالانه یک‌بار کافی است: تمیزکاری کویل‌های پشت دستگاه، تست واشر در و بازدید مسیر تخلیه دیفراست؛ همین سه مورد بیشترین افت سرما و خرابی فن را پیشگیری می‌کند.',
  });
  fs.writeFileSync('content/posts/appliance-maintenance.json', JSON.stringify(p, null, 2) + '\n', 'utf8');
  console.log('appliance-maintenance done');
}

// ---------- appliance-repair-prices-tehran.json ----------
{
  const p = JSON.parse(fs.readFileSync('content/posts/appliance-repair-prices-tehran.json', 'utf8'));
  p.excerpt = p.excerpt.split('و آبگرمکن چقدر است؟').join('و خشک‌کن چقدر است؟');
  p.seoDescription = p.seoDescription.split('، آبگرمکن و خشک‌کن').join('، خشک‌کن و اجاق گاز');
  p.relatedServices = p.relatedServices.filter((s) => s !== 'water-heater');
  for (const b of p.blocks) {
    if (b.type === 'table' && b.headers[0] === 'خدمت') {
      b.rows = b.rows.filter((r) => !/آبگرمکن|پکیج/.test(r[0]));
      b.rows.splice(4, 0, ['تعمیر مایکروویو و فر', '۸۰۰ هزار تا ۲ میلیون تومان', 'مگنترون و هیتر در کران متوسط']);
    }
    if (b.type === 'p' && /تعویض ترموکوپل، رگولاتور و تمیزکاری پیلوت/.test(b.text)) {
      b.text = 'تعویض شیر و اشتعال‌فرار اجاق گاز و تعویض هیتر معمولاً در همان بازدید انجام می‌شود؛ تعرفه‌ها را در صفحه هزینه‌ها ببینید.';
    }
  }
  fs.writeFileSync('content/posts/appliance-repair-prices-tehran.json', JSON.stringify(p, null, 2) + '\n', 'utf8');
  console.log('appliance-repair-prices-tehran done');
}

// ---------- touch-posts.mjs ----------
{
  const t = fs.readFileSync('scripts/touch-posts.mjs', 'utf8');
  const next = t.split("  'water-heater-no-ignite',\n").join('');
  fs.writeFileSync('scripts/touch-posts.mjs', next, 'utf8');
  console.log('touch-posts done');
}
