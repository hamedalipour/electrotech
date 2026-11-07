import fs from 'node:fs';

const p = JSON.parse(fs.readFileSync('content/posts.json', 'utf8'));

function addLink(slug, text, href) {
  const post = p.find(x => x.slug === slug);
  if (!post) { console.log('NOT FOUND:', slug); return; }
  const hrefs = post.blocks.filter(b => b.type === 'link').map(b => b.href);
  if (hrefs.includes(href)) {
    console.log(`skip ${slug} -> ${href} (exists)`);
    return;
  }
  post.blocks.push({ type: 'link', text, href });
  console.log(`added ${slug} -> ${href} (${text})`);
}

// پنل شکسته ال‌جی/اسنوا از صفحات با ترافیک بالا
addLink('snowa-repair-cost', 'تعمیر لوازم خانگی پنل شکسته اسنوا؛ قیمت و تشخیص', '/blog/broken-panel-duo-snowa/');
addLink('daewoo-repair-cost', 'تعمیر لوازم خانگی پنل شکسته ال‌جی؛ قیمت و تشخیص', '/blog/broken-panel-duo-snowa/');
addLink('tv-repair-cost', 'تعمیر لوازم خانگی پنل شکسته ال‌جی و اسنوا؛ قیمت ۱۴۰۵', '/blog/broken-panel-duo-snowa/');
addLink('panel-vs-new-tv', 'تعمیر لوازم خانگی پنل شکسته ال‌جی و اسنوا؛ قیمت ۱۴۰۵', '/blog/broken-panel-duo-snowa/');
addLink('black-screen-with-sound', 'تعمیر لوازم خانگی پنل شکسته ال‌جی و اسنوا؛ قیمت ۱۴۰۵', '/blog/broken-panel-duo-snowa/');

// نصب دیواری ال‌جی/اسنوا از صفحات مرتبط
addLink('wall-mount-guide', 'نصب لوازم خانگی ال‌جی و اسنوا روی دیوار؛ قیمت و VESA', '/blog/wall-mount-duo-snowa/');
addLink('tv-repair-cost', 'نصب لوازم خانگی ال‌جی و اسنوا روی دیوار؛ قیمت و VESA ۱۴۰۵', '/blog/wall-mount-duo-snowa/');

fs.writeFileSync('content/posts.json', JSON.stringify(p, null, 2));
console.log('Done. Internal links added.');
