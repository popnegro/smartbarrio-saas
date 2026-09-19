const { test, expect } = require('@playwright/test');

const ROUTES = ['/index.html', '/kioscos/', '/kioscos/nuovo-market', '/admin/'];

for (const route of ROUTES) {
  test('Staging smoke: ' + route, async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    expect(await page.locator('body').innerText()).toMatch(/\S/);
    expect(errors).toEqual([]);
  });
}

test('Staging smoke: public order CTA opens', async ({ page }) => {
  await page.goto('/kioscos/nuovo-market', { waitUntil: 'domcontentloaded' });
  const cta = page.locator('.ask').first();
  await expect(cta).toBeVisible();
  await cta.click();
  await expect(page.locator('#modal')).toHaveClass(/open/);
});

test('Staging smoke: admin login surface is available', async ({ page }) => {
  await page.goto('/admin/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#login-pass')).toBeVisible();
  await expect(page.locator('#login-btn')).toBeVisible();
});
