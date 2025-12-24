
# Veralogix Smart Mining HUB

**Fueling growth at the intersection of strategy, chaos, and experimental tech.** 😈⚙️📡

The Smart Mining HUB is Veralogix Group’s “single pane of glass” platform for **safer, smarter, and more efficient mining**. It connects **people, machines, plant, transport, and risk** into a unified operational truth source, featuring dashboards and auditable workflows built for real-world mining operations.

This repository contains the source code for the Smart Hub, a full-stack web application.

> This is a **proprietary Veralogix Group SA repository**. Not open-source. No reuse, redistribution, or modification without written permission.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [License](#license)

---

## Tech Stack

This project is built with a modern, performant, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit)
- **Database**: [Firestore](https://firebase.google.com/docs/firestore) (NoSQL)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)

---

## Project Structure

The codebase is organized to separate concerns and improve maintainability:

```
/
├── src/
│   ├── app/                # Next.js App Router: Pages and layouts
│   ├── components/         # Shared UI components
│   ├── firebase/           # Firebase configuration and hooks
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Core utilities and service definitions
│   └── ai/                 # Genkit flows and AI-related code
├── public/                 # Static assets (images, fonts)
├── scripts/                # Utility scripts (e.g., database seeding)
└── docs/                   # Project documentation (e.g., data models)
```

---

## Getting Started

Follow these steps to set up and run the project locally for development.

### 1. Install Dependencies
First, install the required `npm` packages.

```bash
npm install
```

### 2. Set Up Firebase Service Account
To run the database seeder script and connect to Firebase services, you need to provide admin credentials.

1.  Go to your [Firebase Project Settings](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk).
2.  Select your project, then click **"Generate new private key"**.
3.  This will download a JSON file. **Save this file** in the root of the project directory with the name `service-account.json`.
4.  **Important**: The `service-account.json` file is added to `.gitignore` and should never be committed to source control.

### 3. Seed the Database
Run the following command to populate your Firestore database with realistic demo data. This script is idempotent, meaning it's safe to run multiple times.

```bash
npm run db:seed
```

This will delete any previous demo data for the default tenant and create a fresh set.

### 4. Run the Development Server
Once the setup is complete, you can start the local development server.

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Deployment

This is a dynamic Next.js application and **cannot be hosted on GitHub Pages**. It must be deployed to a web hosting service that supports Node.js applications. This project is configured for **Firebase App Hosting**.

To deploy the application and get a permanent, shareable URL, you will need to use the Firebase CLI.

1.  **Install the Firebase CLI:**
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase:**
    ```bash
    firebase login
    ```

3.  **Deploy the application:**
    ```bash
    firebase deploy --only apphosting
    ```

After deployment, the Firebase CLI will provide you with a stable URL where you and your team can access the live application.

---

## License
© Veralogix Group SA. All rights reserved.
This repository is proprietary and not licensed for public reuse.
