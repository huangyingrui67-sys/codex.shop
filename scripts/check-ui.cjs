const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true, timeout: 20000 });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading]').forEach(image => image.loading = 'eager');
      await document.fonts.ready;
      await Promise.all([...document.images].filter(image => image.src).map(image => image.decode()));
    });
    await page.screenshot({ path: 'preview-desktop.png', fullPage: true });
    assert.equal(await page.locator('.dish-card').count(), 3);
    await page.locator('[data-filter="main"]').click();
    assert.equal(await page.locator('.dish-card').count(), 2);
    await page.locator('[data-dish="salmon"]').click();
    assert.ok(await page.locator('#dish-dialog').evaluate(dialog => dialog.open));
    await page.locator('#dish-reserve').click();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
    await page.locator('[name="date"]').fill(date);
    await page.locator('[name="time"]').selectOption('18:00');
    await page.locator('[name="name"]').fill('林女士');
    await page.locator('[name="phone"]').fill('13800138000');
    await page.locator('[type="submit"]').click();
    assert.ok(await page.locator('#reservation-success').isVisible());
    assert.ok(await page.evaluate(() => localStorage.getItem('qinghe-reservation')));
    await page.locator('#reservation-success [data-close]').click();
    await page.locator('#full-menu').click();
    assert.equal(await page.locator('.dish-card').count(), 6);
    console.log('PASS: photos, menu filters, dish details, reservation, local storage, full menu');
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      console.log(`Layout ${width}px: content ${scrollWidth}px`);
      assert.ok(scrollWidth <= width, `Page overflows at ${width}px`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading]').forEach(image => image.loading = 'eager');
      await document.fonts.ready;
      await Promise.all([...document.images].filter(image => image.src).map(image => image.decode()));
    });
    await page.screenshot({ path: 'preview-mobile.png', fullPage: true });
    await page.locator('.nav-toggle').click();
    assert.ok(await page.locator('#mobile-nav').isVisible());
    await page.locator('#mobile-nav a[href="#menu"]').click();
    assert.ok(await page.locator('#mobile-nav').isHidden());
    assert.deepEqual(errors, []);
    console.log('PASS: mobile navigation, responsive layouts, no JavaScript errors');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
