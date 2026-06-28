# Feature Specification: Library View

**Status:** [Implemented]

---

## 1. Route
`/library` (Listing of all games with search/filter/sort)

---

## 2. Requirements
*   **Game List/Grid:** Displays all tracked games using text-based cards.
    *   Each card highlights: Title, Platform, Status Tag, Rating, Play Time, and Date last updated.
*   **Search:** Text input that filters games by title (case-insensitive).
*   **Filters:**
    *   **Status Filter:** Backlog, Playing, Completed, Abandoned, or "All".
    *   **Platform Filter:** Dropdown/filter list dynamically built from the platforms present in the library, or select "All".
*   **Sorting:**
    *   Sort by Title (A-Z, Z-A).
    *   Sort by Rating (highest to lowest).
    *   Sort by Play Time (most hours to least).
    *   Sort by Date Added / Updated.

---

## 3. Technical Implementation & Files
*   **Component Logic:** [library.ts](file:///c:/Development/game-tracker/src/app/components/library/library.ts)
*   **Component Template:** [library.html](file:///c:/Development/game-tracker/src/app/components/library/library.html)
*   **Component Styles:** [library.css](file:///c:/Development/game-tracker/src/app/components/library/library.css)
*   **Service Dependency:** [game.ts](file:///c:/Development/game-tracker/src/app/services/game.ts)

---

## 4. Verification & Testing
*   **Automated Tests:**
    *   Unit Tests: [library.spec.ts](file:///c:/Development/game-tracker/src/app/components/library/library.spec.ts)
    *   Run command: `npx ng test --include=src/app/components/library/*.spec.ts`
*   **Manual Verification Steps:**
    1.  **Step 1**: Enter a search query in the search input.
    2.  **Expected**: The list should dynamically filter games in real-time by checking if the title contains the query (case-insensitive).
    3.  **Step 2**: Select a status filter or platform filter.
    4.  **Expected**: Games matching both filters should be displayed.
    5.  **Step 3**: Change the sorting dropdown.
    6.  **Expected**: The games list should instantly reorder according to the selected field/direction.
