# Quality Assurance: Verification & Test Plan

**Status:** [Active]

This plan outlines the global validation processes, automated testing, and accessibility guidelines for the Cozy Game Tracker application. Feature-specific functional tests are documented within their respective specifications.

---

## 1. Automated Testing Execution
To run all unit and integration tests across components and services, execute the following command in the terminal:
```bash
npx ng test
```

For feature-specific tests:
* **Dashboard Component Tests:** [dashboard.spec.ts](file:///c:/Development/game-tracker/src/app/components/dashboard/dashboard.spec.ts)
* **Library Component Tests:** [library.spec.ts](file:///c:/Development/game-tracker/src/app/components/library/library.spec.ts)
* **Game Form Component Tests:** [game-form.spec.ts](file:///c:/Development/game-tracker/src/app/components/game-form/game-form.spec.ts)
* **Local Data Service Tests:** [game.spec.ts](file:///c:/Development/game-tracker/src/app/services/game.spec.ts)

---

## 2. Build & Compilation Verification
* **Build Verification Command:**
  ```bash
  npx ng build
  ```
* **Criterion:** The build must succeed with zero TypeScript compilation errors or linter warnings.

---

## 3. Accessibility & Usability (WCAG Compliance)
* **HTML Semantics:**
  - Utilize structural semantic tags (`<main>`, `<nav>`, `<header>`, `<section>`, `<article>`) instead of generic nested `<div>`s.
  - Implement form groups with explicit `<label>` associations via `for`/`id` matching.
* **AXE Validation:**
  - Run lighthouse or automated AXE accessibility audits.
  - **Criterion:** It must pass all AXE checks and achieve WCAG AA compatibility (focus rings, contrast ratios, and screen-reader navigable layout).

---

## 4. Feature-Specific Testing Scenarios
Refer to each individual specification for detailed step-by-step user acceptance criteria and manual validation routes:
* **Dashboard View Verification:** [dashboard.md](file:///c:/Development/game-tracker/.antigravity/specs/features/dashboard.md#4-verification--testing)
* **Library View Verification:** [library.md](file:///c:/Development/game-tracker/.antigravity/specs/features/library.md#4-verification--testing)
* **Add/Edit Game Form Verification:** [game-form.md](file:///c:/Development/game-tracker/.antigravity/specs/features/game-form.md#4-verification--testing)
* **Local Data Service Verification:** [data-service.md](file:///c:/Development/game-tracker/.antigravity/specs/features/data-service.md#3-verification--testing)
