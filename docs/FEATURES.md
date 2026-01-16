# Veralogix Smart Mining HUB: Feature & Capability Overview

This document provides a comprehensive overview of the features, modules, and capabilities of the Veralogix Smart Mining Hub prototype.

---

## 1. Core Platform Features

These are the foundational features that power the entire application experience.

| Feature                   | Description                                                                                                                                                             |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Role-Based Access**     | A prototype-friendly login screen allows users to select a role (e.g., Executive, Supervisor, Operator) to view a version of the application tailored to their needs.      |
| **Central Smart Hub**     | The main landing page that provides a high-level, "single pane of glass" overview of all operational modules through a grid of widgets and AI-driven insights.           |
| **Natural Language Query**| An AI-powered search bar in the main header that allows users to ask questions in plain English (e.g., "show me fleet health") to be instantly navigated to the correct page. |
| **Alerts & Tasks System** | A centralized system for viewing and managing all system-generated alerts (e.g., safety violations, mechanical warnings) and actionable tasks assigned to users or roles. |
| **Real-time Data Engine** | The application is built on Firestore, providing real-time data synchronization to ensure all dashboards and reports reflect the latest operational information.             |
| **Data Ingestion**        | A simulated data ingestion endpoint (`/api/ingest`) demonstrates how the platform can receive and process data from various sources like IoT devices and external systems.   |

---

## 2. Role-Specific Dashboards

The application provides tailored dashboard experiences for different user roles, ensuring each user sees the most relevant information for their job function.

| Dashboard               | Role(s)                    | Description                                                                                                                                                   |
| :---------------------- | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Executive Overview**  | Executive, Admin, Viewer   | High-level, strategic summary of site performance against business goals, focusing on Cost per Tonne, Production, Safety Status, and ESG (Environmental, Social, Governance) highlights. |
| **Control Room View**   | Supervisor, Ops            | A tactical dashboard for real-time fleet management, process optimization, and anomaly detection. It provides tools to manage queues, cycles, and fleet health.     |
| **Operator Cockpit**    | Operator                   | A personalized, in-cab view for machine operators, showing their assigned machine, shift progress, personal production KPIs, live alerts, and compliance status.  |
| **Admin Console**       | Admin                      | A central hub for managing platform configuration, including user management, device registry, tenants, and system settings.                                     |

---

## 3. Operational Modules (The "Smarts")

These are the primary modules that provide deep dives into specific operational areas.

| Module                        | Description                                                                                                                                                                         |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Smart Operations (Plant)**  | Monitors plant throughput, recovery/yield, and sensor health across the entire process flow from crusher to tailings. Includes AI insights for process risk and sensor gaps.         |
| **Smart Transport (Fleet)**   | Manages vehicle loading, real-time tracking, payload distribution, and overall fleet performance. Features AI-driven fuel forecasting and payload optimization recommendations.       |
| **Load Passports**            | Provides a complete, auditable, end-to-end lifecycle record for every haulage load, tracking it from origin to destination with a detailed event timeline.                           |
| **Smart Risk (Safety)**       | Monitors and analyzes safety data, including proximity detection (CPS), operator fatigue, incident timelines, and geofence breaches. Features an AI-powered risk heatmap.            |
| **Smart People (Compliance)** | Manages workforce compliance, including licenses, medicals, and training records. Tracks gate activity and provides an overview of compliance status across the entire workforce.    |
| **Smart Geotech (Earthworks)**| Monitors and manages haul road and bench quality using high-precision survey data. Includes an AI Road Risk Index and AI-driven recommendations for road rework priorities.          |
| **Smart Survey (Drones)**     | Manages drone flights for stockpile surveys, perimeter security patrols, and mission planning. Provides intelligence on stockpile volume variance.                                   |
| **Smart Supply Chain**        | Manages inventory, logistics, and critical spares. Tracks stock levels and helps identify stockout risks.                                                                             |
| **Smart Energy**              | Monitors and optimizes energy consumption across all sites, tracking metrics like total consumption, cost per kWh, and grid stability.                                                 |
| **Smart Environmental**       | Tracks environmental compliance for emissions, water quality, and dust levels, logging all relevant data points and flagging breaches.                                                |

---

## 4. AI & Predictive Analytics Features

The Smart Hub leverages Genkit and AI models to provide advanced analytics and actionable insights.

| AI Feature                    | Location / Module         | Description                                                                                                                                                                        |
| :---------------------------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Insights Strip**         | Main Hub Dashboard        | Delivers a top-level **Section 54 Risk Score** (predicting major mine stoppages) and scannable **Top Recommendations** for supervisors.                                            |
| **AI Anomaly Watch**          | Supervisor Dashboard      | Uses an AI flow to analyze real-time operational data and flag significant anomalies, such as unusual idle times, high cycle times, or degrading road conditions.                  |
| **AI Fuel Overspend Forecast**| Fleet Dashboard           | Simulates an AI-driven forecast of the week's fuel overspend in ZAR, identifying key drivers like high idle time or increased haul distances to help control costs.                    |
| **Smart ROI Dashboard**       | Main Navigation           | A client-focused dashboard that quantifies the value of the Smart Hub. It visualizes **AI-Driven Cost Savings**, **Operational Uplift** (e.g., tonnes moved), and safety improvements. |
| **Shift Handover Assistant**  | Sidebar / Handover Page   | Generates a concise, natural-language summary of the previous shift's critical events, alerts, and anomalies to ensure a smooth and informed handover between supervisors.           |
| **Digital Twin & Scenarios**  | Digital Twin Module       | Allows users to simulate the impact of operational changes (e.g., adding a truck, reducing speed limits) and see the predicted effect on KPIs like production and cost per tonne.   |
| **AI Rework Suggestions**     | Geotech / Earthworks      | Analyzes road condition data, near-misses, and sensor readings to generate a prioritized list of haul road segments that require maintenance, improving safety and efficiency.       |
| **Predictive Maintenance**    | Predictive Module         | Simulates outputs from predictive models that forecast potential asset failures, allowing for proactive maintenance scheduling to reduce unplanned downtime.                         |