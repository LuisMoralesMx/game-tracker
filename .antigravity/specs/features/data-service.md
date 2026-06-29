# Service Specification: Local Data Service

**Status:** [Implemented]

---

## 1. Requirements
*   Save the game list array as a JSON string under a namespaced LocalStorage key unique to each authenticated user (e.g. `cozy-game-tracker-library_${userId}`).
*   UUID generator (`crypto.randomUUID()`) for game entities to ensure unique identifiers.
*   Reactive state: The game library is managed inside an Angular service using signals, automatically saving to the user's namespaced LocalStorage whenever the collection changes.
*   Session-aware: When a user logs in, load their corresponding library. When a user logs out, clear the active library signal state.


---

## 2. Technical Implementation & Files
*   **Service Logic:** [game.ts](file:///c:/Development/game-tracker/src/app/services/game.ts)

---

## 3. Verification & Testing
*   **Automated Tests:**
    *   Unit Tests: [game.spec.ts](file:///c:/Development/game-tracker/src/app/services/game.spec.ts)
    *   Run command: `npx ng test --include=src/app/services/*.spec.ts`
*   **Manual Verification Steps:**
    1.  **Step 1**: Open the app, complete Google SSO sign-in, and add a few games to the library.
    2.  **Step 2**: Reload/refresh the browser page. The user session should persist, and the games should load successfully from user-specific local storage.
    3.  **Step 3**: Sign out, then sign back in using a different Google account.
    4.  **Expected**: The library should load as a clean slate (empty list, or distinct list of the second user).
    5.  **Step 4**: Sign out, and sign back in using the first Google account.
    6.  **Expected**: The original library games for the first user should be loaded and displayed correctly.

