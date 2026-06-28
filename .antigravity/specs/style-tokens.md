# Style Specification: Design Guidelines & Theme Tokens

**Status:** [Active]

---

## 1. Implementation Files
* **Global Styles & CSS Variables:** [styles.css](file:///c:/Development/game-tracker/src/styles.css)

---

## 2. Core Style Tokens
The project defines the styling tokens for the cozy cream/amber aesthetic in [styles.css](file:///c:/Development/game-tracker/src/styles.css):

```css
:root {
  /* Fonts */
  --font-sans: 'Outfit', sans-serif;
  --font-serif: 'Lora', serif;

  /* Colors - Warm Cozy Cream & Amber */
  --color-bg-app: #fbf9f6;          /* Warm soft cream */
  --color-bg-card: #ffffff;         /* Pure white */
  --color-primary: #d97706;         /* Amber */
  --color-primary-hover: #b45309;   /* Darker amber */
  --color-primary-light: #fef3c7;   /* Soft amber tint */
  --color-text-main: #2d312e;       /* Deep warm grey/charcoal */
  --color-text-muted: #6b7280;      /* Muted grey */
  --color-border: #ebdcd0;          /* Soft warm border */
  --color-border-hover: #d9c3b0;    /* Focus border */
  --color-shadow: rgba(45, 49, 46, 0.05);

  /* Status Colors */
  --color-status-backlog: #6b7280;
  --color-status-playing: #3b82f6;
  --color-status-completed: #10b981;
  --color-status-abandoned: #ef4444;

  /* Status Light Colors for Tag Backgrounds */
  --color-status-backlog-light: #f3f4f6;
  --color-status-playing-light: #eff6ff;
  --color-status-completed-light: #ecfdf5;
  --color-status-abandoned-light: #fef2f2;

  /* Sizes & Borders */
  --radius-card: 16px;
  --radius-button: 12px;
  --radius-tag: 8px;
  --shadow-sm: 0 2px 8px var(--color-shadow);
  --shadow-md: 0 8px 24px var(--color-shadow), 0 2px 4px var(--color-shadow);
  
  /* Transitions */
  --transition-cozy: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```
