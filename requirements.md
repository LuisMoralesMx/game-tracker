# Product Requirements Document (PRD) - Cozy Game Tracker

## 1. Project Overview
The **Cozy Game Tracker** is a personal web-based application designed to help users catalog and track their gaming library. It offers a distraction-free, cozy, and high-typography experience to record gameplay status, play times, ratings, and thoughts about each game.

### Design & Aesthetic Goals
*   **Theme:** Warm light-mode aesthetic utilizing neutral tones (cream, beige, warm sands, soft amber).
*   **Visuals:** Card-based layouts emphasizing typography, whitespace, and clean structure.
*   **Typography:** Elegant, modern sans-serif or serif fonts (configured via web fonts).
*   **No Cover Art:** To maintain a clean, distraction-free text focus, the application will *not* support game cover images, relying instead on high-quality text layout and platform tags.
*   **Interactions:** Micro-interactions (smooth card hovers, elegant transitions between views) to make the experience feel premium and alive.

---

## 2. Technical Stack & Architecture

*   **Framework:** Angular (Latest version)
*   **Reactivity:** Angular Signals (using `signal`, `computed`, and `linkedSignal` for dynamic form/filter states).
*   **Forms:** Angular Forms (using signal-based forms if version >= 21, otherwise Template-driven/Reactive forms as appropriate).
*   **Routing:** Angular Router for true URL-based navigation:
    *   `/dashboard` — Home screen with stats and quick links.
    *   `/library` — Listing of all games with search/filter/sort.
    *   `/game/new` — Form to add a new game.
    *   `/game/:id` — Details view and edit form for an existing game.
*   **Styling:** Pure Vanilla CSS using CSS Custom Properties (variables) for theme tokens. Scoped component styling. No Tailwind CSS and no Angular Material to avoid unnecessary dependency overhead and ensure total control over layout and theme.
*   **Persistence:** Local browser `localStorage` to save and load games. Starts with a clean slate (no demo games).

---

## 3. Functional Requirements

### 3.1. Dashboard View (`/dashboard`)
*   **Metrics Cards:**
    *   **Total Games:** A count of all games in the database.
    *   **Completed Games:** A count of games marked with the status "Completed".
*   **Quick Actions:**
    *   Button/link to "Add New Game".
    *   Button/link to "View Library".

### 3.2. Library View (`/library`)
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

### 3.3. Add / Edit Game View (`/game/new` and `/game/:id`)
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

### 3.4. Local Data Service
*   Save the game list array as a JSON string under a consistent LocalStorage key.
*   Auto-increment ID generator for game entities.
*   Reactive state: The game library is managed inside an Angular service using signals, automatically saving to LocalStorage whenever the collection changes.

---

## 4. Design Guidelines & Theme Tokens (CSS)
A core `variables.css` will define the styling tokens for the cozy cream/amber aesthetic:

```css
:root {
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  
  /* Color Palette */
  --color-bg-app: #fbf9f6;       /* Warm soft cream */
  --color-bg-card: #ffffff;      /* Pure white for depth */
  --color-primary: #d97706;      /* Cozy amber */
  --color-primary-light: #fef3c7;/* Light amber background tint */
  --color-text-main: #374151;    /* Slate grey for high contrast readability */
  --color-text-muted: #6b7280;   /* Muted grey */
  --color-border: #e5e7eb;       /* Soft outline border */
  
  /* Status Colors */
  --color-status-backlog: #6b7280;
  --color-status-playing: #3b82f6;
  --color-status-completed: #10b981;
  --color-status-abandoned: #ef4444;
  
  /* Spacing & Borders */
  --radius-card: 12px;
  --radius-tag: 6px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  --transition-cozy: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 5. Verification Plan

*   **Build Verification:** Running `npx ng build` must complete with zero compiler errors.
*   **Accessibility Checks:** Use semantic HTML components (`<main>`, `<nav>`, `<section>`, `<article>`) and correct form labels to ensure high compatibility with assistive tools.
*   **Manual Testing Scenarios:**
    1.  Add a new game with all details filled. Ensure validation blocks submission if title is empty.
    2.  Transition a game's status from "Backlog" to "Playing" to "Completed", verify the Dashboard counters update reactively.
    3.  Enter search text in the Library view and verify results filter dynamically.
    4.  Verify that refreshing the browser retains the entered game list.
