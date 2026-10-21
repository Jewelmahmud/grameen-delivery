# Grameen Delivery (গ্রামীণ ডেলিভারি)

Welcome to the Grameen Delivery repository. This project is a full-stack logistics and delivery platform designed for urban and rural logistics in Bangladesh, connecting store owners (merchants), delivery riders, customers, and operations staff.

---

## 🏛️ System Architecture At A Glance

The project is structured into three main layers:

```
grameen-delivery/
├── backend/               # NestJS REST & WebSocket API, PostgreSQL, Redis, Kafka
├── frontend/              # React Web Dashboard (Admin, Operations & Merchant Web Portal)
├── mobileapp_shared/      # Shared Flutter package (theme, models, widgets, constants)
├── mobileapp/             # Mobile App 1: Grameen Delivery Rider (for delivery personnel)
└── mobileapp_merchant/    # Mobile App 2: Grameen Delivery Merchant (for store owners)
```

---

## 📱 Why Two Separate Mobile Applications?

If you're wondering why we split the mobile experience into two separate apps instead of stuffing everything into one giant role-switching app, here is the honest engineering and product rationale:

### 1. The Permissions & Battery Reality (The Big One)
* **The Rider App** needs continuous, high-precision background location tracking (`ACCESS_BACKGROUND_LOCATION`), foreground services, and wake locks to ping telemetry coordinates (`delivery_tracking` table) back to the server while driving with the phone locked in a pocket or mounted on a bike.
* **The Merchant App** operates from a desk, shop counter, or office. It has zero legitimate need for continuous background GPS.
* If a single app requested background location from a merchant, it triggers privacy concerns, drains unnecessary battery, and invites heavy scrutiny and rejection risks during Google Play and Apple App Store reviews.

### 2. Tailored Physical Context & UX
* **Riders on the road:** Need high-contrast screens, large tap targets, quick swipe gestures to accept or complete trips, turn-by-turn map directions, and camera capture for proof of delivery.
* **Merchants in a store:** Need order dispatching forms, live package tracking, COD collection reconciliations, and payout statements. Many also use tablets or the React web portal to print shipping receipts.

### 3. Releasing & Updating Independently
When we need to push an emergency hotfix for a rider GPS glitch or navigation SDK crash, we don't have to risk breaking or forcing updates on our store merchants.

---

## 🧩 The Shared Code Library (`mobileapp_shared`)

Rather than duplicating common code across both apps, both Flutter applications depend on **`mobileapp_shared`** via local path dependencies:

* **Brand & Theme (`app_theme.dart`):** Consistent Grameen green `#4CAF50`, card styling, button styling, and the Kalpurush Bengali typography.
* **Domain Models (`models/`):** Strongly typed models for `OrderModel`, `OrderItemModel`, `DeliveryModel`, and `UserModel`.
* **Shared UI Widgets (`widgets/`):**
  * `CustomButton`: Consistent primary and outlined buttons with loading states.
  * `StatusBadge`: Color-coded status indicators (Ready, Picked Up, In Transit, Delivered, Cancelled).
  * `InfoCard`: Reusable metric cards for dashboards.
  * `BrandHeader`: Unified app bar with Grameen branding.
  * `LanguageToggle`: Seamless 1-tap toggle between Bengali (`বাং`) and English (`EN`).
* **Constants & Helpers (`app_constants.dart`):** Centralized status keys, role definitions, and BDT (`৳`) currency formatting.

---

## 🚀 Getting Started

### Prerequisites
* Flutter SDK (3.9.0 or higher recommended)
* Dart SDK (3.11.0+)
* Android Studio / VS Code with Flutter extension
* Node.js (for backend/frontend services)

---

### Running the Apps

#### 1. Setup the Shared Core
First, ensure dependencies are fetched for the shared package:
```bash
cd mobileapp_shared
flutter pub get
flutter test
```

#### 2. Running "Grameen Delivery Rider"
This is the application used by delivery drivers:
```bash
cd mobileapp
flutter pub get
flutter run
```
* **App Display Name:** `Grameen Delivery Rider`
* **Package / Bundle ID:** `grameendelivery`
* **Features:** Online/Offline toggle, active trip dashboard, order acceptance, trip details with GPS route simulation, delivery completion, daily earnings breakdown, and Bengali/English localization.

#### 3. Running "Grameen Delivery Merchant"
This is the application used by retail partners and business owners:
```bash
cd mobileapp_merchant
flutter pub get
flutter run
```
* **App Display Name:** `Grameen Delivery Merchant`
* **Package / Bundle ID:** `com.grameen.delivery.grameen_delivery_merchant`
* **Features:** Store overview, live parcels in-transit, "Create New Delivery" booking form, recipient details, cash-on-delivery tracking, payout/settlement records, and verified merchant profile.

---

## 🧪 Running Automated Tests

All packages come with unit and widget smoke tests:

```bash
# Test shared package
cd mobileapp_shared && flutter test

# Test rider app
cd ../mobileapp && flutter test

# Test merchant app
cd ../mobileapp_merchant && flutter test
```

---

## 🛠️ Backend & Web Dashboards

* **Backend (`backend/api`):** Built with NestJS, TypeORM, PostgreSQL with PostGIS, Kafka, Redis, and WebSockets. Start with Docker via `docker compose up` in `backend/`.
* **Frontend Web Portal (`frontend/`):** React dashboard with dedicated portals for Admin operations, Partner web dispatch, and customer order tracking. Run using `npm start` in `frontend/`.

---

## 🤝 Contributing

1. When adding brand colors, UI widgets, or domain models used by both roles, put them inside `mobileapp_shared`.
2. Keep the Merchant app clean from background location dependencies.
3. Test all three Flutter packages before pushing your changes.
