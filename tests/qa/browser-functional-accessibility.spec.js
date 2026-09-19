const { test, expect } = require('@playwright/test');

const ROUTES = [
  '/',
  '/categoria/kioscos',
  '/categoria/kioscos?zona=las-heras',
  '/comercio/kiosco-la-esquina',
  '/index.html',
  '/kioscos/',
  '/kioscos/nuovo-market',
  '/admin/'
];

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

test('Functional QA: public product modal and local order', async ({ page }) => {
  await page.goto('/comercio/kiosco-la-esquina', { waitUntil: 'networkidle' });
  await page.locator('.catalog-card').first().click();
  await expect(page.locator('.lead-modal')).toBeVisible();
  await page.getByRole('button', { name: /Agregar al pedido/i }).click();
  await expect(page.locator('.section-note')).toContainText('1 en pedido');
  const checkout = page.getByRole('link', { name: /Enviar pedido/i });
  await expect(checkout).toHaveAttribute('href', /wa\.me\/5492615551040/);
});

test('Functional QA: admin commerce navigation', async ({ page }) => {
  await page.goto('/admin/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Inicio' })).toBeVisible();
  await page.getByRole('button', { name: 'Productos' }).click();
  await expect(page.getByRole('heading', { name: 'Productos' })).toBeVisible();
  const selector = page.locator('.category-switch');
  await expect(selector).toBeVisible();
  await selector.selectOption('mendoza-motor');
  await expect(page.locator('.side-business')).toContainText('Mendoza Motor');
  await expect(page.getByRole('link', { name: /Ver sitio público/i })).toHaveAttribute('href', '/comercio/mendoza-motor');
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
