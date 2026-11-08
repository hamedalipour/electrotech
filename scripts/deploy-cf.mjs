// اسکریپت آپلود Cloudflare Pages با تلاش مجدد خودکار
// توکن از متغیرهای محیطی خوانده می‌شود — CLOUDFLARE_API_TOKEN و CLOUDFLARE_ACCOUNT_ID
import { execSync } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID) {
  console.error('خطا: CLOUDFLARE_API_TOKEN و CLOUDFLARE_ACCOUNT_ID باید در محیط ست شوند');
  process.exit(1);
}

const MAX = 6;
for (let i = 1; i <= MAX; i++) {
  try {
    const out = execSync(
      'npx --yes wrangler@latest pages deploy out --project-name electrotech --branch main --commit-dirty=true',
      {
        stdio: ['ignore', 'pipe', 'pipe'],
        encoding: 'utf8',
        timeout: 10 * 60_000,
        env: { ...process.env, CI: 'true' },
      },
    );
    console.log(out);
    if (out.includes('Upload complete')) {
      console.log(`SUCCESS on attempt ${i}`);
      process.exit(0);
    }
    console.log(`--- attempt ${i}: finished without success marker`);
  } catch (e) {
    const msg = String(e.stdout || '') + '\n' + String(e.stderr || '');
    console.log(`--- attempt ${i} failed:\n${msg.slice(-500)}`);
  }
  if (i < MAX) await sleep(20_000);
}
console.log('ALL ATTEMPTS FAILED');
process.exit(1);
