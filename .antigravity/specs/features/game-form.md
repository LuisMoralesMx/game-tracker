# Feature Specification: Add / Edit Game View

**Status:** [Implemented]

---

## 1. Routes
*   `/game/new` (Form to add a new game)
*   `/game/:id` (Details view and edit form for an existing game)

---

## 2. Requirements
*   **Metadata Fields:**
    *   `Title` (text, required)
    *   `Platform` (text/dropdown selection: e.g., PC, Nintendo Switch, PlayStation 5, Xbox Series X/S, Retro, Mobile)
    *   `Status` (select: Backlog, Playing, Completed, Abandoned)
    *   `Play Time` (number, in hours, default to 0)
    *   `Personal Rating` (1 to 10 scale or 5-star scale)
    *   `Start Date` (date, optional)
    *   `Completion Date` (date, optional, visible/relevant when Status is Completed)
    *   `Review/Notes` (textarea, optional)
*   **Actions:**
    *   "Save" (persists to local storage and routes back to `/library`).
    *   "Cancel" (routes back to previous view without saving).
    *   "Delete" (only for existing games; asks for confirmation, removes game, and routes back to `/library`).

---

## 3. Technical Implementation & Files
*   **Component Logic:** [game-form.ts](file:///c:/Development/game-tracker/src/app/components/game-form/game-form.ts)
*   **Component Template:** [game-form.html](file:///c:/Development/game-tracker/src/app/components/game-form/game-form.html)
*   **Component Styles:** [game-form.css](file:///c:/Development/game-tracker/src/app/components/game-form/game-form.css)
*   **Service Dependency:** [game.ts](file:///c:/Development/game-tracker/src/app/services/game.ts)

---

## 4. Verification & Testing
*   **Automated Tests:**
    *   Unit Tests: [game-form.spec.ts](file:///c:/Development/game-tracker/src/app/components/game-form/game-form.spec.ts)
    *   Run command: `npx ng test --include=src/app/components/game-form/*.spec.ts`
*   **Manual Verification Steps:**
    1.  **Step 1**: Open `/game/new`, leave the title empty, and click "Save Journal Entry".
    2.  **Expected**: Form validation should block submission and show an error message: "Please enter the game's title."
    3.  **Step 2**: Enter all details (Title, Platform, Playing status, rating, etc.) and save.
    4.  **Expected**: The app should route back to `/library`, and the new game should be listed in the cards.
    5.  **Step 3**: Edit the game (open `/game/:id`), modify a field (e.g., set status to Completed and add a completion date), and save.
    6.  **Expected**: The updated values are saved and correctly displayed in the library view.
    7.  **Step 4**: Open `/game/:id`, click "Delete Game", and confirm.
    8.  **Expected**: The game should be deleted, the app routes back to `/library`, and the card is no longer present.
