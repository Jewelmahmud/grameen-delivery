# Backend Technology Stack - Quick Reference

## 🎯 Core Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Backend Framework** | NestJS (Node.js + TypeScript) | Latest |
| **Primary Database** | PostgreSQL | 15+ |
| **Geospatial Extension** | PostGIS | 3.3+ |
| **Time-Series Data** | TimescaleDB | 2.11+ |
| **Cache/Session Store** | Redis | 7.0+ |
| **Message Broker** | Apache Kafka | 3.5+ |
| **Push Notifications** | Firebase Cloud Messaging (FCM) | Latest |

---

## 📦 Essential NPM Packages

```bash
# Core NestJS
npm install @nestjs/common @nestjs/core @nestjs/platform-express
npm install @nestjs/config @nestjs/jwt @nestjs/passport
npm install @nestjs/typeorm @nestjs/websockets @nestjs/platform-socket.io

# Database & ORM
npm install typeorm pg
npm install redis

# Kafka
npm install kafkajs

# FCM
npm install firebase-admin

# Authentication & Security
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install bcrypt class-validator class-transformer
npm install helmet

# Utilities
npm install socket.io
npm install rate-limiter-flexible
```

---

## 🗄️ Database Setup Commands

```bash
# Install PostgreSQL with PostGIS
# Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib postgis

# macOS:
brew install postgresql postgis

# Windows: Download from postgresql.org

# Create database
createdb gramee_delivery

# Enable PostGIS extension
psql -d gramee_delivery -c "CREATE EXTENSION postgis;"
psql -d gramee_delivery -c "CREATE EXTENSION postgis_topology;"

# Install TimescaleDB (optional, for time-series)
# Follow: https://docs.timescale.com/install
```

---

## 🔧 Kafka Setup

```bash
# Using Docker (Easiest way)
docker-compose up -d zookeeper kafka

# Or download from: https://kafka.apache.org/downloads

# Create topics
kafka-topics.sh --create --topic order.created --bootstrap-server localhost:9092
kafka-topics.sh --create --topic delivery.assigned --bootstrap-server localhost:9092
kafka-topics.sh --create --topic delivery.location.updated --bootstrap-server localhost:9092
```

---

## 🔑 Environment Variables Template

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=gramee_delivery

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=gramee-delivery-api
KAFKA_GROUP_ID=gramee-delivery-group

# FCM (Get from Firebase Console)
FCM_PROJECT_ID=your-project-id
FCM_PRIVATE_KEY=your-private-key
FCM_CLIENT_EMAIL=your-client-email

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d

# API
PORT=3000
NODE_ENV=development

# External APIs
GOOGLE_MAPS_API_KEY=your-google-maps-key
PAYMENT_GATEWAY_KEY=your-payment-key
```

---

## 📊 Key Database Tables (Essential)

1. **users** - User authentication & roles
2. **customers** - Customer profiles
3. **partners** - Business/merchant profiles
4. **riders** - Delivery driver profiles
5. **orders** - Order information
6. **order_items** - Order line items
7. **deliveries** - Delivery assignments & status
8. **delivery_tracking** - Real-time location tracking (TimescaleDB)
9. **payments** - Payment transactions
10. **rider_earnings** - Rider payment tracking
11. **notifications** - Notification history
12. **fcm_tokens** - FCM device tokens

---

## 🔄 Kafka Topics (Essential)

1. `order.created` - New order placed
2. `order.status.updated` - Order status changed
3. `delivery.assigned` - Rider assigned to delivery
4. `delivery.location.updated` - Rider location update (high frequency)
5. `delivery.completed` - Delivery completed
6. `payment.completed` - Payment successful
7. `rider.online.status.changed` - Rider goes online/offline

---

## 🚀 Quick Start Commands

```bash
# 1. Create NestJS project
npm i -g @nestjs/cli
nest new gramee-delivery-backend

# 2. Install dependencies
cd gramee-delivery-backend
npm install [packages from above]

# 3. Set up environment
cp .env.example .env
# Edit .env with your configuration

# 4. Run database migrations
npm run migration:run

# 5. Start development server
npm run start:dev

# 6. Start Kafka (if using Docker)
docker-compose up -d

# 7. Start Redis
redis-server
```

---

## 📱 FCM Setup Steps

1. Create Firebase project: https://console.firebase.google.com/
2. Add Android/iOS apps to project
3. Download service account key (JSON)
4. Store credentials securely (environment variables)
5. Initialize Firebase Admin SDK in NestJS

---

## 🎯 Alternative Technologies (If needed)

| Component | Primary | Alternatives |
|-----------|---------|--------------|
| Backend | NestJS | Spring Boot (Java), FastAPI (Python), Go |
| Database | PostgreSQL | MySQL, MongoDB (for document-based) |
| Cache | Redis | Memcached |
| Message Queue | Kafka | RabbitMQ, AWS SQS |
| Push Notif | FCM | OneSignal, Pusher Beams |

---

## 📚 Essential Documentation Links

- **NestJS**: https://docs.nestjs.com/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **PostGIS**: https://postgis.net/documentation/
- **Kafka**: https://kafka.apache.org/documentation/
- **FCM**: https://firebase.google.com/docs/cloud-messaging
- **TypeORM**: https://typeorm.io/

---

## ⚡ Performance Tips

1. **Database**: Use indexes on foreign keys and frequently queried fields
2. **Redis**: Cache rider locations with 60s expiration
3. **Kafka**: Batch high-frequency location updates
4. **FCM**: Batch notifications when possible
5. **API**: Implement pagination, rate limiting

---

## 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Implement JWT token rotation
- [ ] Encrypt sensitive data at rest
- [ ] Use parameterized queries (TypeORM handles this)
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Implement audit logging
