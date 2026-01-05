# Veralogix Smart Mining HUB: Technical Report

**Version**: 1.0
**Date**: October 26, 2023
**Prepared by**: Gemini, AI Assistant

---

## 1. Full Feature Inventory

This section details all implemented features within the application.

### 1.1. Core Application

*   **Login & Role Selection**:
    *   **Description**: A role-based login portal allowing users to select their view (Operator, Supervisor, Executive, Admin) before authenticating.
    *   **Files**: `src/app/login/page.tsx`

*   **Main Dashboard (Smart Hub)**:
    *   **Description**: The central landing page providing a high-level overview of all operational modules through a grid of widgets and AI-driven insights.
    *   **Files**: `src/app/(dashboard)/hub/page.tsx`, `src/app/(dashboard)/hub/components/*`

*   **Natural Language Query**:
    *   **Description**: An AI-powered search bar in the main header that allows users to type queries in natural language to navigate to the relevant module.
    *   **Files**: `src/components/global/natural-language-query.tsx`, `src/ai/flows/natural-language-query.ts`

### 1.2. Operational Modules & Features

| Feature/Module | Description | Key Files & Modules |
| :--- | :--- | :--- |
| **Smart Hub Details** | Detailed view of operational metrics, queues, and sensor status for the Hub. | `src/app/(dashboard)/smarthub/page.tsx` |
| **Smart Operations** | Monitors plant performance, drill & blast operations, and stockpile management. | `src/app/(dashboard)/plant/page.tsx`, `src/firebase/firestore/use-collection.tsx` |
| **Smart Transport** | Real-time vehicle loading, tracking, and quality control with AI insights. | `src/app/(dashboard)/fleet/page.tsx` |
| **Load Passports** | Complete, auditable lifecycle tracking for every haulage load. | `src/app/(dashboard)/load-passports/page.tsx`, `src/app/(dashboard)/load-passports/[passportId]/page.tsx` |
| **Smart Risk** | Monitors proximity detection, operator fatigue, and incident data. | `src/app/(dashboard)/safety/page.tsx` |
| **Smart People** | Manages regulatory and internal compliance, training, and personnel access. | `src/app/(dashboard)/compliance/page.tsx` |
| **Smart Management** | Executive-level dashboards summarizing site performance against strategic goals. | `src/app/(dashboard)/executive/page.tsx` |
| **Smart Geotech** | Manages haul road and bench quality using high-precision survey data. | `src/app/(dashboard)/earthworks/page.tsx` |
| **Smart Survey** | Manages drone flights, stockpile surveys, and perimeter security patrols. | `src/app/(dashboard)/drones/page.tsx` |
| **Smart Control** | Supervisor-centric view for real-time fleet and process optimization. | `src/app/(dashboard)/supervisor/page.tsx` |
| **Smart Network** | Monitors the health and status of on-site network infrastructure. | `src/app/(dashboard)/network/page.tsx` |
| **Smart Scenarios** | A digital twin interface to simulate the impact of operational changes. | `src/app/(dashboard)/twin/page.tsx` |
| **Sensor Stack** | A matrix view of all installed sensors across mobile fleet and plant equipment. | `src/app/(dashboard)/sensors/page.tsx` |
| **Smart Energy** | Monitors and optimizes energy consumption across all sites. | `src/app/(dashboard)/energy/page.tsx` |
| **Smart Environmental**| Tracks emissions, water quality, and dust compliance. | `src/app/(dashboard)/environmental/page.tsx` |
| **Smart Predictive** | Displays outputs from AI-driven forecasting and predictive maintenance models. | `src/app/(dashboard)/predictive/page.tsx` |
| **Smart Supply Chain**| Manages inventory, logistics, and critical spares. | `src/app/(dashboard)/supply-chain/page.tsx` |
| **Operator Cockpit** | A personalized dashboard for machine operators showing their KPIs and alerts. | `src/app/(dashboard)/operator/page.tsx` |
| **Report Packs** | A module for generating and viewing templated operational reports. | `src/app/(dashboard)/reports/page.tsx` |
| **Alerts & Tasks** | Centralized views for all system-generated alerts and actionable tasks. | `src/app/(dashboard)/alerts/page.tsx`, `src/app/(dashboard)/tasks/page.tsx` |

### 1.3. AI & Experimental Features

*   **Shift Handover Assistant**: Generates a summary of the previous shift's critical events. (`src/ai/flows/shift-handover-report.ts`)
*   **AI Insights & Recommendations**: Various cards across the UI provide AI-generated predictions and suggestions (e.g., fuel forecast, rework priority). These are marked with an "AI" badge.
*   **Server Actions**: Experimental Next.js feature used for handling form submissions and mutations. (`next.config.ts`)

---

## 2. Source Code Structure

```
/
├── public/                 # Static assets (images, fonts, logos)
├── scripts/                # Node.js scripts for database seeding and maintenance
│   ├── name-blacklist.json # Terms disallowed in the codebase
│   ├── name-scan.ts        # Scans for blacklisted terms
│   └── seed-demo-data.ts   # Populates Firestore with demo data
├── src/
│   ├── ai/                 # Genkit AI flows and configuration
│   │   ├── flows/          # Individual AI flow definitions
│   │   └── genkit.ts       # Genkit global initialization
│   ├── app/                # Next.js App Router (pages and layouts)
│   │   ├── (dashboard)/    # Main application layout with sidebar
│   │   └── login/          # Login page
│   ├── components/         # Shared React components
│   │   ├── global/         # App-wide components (header, sidebar)
│   │   ├── shared/         # Reusable components for modules (KPI tiles, tables)
│   │   └── ui/             # ShadCN UI component library
│   ├── firebase/           # Firebase configuration and hooks
│   │   ├── auth/           # Authentication-related hooks
│   │   ├── firestore/      # Firestore-related hooks
│   │   ├── config.ts       # Firebase project configuration
│   │   ├── index.ts        # Barrel file for exporting Firebase utilities
│   │   └── provider.tsx    # React Context provider for Firebase services
│   ├── hooks/              # General-purpose custom React hooks
│   └── lib/                # Core application logic, utilities, and type definitions
├── .env                    # Environment variables (placeholder)
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## 3. Key Files and Their Roles

*   **`next.config.ts`**: Configures the Next.js framework. It enables experimental features like `serverActions` and sets up allowed origins for API requests.
*   **`src/app/layout.tsx`**: The root layout for the entire application. It sets up the main HTML structure, including dark mode support and the global `Toaster` for notifications.
*   **`src/app/(dashboard)/layout.tsx`**: The primary layout for the authenticated part of the app. It renders the main sidebar, header, and content area for all dashboard pages.
*   **`src/lib/service-catalog.ts`**: A critical configuration file that defines all available modules (services) in the application, including their titles, icons, KPIs, and role-based access control. It acts as a single source of truth for the app's navigation and feature set.
*   **`src/firebase/index.ts`**: The main entry point for all Firebase-related functionality. It initializes the Firebase app and exports all necessary hooks (`useUser`, `useCollection`, `useDoc`) and providers.
    ```typescript
    // Example: Firebase Initialization
    export function initializeFirebase(options: FirebaseOptions = firebaseConfig) {
      if (getApps().length > 0) {
        return {
          firebaseApp: getApp(),
          firestore: getFirestore(),
          auth: getAuth(),
        };
      }
      const firebaseApp = initializeApp(options);
      // ... emulator connections
      return { firebaseApp, auth, firestore };
    }
    ```
*   **`src/ai/genkit.ts`**: Initializes the global Genkit `ai` object, configuring it with the `googleAI` plugin and setting a default model.
    ```typescript
    import {genkit} from 'genkit';
    import {googleAI} from '@genkit-ai/google-genai';

    export const ai = genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    });
    ```
*   **`scripts/seed-demo-data.ts`**: A utility script using `firebase-admin` to populate the Firestore database with realistic, tenant-specific demo data. This is essential for development and testing.

---

## 4. Architecture Diagram & Explanation

The application follows a modern, server-centric web architecture built on Next.js.

*   **Frontend**: A Next.js 15 application using the App Router. Components are primarily React Server Components (RSC) for performance, with Client Components (`'use client'`) used for interactivity and hooks.
*   **Backend (API Layer)**: The backend is composed of two parts:
    1.  **Next.js Server Actions**: Used for form submissions and data mutations directly from React components without needing separate API routes.
    2.  **Genkit Flows**: Server-side functions defined in `src/ai/flows/` that orchestrate calls to the Gemini LLM for AI-powered features. These are exposed to the frontend as standard async functions.
*   **Database**: Google Firestore is the primary NoSQL database, used for storing all operational data.
*   **Authentication**: Firebase Authentication manages user identity. The current implementation uses anonymous authentication for demonstration purposes.

### Data Flow Diagram (Simplified)

```
        Browser (React Components)
               |
(User Interaction: Click, Form Submit)
               |
+--------------+------------------------------------+
|                                                   |
| Next.js Client Component ('use client')           | Genkit Flow (e.g., naturalLanguageQuery)
| - Calls Firestore hooks (useCollection)           | - Calls Gemini API
| - Calls Server Action (e.g., addDoc)              | - Returns result to component
|                                                   |
+--------------+------------------------------------+
               |                                    |
     (Real-time updates)                            |
               |                                    |
      +--------v--------+                  +--------v--------+
      | Firebase Auth   |                  | Google AI       |
      | & Firestore     |                  | (Gemini)        |
      +-----------------+                  +-----------------+

```

---

## 5. Programming Languages & Frameworks

| Technology | Version | Usage |
| :--- | :--- | :--- |
| **TypeScript** | `~5` | Primary language for the entire codebase. |
| **Next.js** | `15.6.0-canary.60` | Full-stack web framework (App Router). |
| **React** | `19.0.0-rc`| Frontend UI library. |
| **Tailwind CSS** | `~3.4.1` | Utility-first CSS framework for styling. |
| **ShadCN UI** | N/A | Component library built on Radix UI and Tailwind. |
| **Genkit** | `~1.20.0` | Framework for building and running AI flows. |
| **Firebase** | `~11.9.1` | Backend-as-a-Service (Firestore, Auth). |
| **Recharts** | `~2.15.1` | Charting library for data visualization. |
| **Zod** | `~3.24.2` | Schema declaration and validation for AI flows. |
| **Lucide React** | `~0.475.0` | Icon library. |

---

## 6. Build & Deployment Process

### Build

1.  **Install Dependencies**: `npm install`
2.  **Run Build**: `npm run build`
    *   This command first runs `scripts/name-scan.ts` to check for blacklisted terms.
    *   It then runs `next build` to create a production-optimized build in the `.next` directory.

### Deployment

The project is configured for deployment to **Firebase App Hosting**.

1.  **Install Firebase CLI**: `npm install -g firebase-tools`
2.  **Login to Firebase**: `firebase login`
3.  **Deploy**: `firebase deploy --only apphosting`

### Environment Variables

The application uses a `.env` file for environment variables.

*   `NEXT_PUBLIC_EMULATOR_HOST`: The hostname for connecting to local Firebase emulators (e.g., `127.0.0.1`).
*   `GEMINI_API_KEY`: (Required for Genkit) API key for accessing Google AI services.
*   `FIREBASE_PROJECT_ID`: The ID of the target Firebase project.
*   `SERVICE_ACCOUNT_JSON`: (For scripts) A base64 encoded JSON string of the Firebase service account key.

---

## 7. Testing & QA

The project currently lacks a formal testing suite. No test frameworks (e.g., Jest, Playwright, Cypress) are installed, and there are no test files. This is a critical area for improvement.

**Recommended Sample Test Cases:**

*   **Authentication**:
    *   Verify a user can select a role and "sign in".
    *   Verify navigation redirects to the correct role-based portal.
*   **Data Display**:
    *   Verify that Firestore data is correctly fetched and displayed in a `ModuleDataTable`.
    *   Verify loading and error states are handled gracefully in components using `useCollection` or `useDoc`.
*   **AI Flows**:
    *   Verify that the `naturalLanguageQuery` flow returns a valid route for a known query (e.g., "show me fleet health").
    *   Verify the `shiftHandoverReport` flow returns a non-empty string.

---

## 8. Security & Compliance

*   **Authentication**: Handled by Firebase Authentication. Currently uses `anonymous` provider.
*   **Authorization**: Role-based access control (RBAC) is implemented on the client-side within `src/lib/service-catalog.ts`, which filters visible modules based on a mock user role. **This is not secure and must be backed by server-side rules.**
*   **Database Security**: Firestore security rules are not yet implemented. All reads and writes are currently open for authenticated users. This is a critical security vulnerability that must be addressed.
*   **Audit Logging**: The `activityFeed` collection in Firestore is designed for audit logging, but it is not currently being populated.
*   **Secrets Management**: Secrets like `GEMINI_API_KEY` are managed via environment variables. The seeder script requires a `service-account.json` file, which is correctly listed in `.gitignore`.

---

## 9. Analytics & Monitoring

The application does not currently have any explicit analytics or monitoring integrated (e.g., Google Analytics, Vercel Analytics, Sentry).

**Recommended Analytics Events:**

*   `page_view`: Tracked on all page loads.
*   `nlq_query`: Fired when a user submits a natural language query (`src/components/global/natural-language-query.tsx`).
*   `ai_flow_invoked`: Generic event for when any Genkit flow is called.
*   `report_generated`: When a user generates a report in the reports module.

---

## 10. Known Issues & TODOs

*   **CRITICAL: No Firestore Security Rules**: The database is currently insecure. Rules must be implemented to enforce per-user and per-tenant data access.
*   **No Test Coverage**: The project has zero automated tests. A testing strategy (unit, integration, e2e) needs to be defined and implemented.
*   **Client-Side Authorization**: Role-based access control is only enforced on the client, which is insufficient. This logic must be moved to Firestore security rules.
*   **Mock Data**: Many components rely on hard-coded mock data (e.g., `src/app/(dashboard)/safety/components/event-timeline-card.tsx`). This data should be fetched from Firestore.
*   **Missing Functionality**: Several UI elements are placeholders (e.g., "Export PDF" buttons, map visualizations).
*   **Inconsistent Firebase Hook Usage**: Some components create Firestore queries directly, while others use memoization (`useMemoFirebase`). Usage should be standardized to use `useMemoFirebase` to prevent performance issues.
*   **Error Handling**: `try/catch` blocks in form submission handlers use `console.error`. A centralized error logging service should be integrated.

---

## 11. Appendix

*   **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
*   **Firebase Documentation**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
*   **Genkit Documentation**: [https://firebase.google.com/docs/genkit](https://firebase.google.com/docs/genkit)
*   **ShadCN UI**: [https://ui.shadcn.com/](https://ui.shadcn.com/)
