# Veralogix Smart Mining HUB

**Fueling growth at the intersection of strategy, chaos, and experimental tech.** 😈⚙️📡

The Smart Mining HUB is Veralogix Group’s “single pane of glass” platform for **safer, smarter, and more efficient mining**. It connects **people, machines, plant, transport, and risk** into a unified operational truth source, featuring dashboards and auditable workflows built for real-world mining operations.

This repository contains the source code for the Smart Hub, a full-stack web application built with Next.js and React.

> This is a **proprietary Veralogix Group SA repository**. Not open-source. No reuse, redistribution, or modification without written permission.

---

## How to Set Up for Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Firebase Service Account
To run the database seeder script, you need to provide admin credentials to Firebase.

1.  Go to your [Firebase Project Settings](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk).
2.  Select your project, then click **"Generate new private key"**.
3.  This will download a JSON file. **Save this file** in the root of this project directory with the name `service-account.json`.
4.  **Important**: The `service-account.json` file is added to `.gitignore` and should never be committed to source control.

### 3. Seed the Database with Demo Data
Run the following command to populate your Firestore database with realistic demo data. This script is idempotent, meaning it's safe to run multiple times.

```bash
npm run db:seed
```

This will delete any previous demo data for the default tenant and create a fresh set.

---

## How to Deploy (for a Stable, Shareable Link)

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

After deployment, the Firebase CLI will provide you with a stable URL where you and your bosses can access the live application.

---

## License
© Veralogix Group SA. All rights reserved.
This repository is proprietary and not licensed for public reuse.
