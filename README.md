# Veralogix Group SA — Smart Mining HUB (Smart Hub)

**Fueling growth at the intersection of strategy, chaos, and experimental tech.** 😈⚙️📡

The Smart Mining HUB is Veralogix Group’s “single pane of glass” platform for **safer, smarter, and more efficient mining**. It connects **people, machines, plant, transport, and risk** into a unified operational truth source, featuring dashboards and auditable workflows built for real-world mining operations.

This repository contains the source code for the Smart Hub, a full-stack web application built with Next.js and React.

> This is a **proprietary Veralogix Group SA repository**. Not open-source. No reuse, redistribution, or modification without written permission.

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

## The HUB, in 5 Pillars
1.  **Smart Operations:** Plant performance, maintenance monitoring.
2.  **Smart Transport:** Vehicle loading, tracking, and quality control.
3.  **Smart Risk:** Automated risk management, hazard controls, and emergency response.
4.  **Smart People:** Compliance, training, and linking operator performance to machines.
5.  **Smart Management:** Automated reporting for the executive layer.

---

## System Architecture (High Level)
**Data Sources → Edge → Network → Platform → Dashboards**
- **Vehicles:** Telemetry, fuel usage, speed, location, engine/brake/transmission metrics.
- **Plant:** Data from crushers, conveyors, screens, feeders, thickeners.
- **People:** Smart badge/attendance data, compliance status, and performance linkage.

---

## License
© Veralogix Group SA. All rights reserved.
This repository is proprietary and not licensed for public reuse.
