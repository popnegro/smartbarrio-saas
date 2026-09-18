const { test, expect } = require('@playwright/test');
test('smoke', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page.locator('body')).not.toHaveText('');
});
