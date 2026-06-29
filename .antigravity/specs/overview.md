# Cozy Game Tracker - Overview & Tech Stack

**Status:** [Active]

---

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
    *   `/login` — Welcome and Sign-In page.
    *   `/dashboard` — Home screen with stats and quick links (requires authentication).
    *   `/library` — Listing of all games with search/filter/sort (requires authentication).
    *   `/game/new` — Form to add a new game (requires authentication).
    *   `/game/:id` — Details view and edit form for an existing game (requires authentication).
*   **Authentication:** Google Single Sign-On (SSO) using Google Identity Services. Login is mandatory to access the application.
*   **Styling:** Pure Vanilla CSS using CSS Custom Properties (variables) for theme tokens. Scoped component styling. No Tailwind CSS and no Angular Material to avoid unnecessary dependency overhead and ensure total control over layout and theme.
*   **Persistence:** Local browser `localStorage` to save and load games. Keys are namespaced by the authenticated Google User ID to support multi-user lists on the same browser. Starts with a clean slate for new users.

