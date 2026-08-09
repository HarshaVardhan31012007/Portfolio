# HarshaVardhan Reddy Kunam - React Personal Portfolio

A functional Single-Page Application (SPA) built with **React 18**, **Vite**, and **React Router DOM v6**. This project converts a static HTML/CSS portfolio into reusable components, stateful interactions, side-effect management, client-side routing, and prop drilling hierarchies.

---

## Table of Contents

- [Overview & Specifications](#overview--specifications)
- [Setup & Run Instructions](#setup--run-instructions)
- [Component Tree & Architecture](#component-tree--architecture)
- [State Management Decisions](#state-management-decisions)
- [Side Effects (`useEffect`) Documentation](#side-effects-useeffect-documentation)
- [Routing System](#routing-system)

---

## Overview & Specifications

This application fulfills all assignment specifications:
- **Reusable Functional Components**: `Navbar`, `Footer`, `ProjectList`, `ProjectCard`, `TechStackList`, `ContactForm`, `SkillsSection`, `LoadingSpinner`, `BackToTop`.
- **2-Level Deep Prop Drilling**: `Projects` Page $\rightarrow$ `ProjectList` (Child) $\rightarrow$ `ProjectCard` (Grandchild) $\rightarrow$ `TechStackList` (Great-Grandchild).
- **State Management (`useState`)**:
  1. Top-Level Theme State (`dark` / `light`) shared via props.
  2. Controlled Contact Form with input binding, validation errors, and disabled submit button.
  3. Component-scoped `isExpanded` state per `ProjectCard` instance ("View Details").
- **Side Effects (`useEffect`)**:
  1. Mount loading sequence simulation on `Home` page (`~1s` timer) with `clearTimeout` cleanup.
  2. Dark/Light Theme persistence in `localStorage` & DOM attribute synchronization.
  3. Window resize and scroll event listeners with mandatory `removeEventListener` cleanups.
- **Client-Side Routing (`react-router-dom`)**: `/`, `/about`, `/projects`, `/projects/:projectId`, `/contact`, and `*` (404 Not Found Catch-All).

---

## Setup & Run Instructions

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation & Execution Commands

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build Production Bundle**:
   ```bash
   npm run build
   ```
   Generates an optimized production build in `dist/` with **zero console errors**.

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## Component Tree & Architecture

```
App (Lifts Theme State, Router, Persists to LocalStorage)
├── Navbar (NavLink routes, Theme Toggle Button, Mobile Menu)
├── Main Content Container
│   ├── Routes
│   │   ├── Route "/" -> Home (Mount Loading effect, Hero, SkillsSection, Featured ProjectList)
│   │   ├── Route "/about" -> About (Education, Focus, Timeline Experience, Achievements)
│   │   ├── Route "/projects" -> Projects (Category Filters, ProjectList)
│   │   │   └── ProjectList [Child]
│   │   │       └── ProjectCard [Grandchild - Instance-scoped isExpanded state]
│   │   │           └── TechStackList [Great-Grandchild - Receives techStack prop]
│   │   ├── Route "/projects/:projectId" -> ProjectDetail (useParams dynamic route)
│   │   │   └── TechStackList
│   │   ├── Route "/contact" -> Contact (Contact Info, Controlled ContactForm)
│   │   └── Route "*" -> NotFound (404 Catch-All with Link back to Home)
├── Footer (Global Copyright & Socials)
└── BackToTop (Floating action with scroll cleanup)
```

---

## State Management Decisions

### 1. Lifted Theme State (`App.jsx`)
- **State**: `theme` (`'dark'` | `'light'`).
- **Lifting Rationale**: The theme state must be shared across the entire application—controlling overall CSS custom variables on `<body>` / `<html>` as well as the active icon state inside `Navbar.jsx`. Lifting state to `App.jsx` ensures seamless theme switching across all routed pages.

### 2. Controlled Contact Form (`ContactForm.jsx`)
- **States**:
  - `formData`: `{ name, email, message }` (Controlled value bindings).
  - `errors`: `{ name, email, message }` (Validation error messages).
  - `touched`: `{ name, email, message }` (Field blur tracking).
  - `isSubmitted`: `boolean` (Success feedback display).
- **Validation Logic**: Standard email regex, required non-empty string checks, and min length validations. The **Submit Button** remains disabled (`disabled={!isFormValid}`) until all required fields are valid.

### 3. Component-Scoped Expandable Details (`ProjectCard.jsx`)
- **State**: `isExpanded` (`boolean`).
- **Scoped Instance Rationale**: Toggling "View Quick Info" on one card expands details for *only that specific card instance* without affecting sibling project cards.

---

## Side Effects (`useEffect`) Documentation

| Location | `useEffect` Purpose | Dependency Array | Cleanup Function | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **`Home.jsx`** | Simulates a brief loading sequence (~1s delay) on component mount. | `[]` | `clearTimeout(timer)` | Prevents state updates on unmounted component if user navigates away before timeout finishes. |
| **`App.jsx`** | Persists theme preference to `localStorage` and updates `data-theme` attribute on root element. | `[theme]` | None needed (synchronous DOM edit) | Ensures theme selection is retained across page reloads and browser sessions. |
| **`Navbar.jsx`** | Listens for `window` resize events to auto-close mobile menu when expanding to desktop width. | `[mobileMenuOpen]` | `window.removeEventListener('resize', handleResize)` | Prevents event listener accumulation and memory leaks. |
| **`BackToTop.jsx`** | Listens for `window.scrollY` changes to show/hide the back-to-top button. | `[]` | `window.removeEventListener('scroll', handleScroll)` | Cleans up scroll event listener upon component unmount. |
| **`ContactForm.jsx`** | Performs field validation whenever `formData` state updates. | `[formData]` | None | Keeps error states synchronized with user input. |

---

## Routing System

Configured using `react-router-dom` v6:
- `<NavLink>` elements are used in `Navbar.jsx` with active class highlighting (`active` class styling).
- Dynamic route `/projects/:projectId` parses the parameter via `useParams()` to fetch corresponding project objects from `src/data/projects.js`.
- Catch-all `path="*"` renders `NotFound.jsx` with a button directing users back to Home.
