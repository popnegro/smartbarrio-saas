# Staging and Preproduction contract

## Staging

Every pull request targeting `main` gets a Vercel Preview plus the fast **Staging Smoke QA** workflow.

Staging checks only:
- deterministic `npm ci`
- production build
- four critical routes
- basic JavaScript error detection
- public order CTA
- admin login surface

Staging intentionally does **not** run CodeQL, full Lighthouse, full accessibility, or visual regression.

## HUMAN GATE

After Staging Smoke PASS, the Vercel Preview is reviewed manually for **UI/UX only**.

The HUMAN GATE is not a code, security, accessibility, or performance approval.

## Preproduction

After the HUMAN GATE, the candidate is promoted to the `preproduction` branch.

A push to `preproduction` runs:
- full Browser / Functional / Accessibility QA
- Visual Regression
- Lighthouse
- CodeQL

The four preproduction checks must pass before promotion to `main`.

## Production

`main` remains the production branch.

No second staging server is required. Vercel Preview is the dynamic staging environment; `preproduction` is the release-candidate branch.
