# Project Tree: APS Website Frontend

## 1. High-Level Overview

This document outlines the structure and interactions within the APS Website Frontend project. It is a Vue.js single-page application (SPA) built with Vite, utilizing Pinia for state management, Vue Router for navigation, TailwindCSS for styling, and Firebase for certain backend functionalities. It also interacts with a custom backend API via Axios.

## 2. Core Technologies & Libraries

*   **Vue.js 3:** The core JavaScript framework for building the user interface (Composition API is used).
*   **Vite:** Frontend tooling for development and building the project.
*   **Vue Router:** Handles client-side routing and navigation.
*   **Pinia:** Manages global application state (e.g., user authentication, UI display flags).
*   **Axios:** Used for making HTTP requests to the backend API.
*   **TailwindCSS:** A utility-first CSS framework for styling.
*   **Firebase:** Used for specific backend services (details in `firebase.js`).
*   **Vue Toastification:** For displaying toast notifications.
*   **Unhead/vue:** For managing document head metadata.

## 3. Directory Structure

```
aps-website-frontend/
├── .git/               # Git version control
├── .vscode/            # VS Code editor settings
├── node_modules/       # Project dependencies
├── public/             # Static assets served directly
│   └── ...             # (e.g., favicon.ico, images)
├── src/                # Main application source code
│   ├── assets/         # Static assets processed by Vite (CSS, images, fonts)
│   │   └── index.css   # Main global stylesheet
│   ├── components/     # Reusable Vue components
│   │   ├── Navigation.vue
│   │   ├── Footer.vue
│   │   ├── HeroCarousel.vue
│   │   ├── DashBoardCards.vue
│   │   ├── McqQuestions.vue
│   │   └── ... (Many other UI components)
│   ├── config/         # Configuration files
│   │   └── axios.js    # Axios instance configuration
│   ├── courses/        # (Purpose to be clarified - likely course-related data or modules)
│   ├── data/           # (Purpose to be clarified - likely local data files or modules)
│   ├── router/         # Routing configuration
│   │   └── index.js    # Vue Router setup and route definitions
│   ├── stores/         # Pinia state management stores
│   │   └── UserStore.js # Manages user state and UI flags
│   ├── utils/          # Utility functions
│   │   └── ...
│   ├── views/          # Page-level Vue components (mapped to routes)
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Dashboard.vue
│   │   ├── Profile.vue
│   │   ├── Gallery.vue
│   │   ├── Questions.vue
│   │   └── ... (Many other view components)
│   ├── App.vue         # Root Vue component
│   ├── firebase.js     # Firebase initialization
│   └── main.js         # Application entry point (Vue app initialization)
├── .cursorignore       # Cursor AI ignore file
├── .gitignore          # Files and directories ignored by Git
├── index.html          # Main HTML file (entry point for Vite)
├── jsconfig.json       # JavaScript configuration (e.g., path aliases)
├── package-lock.json   # Exact dependency versions (if npm is used)
├── package.json        # Project metadata and dependencies
├── postcss.config.js   # PostCSS configuration (used by TailwindCSS)
├── pnpm-lock.yaml      # Exact dependency versions (if pnpm is used)
├── pnpm-workspace.yaml # PNPM workspace configuration
├── README.md           # Project README
├── tailwind.config.js  # TailwindCSS configuration
├── vercel.json         # Vercel deployment configuration
└── vite.config.js      # Vite build tool configuration
```

### Key Directory Explanations:

*   **`public/`**: Static assets that are copied directly to the build output directory without processing by Vite. Suitable for assets like `favicon.ico` or images that don't need optimization or hashing.
*   **`src/`**: Contains all the core application logic and components.
    *   **`src/assets/`**: Stores assets like CSS, images, and fonts that are imported into components or JavaScript files. These are processed by Vite during the build (e.g., CSS minification, image optimization). `index.css` here likely contains global styles or Tailwind base/component styles.
    *   **`src/components/`**: Houses reusable Vue components that make up parts of views or other components (e.g., navigation bars, buttons, cards).
    *   **`src/config/`**: Contains application-level configuration files. `axios.js` configures the base URL and default headers for API calls.
    *   **`src/router/`**: Defines the application's navigation structure. `index.js` maps URL paths to specific view components and can include navigation guards for authentication or other pre-navigation logic.
    *   **`src/stores/`**: Holds Pinia store modules for managing global application state. `UserStore.js` is a key store for user authentication data and UI state like header/footer visibility.
    *   **`src/views/`**: Contains page-level components. Each view typically corresponds to a specific route in the application (e.g., a home page, a profile page).

## 4. Application Flow & Key Interactions

### a. Initialization (`src/main.js`)

1.  The Vue 3 application is created using `createApp(App)`.
2.  **Vue Router (`./router`)** is installed for client-side navigation.
3.  **Pinia (`createPinia()`)** is installed for state management.
4.  **Firebase (`db` from `./firebase`)** is initialized and provided to the application, making the `db` instance available for injection into components.
5.  **Vue Toastification** is configured with default options for displaying notifications.
6.  **Unhead/vue (`createHead()`)** is installed for managing document head tags (title, meta, etc.).
7.  Global CSS (`./assets/index.css`) and Vue Toastification CSS are imported.
8.  The root Vue component (`App.vue`) is mounted to the `#app` element in `index.html`.

### b. Root Component (`src/App.vue`)

*   Serves as the main layout template.
*   Includes `<NavigationMenu>` and `<FooterMenu>` components (from `src/components/`).
    *   Their visibility is controlled by `displayHeader` and `displayFooter` reactive properties, which are computed values derived from the `UserStore`.
*   Uses `<router-view />` to render the component corresponding to the current route.
*   On mount (`onMounted` hook), it checks for a `studentToken` in `localStorage`.
    *   If a token exists, it makes an API call to `/auth/access` (using the configured `apiClient` from `src/config/axios.js`) to check if the student needs to be forcibly logged out.
    *   If `forceLogout` is true in the API response, or if the API call fails with a non-200 status, the `logout` action from `UserStore` is dispatched.

### c. Routing (`src/router/index.js`)

*   Uses `createRouter` and `createWebHistory` from `vue-router`.
*   Imports all view components from `src/views/`.
*   Defines an array of `routes`, each with:
    *   `path`: The URL path.
    *   `name`: A unique name for the route.
    *   `component`: The Vue component to render for that path.
    *   `props: true` (on some routes): Allows route params to be passed as props to the component.
    *   `meta: { requiresAuth: true }` (on some routes): A meta field used for route protection.
    *   `beforeEnter` navigation guards: These functions are executed before entering a route.
        *   They often interact with `useUserStore()` to:
            *   Update header/footer visibility (`store.updateFooterVisibility()`, `store.updateHeaderVisibility()`).
            *   Potentially redirect unauthenticated users based on `meta.requiresAuth` and the user's authentication status in the store.
*   An `axios` interceptor is set up to handle authentication:
    *   It checks if a route `requiresAuth`.
    *   If it does, it retrieves the `studentToken` from `localStorage`.
    *   If no token is found, it redirects to the `/login` page.
    *   If a token exists, it makes an API call to `/auth/verify-student-token` to validate the token.
        *   If validation fails (e.g., token expired, invalid), it clears `localStorage` and redirects to `/login`.
        *   If validation is successful, it proceeds to the requested route.
    *   It also handles API error responses, specifically 401 (Unauthorized), by logging the user out and redirecting to `/login`.

### d. State Management (`src/stores/UserStore.js`)

*   Defined using `defineStore` from Pinia.
*   **State:**
    *   `user`: Stores the authenticated user object (or `null`). Initialized from `localStorage`.
    *   `displayFooter`: A `ref(true)` boolean controlling footer visibility.
    *   `displayHeader`: A `ref(true)` boolean controlling header visibility.
*   **Actions:**
    *   `login(data)`: Saves user data to `localStorage` and updates the `user` state.
    *   `logout()`: Clears `localStorage` and resets the `user` state to `null`.
    *   `save(data)`: Updates user data in `localStorage` and the `user` state.
    *   `updateProfilePicture(profilePicture)`: Updates the user's profile picture in the state and `localStorage`.
    *   `updateFooterVisibility(value)`: Updates the `displayFooter` state.
    *   `updateHeaderVisibility(value)`: Updates the `displayHeader` state.
*   The store's state and actions are made available throughout the application via `useUserStore()`.

### e. API Interaction

*   **Axios Setup (`src/config/axios.js`):**
    *   An `apiClient` instance is created with a `baseURL` from the `VITE_API_BASE_URL` environment variable.
    *   Default `Content-Type` header is set to `application/json`.
*   **Firebase Setup (`src/firebase.js`):**
    *   Initializes Firebase using configuration likely from environment variables (common practice).
    *   Exports the Firebase `db` (Firestore database) instance, which is then provided globally in `main.js`.
*   **Usage:**
    *   Components and services import `apiClient` to make requests to the backend API (e.g., `App.vue` for `/auth/access`).
    *   Firebase `db` can be injected and used by components needing direct Firebase interaction.

## 5. Component Interaction Example

A typical flow might be:

1.  User navigates to a route (e.g., `/dashboard`).
2.  **Vue Router** matches the path to the `Dashboard.vue` view.
3.  The `beforeEnter` guard in `router/index.js` for `/dashboard` might:
    *   Check `meta.requiresAuth`.
    *   Verify authentication status using `UserStore` and potentially an API call via the Axios interceptor.
    *   Set `displayHeader` to `true` and `displayFooter` to `false` via `UserStore` actions.
4.  **`App.vue`** (root component) conditionally renders `<NavigationMenu>` based on `displayHeader` from `UserStore`.
5.  **`Dashboard.vue`** is rendered in `<router-view>`.
6.  `Dashboard.vue` might:
    *   Fetch data using the `apiClient` or Firebase `db`.
    *   Use components from `src/components/` (e.g., `DashBoardCards.vue`, `DashBoardSideMenu.vue`) to display information.
    *   Dispatch actions to `UserStore` or other stores if user interactions change global state.

## 6. Data Flow (Conceptual)

```
External Sources          Application Layer             UI Layer
------------------        -----------------------       -----------------
Backend API --(Axios)-->  Pinia Stores (UserStore)  --> Vue Components & Views
Firebase DB ------------>  (State & Actions)         (Read State, Dispatch Actions)
LocalStorage ----------->                                ↑
                                                         |
User Interactions ---------------------------------------+
```

*   Data from the backend API or Firebase is fetched (often on component mount or due to user actions).
*   This data can be stored in Pinia stores for global access and reactivity.
*   Vue components subscribe to state changes in Pinia stores and re-render when data updates.
*   User interactions in components can trigger actions in Pinia stores, which might lead to API calls or updates to local state.
*   `localStorage` is used by `UserStore` for persisting user session data.

## 7. Build & Deployment

*   **Build Tool:** Vite is used for development and creating optimized production builds (configured in `vite.config.js`).
*   **Deployment:** The `vercel.json` file indicates that the project is likely deployed on Vercel.

## 8. Notes on Potentially Unexplored Areas

*   The specific contents and roles of `src/utils/`, `src/data/`, and `src/courses/` directories have not been detailed and would require further inspection for a complete understanding.
*   The exact nature of Firebase usage (e.g., Firestore, Authentication, Storage) is broadly defined by `firebase.js` providing `db`, but specific interactions would be within components/services that use it.

This document should provide a solid understanding of the project's architecture and how its different parts collaborate. 