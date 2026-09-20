# Staging contract — SmartBarrio PMV

## Environment model

- **Production:** `main` → Vercel Production → `https://smartbarrio.vercel.app`
- **Staging:** every pull request → Vercel Preview Deployment for that branch/commit.
- **Local CI environment:** GitHub Actions builds the exact commit with Node 22.23.2 and the repository lockfile.

## Gate order

1. `npm ci`
2. `npm run build`
3. Browser + Functional + Accessibility QA
4. Lighthouse CI
5. CodeQL
6. Visual Regression as evidence for the **HUMAN GATE**

The visual job is intentionally non-blocking. It does not authorize a merge by itself.

## Stability rules

- Next.js is pinned to the patched 15.5.24 Maintenance LTS release.
- Node is pinned to 22.23.2 in CI.
- Playwright is pinned to 1.55.0 in CI instead of resolving an unbounded latest version.
- Browser CI runs with one worker and one retry to reduce resource contention and flaky failures.
- Outdated PR runs are cancelled through workflow concurrency.
- Lighthouse uses a deterministic curl readiness loop instead of installing `wait-on` dynamically.

## HUMAN GATE

The only manual gate remains visual/UI/UX validation on the Vercel Preview URL generated for the PR.

Do not merge because the automated visual job is green. Review the Preview visually first, then approve/merge according to repository branch protection rules.
