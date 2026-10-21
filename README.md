# Grameen Delivery (গ্রামীণ ডেলিভারি)

[![Flutter](https://img.shields.io/badge/Flutter-3.41+-02569B?style=flat-square&logo=flutter&logoColor=white)](https://flutter.dev)
[![NestJS](https://img.shields.io/badge/NestJS-Backend-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com)
[![React](https://img.shields.io/badge/React-Web_Portal-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-PostGIS%20%2B%20Timescale-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-4CAF50?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A full-stack logistics and delivery platform built for merchants, delivery riders, and operations teams in Bangladesh. It handles the entire lifecycle: parcel booking, real-time rider tracking, turn-by-turn navigation, cash-on-delivery (COD) reconciliation, and merchant settlements.

---

## What's in This Monorepo?

```
grameen-delivery/
├── mobileapp/             # Grameen Delivery Rider (Flutter mobile app for drivers)
├── mobileapp_merchant/    # Grameen Delivery Merchant (Flutter mobile app for shop owners)
├── mobileapp_shared/      # Shared core package (theme, models, widgets, localization)
├── backend/               # NestJS API (Postgres, PostGIS, Kafka, Redis, WebSockets)
└── frontend/              # React operations dashboard for admins and dispatchers
```

---

## Why Two Separate Mobile Apps?

Rather than bloating a single app with conflicting permissions, we separated the two user roles:

* **Grameen Delivery Rider:** Needs persistent background GPS (`ACCESS_BACKGROUND_LOCATION`), foreground services, and wake locks to beam live telemetry while the rider is on the road.
* **Grameen Delivery Merchant:** Operates from a shop counter or desk. It focuses on parcel creation, tracking shipments, and tracking payouts—with zero need for invasive battery-draining background GPS.

Both apps share brand styling, BDT (`৳`) currency formatters, bilingual localization (বাংলা / English), and models via **`mobileapp_shared`**, so we never write the same UI or logic twice.

---

## Quickstart

### 1. Run the Rider App
```bash
cd mobileapp
flutter pub get
flutter run
```

### 2. Run the Merchant App
```bash
cd mobileapp_merchant
flutter pub get
flutter run
```

### 3. Run Backend & Web Portal
```bash
# Backend (API + DB)
cd backend && docker compose up -d

# Frontend (Admin Web Dashboard)
cd frontend && npm install && npm start
```

---

## Running Tests

All mobile packages come with automated tests:

```bash
cd mobileapp_shared && flutter test
cd ../mobileapp && flutter test
cd ../mobileapp_merchant && flutter test
```

---

## License

This project is licensed under the [MIT License](LICENSE).
