const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ROUTES = ['/index.html', '/kioscos/', '/kioscos/nuovo-market', '/admin/'];
const PRODUCTION = process.env.VISUAL_BASELINE_URL || 'https://smartbarrio.vercel.app';
const SNAPSHOT_DIR = path.join(process.cwd(), 'test-results', 'visual-baseline');

test.describe('Visual regression · production baseline', () => {
  for (const route of ROUTES) {
    test('UI comparison ' + route, async ({ browser }) => {
      fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
      const name = route.replace(/[^a-z0-9]+/gi, '_') || 'home';
      const baseline = path.join(SNAPSHOT_DIR, name + '-baseline.png');
      const expected = path.join(process.cwd(), 'tests', 'qa', '__snapshots__', 'production', name + '.png');
      fs.mkdirSync(path.dirname(expected), { recursive: true });

      const production = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
      await production.goto(PRODUCTION + route, { waitUntil: 'networkidle' });
      await production.screenshot({ path: baseline, fullPage: true });
      await production.close();

      fs.copyFileSync(baseline, expected);

      const current = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
      await current.goto(route, { waitUntil: 'networkidle' });
      const image = await current.screenshot({ fullPage: true });
      await current.close();

      await expect(image).toMatchSnapshot('production/' + name + '.png', {
        threshold: 0.15,
        maxDiffPixelRatio: 0.02
      });
    });
  }
});
