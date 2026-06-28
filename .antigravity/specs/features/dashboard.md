# Feature Specification: Dashboard View

**Status:** [Implemented]

---

## 1. Route
`/dashboard` (Home screen)

---

## 2. Requirements
*   **Metrics Cards:**
    *   **Total Games:** A count of all games in the database.
    *   **Completed Games:** A count of games marked with the status "Completed".
*   **Quick Actions:**
    *   Button/link to "Add New Game".
    *   Button/link to "View Library".

---

## 3. Technical Implementation & Files
*   **Component Logic:** [dashboard.ts](file:///c:/Development/game-tracker/src/app/components/dashboard/dashboard.ts)
*   **Component Template:** [dashboard.html](file:///c:/Development/game-tracker/src/app/components/dashboard/dashboard.html)
*   **Component Styles:** [dashboard.css](file:///c:/Development/game-tracker/src/app/components/dashboard/dashboard.css)
*   **Service Dependency:** [game.ts](file:///c:/Development/game-tracker/src/app/services/game.ts)

---

## 4. Verification & Testing
*   **Automated Tests:**
    *   Unit Tests: [dashboard.spec.ts](file:///c:/Development/game-tracker/src/app/components/dashboard/dashboard.spec.ts)
    *   Run command: `npx ng test --include=src/app/components/dashboard/*.spec.ts`
*   **Manual Verification Steps:**
    1.  **Step 1**: Log a new game and transition its status from "Backlog" to "Playing" to "Completed".
    2.  **Expected**: Verify the Dashboard "Total Games" and "Completed Games" counters update reactively based on the changes.
