const { test, expect } = require('@playwright/test');

const ROUTES = ['/index.html', '/kioscos/', '/kioscos/nuovo-market', '/admin/'];

for (const route of ROUTES) {
  test('Browser QA: ' + route, async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response.status()).toBe(200);
    expect(await page.locator('body').innerText()).toMatch(/\S/);
    expect(await page.locator('[data-nextjs-dialog], .vite-error-overlay').count()).toBe(0);
    expect(errors).toEqual([]);
  });
}

test('Functional QA: public order modal', async ({ page }) => {
  await page.goto('/kioscos/nuovo-market', { waitUntil: 'networkidle' });
  await page.locator('.ask').first().click();
  await expect(page.locator('#modal')).toHaveClass(/open/);
  await page.locator('#order-name').fill('QA');
  await page.locator('#order-phone').fill('2615551234');
  await page.locator('#confirm-order').click();
  await expect(page.locator('#toast')).toContainText('Pedido registrado');
});

test('Functional QA: admin login and product creation', async ({ page }) => {
  await page.goto('/admin/', { waitUntil: 'networkidle' });
  await page.locator('#login-pass').fill('admin' + '123');
  await page.locator('#login-btn').click();
  await expect(page.locator('#admin-app')).toHaveClass(/show/);
  await page.getByRole('button', { name: /Productos/i }).click();
  await page.locator('#prod-name').fill('QA Product');
  await page.locator('#prod-category').fill('QA');
  await page.locator('#prod-price').fill('999');
  await page.locator('#add-prod').click();
  await expect(page.locator('#products-list')).toContainText('QA Product');
});

test('Accessibility QA: images and form controls have accessible names', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route, { waitUntil: 'networkidle' });
    const unnamedImages = await page.locator('img').evaluateAll(imgs => imgs.filter(i => !i.getAttribute('alt')).length);
    const unnamedInputs = await page.locator('input, textarea, select, button').evaluateAll(els =>
      els.filter(e => !e.getAttribute('aria-label') && !e.getAttribute('title') && !e.textContent.trim() &&
        !(e.id && document.querySelector('label[for="' + e.id + '"]'))).length
    );
    expect(unnamedImages, 'Unnamed images on ' + route).toBe(0);
    expect(unnamedInputs, 'Unnamed controls on ' + route).toBe(0);
  }
});
