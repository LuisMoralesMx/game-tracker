# Feature Specification: Authentication & Authorization (Google SSO)

**Status:** Approved  
**Author:** Antigravity  
**Date Created:** 2026-06-29  
**Last Updated:** 2026-06-29  

---

## 1. Goal & Context
Implement a secure, cozy, single-page application authentication system using Google Single Sign-On (SSO) with Google Identity Services. This keeps user collections isolated, secures routes, and allows users to manage their game data personal libraries without guest data conflicts.

---

## 2. User Experience & Routing
* **Target Route(s):** `/login`
* **UX/Aesthetic Rules:**
  - Login Page: High-typography welcoming header ("🎮 Cozy Game Tracker"), soft warm sand/cream gradients, minimal clutter.
  - Sign-in Trigger: One-click "Sign in with Google" button with standard branding compliance and layout themes.
  - Signed-in Header: Top navigation displays a circular user profile avatar, user's first name, and a "Sign Out" button styled with micro-transitions (hover borders, smooth fading).
* **Access Rules / Guards:**
  - Mandatory Login: Unauthenticated sessions are dynamically restricted from viewing `/dashboard`, `/library`, and `/game/*` routes, redirecting automatically to `/login`.
  - Authenticated sessions are redirected *away* from `/login` to `/dashboard` if they attempt to access it.

---

## 3. Functional Requirements & Acceptance Criteria

### A. Google Client SDK Integration
- [ ] Load the client library `https://accounts.google.com/gsi/client` dynamically in the `AuthService` on bootstrap.
- [ ] Initialize the SDK with the developer's Client ID.

### B. User Session & Login flow
- [ ] Renders the standard Google SSO button in the login component.
- [ ] Parses Google's ID Token (JWT) credential response, decodes profile metadata (unique ID `sub`, email, name, avatar picture URL), and populates a reactive user profile signal.
- [ ] Stores session locally so reloading does not require re-authentication.

### C. Route Guard & Redirection
- [ ] Prevent accessing private dashboard/library pages for anonymous requests.
- [ ] **Acceptance Criteria**:
  - **Given** user is unauthenticated
  - **When** navigating to `/library` or `/dashboard`
  - **Then** the app redirects immediately to `/login`

- [ ] **Acceptance Criteria**:
  - **Given** user successfully signs in via Google SSO
  - **When** credentials are confirmed
  - **Then** the user is redirected to `/dashboard`

### D. Sign Out Flow
- [ ] Provide clear "Sign Out" option in the main app header.
- [ ] **Acceptance Criteria**:
  - **Given** user is signed in
  - **When** clicking "Sign Out"
  - **Then** clear the user signal, clear localStorage user tokens, and redirect to `/login`

---

## 4. Technical Implementation & Files
* **Component Logic:** [login.ts](file:///c:/Development/game-tracker/src/app/components/login/login.ts)
* **Component Template:** [login.html](file:///c:/Development/game-tracker/src/app/components/login/login.html)
* **Component Styles:** [login.css](file:///c:/Development/game-tracker/src/app/components/login/login.css)
* **Auth Service:** [auth.ts](file:///c:/Development/game-tracker/src/app/services/auth.ts)
* **Auth Guard:** [auth.guard.ts](file:///c:/Development/game-tracker/src/app/guards/auth.guard.ts)

---

## 5. Verification & Testing
* **Automated Tests:**
  - Verify auth service instantiation, sign-out functionality, and guard behavior:
    `ng test --include=src/app/services/auth.spec.ts`
* **Manual Verification Steps:**
  1. **Step 1**: Attempt to navigate directly to `/dashboard` when logged out -> **Expected**: App redirects to `/login`.
  2. **Step 2**: Click the Google login button, sign in with credentials -> **Expected**: App signs user in and navigates to `/dashboard`.
  3. **Step 3**: Refresh page -> **Expected**: Session persists, user stays logged in.
  4. **Step 4**: Click "Sign Out" in header -> **Expected**: Session cleared, redirects back to `/login`.
