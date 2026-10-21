# Backend Architecture Recommendations for Grameen Delivery App

## 📋 Executive Summary

**Technology Stack**: Node.js (NestJS) with TypeScript  
**Architecture Focus**: Scalability & Performance

Based on the codebase analysis, this is a multi-role delivery management platform with:
- **4 User Roles**: Admin, Partner (Business), Rider (Delivery Driver), Customer
- **Core Features**: Order tracking, delivery management, real-time location updates, earnings tracking
- **Event-Driven Requirements**: Kafka for event broadcasting, FCM for push notifications
- **Multi-language Support**: Bengali & English
- **Authentication**: External Auth Server (JWT-based) - User registration/login managed externally
- **Scalability First**: Database schema and architecture designed for horizontal scaling

---

## 🏗️ Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Flutter Mobile Application               │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               │                              │
       ┌───────▼────────┐           ┌────────▼────────┐
       │  Auth Server   │           │  Delivery API   │
       │  (External)    │           │  (This Service) │
       │                │           │                 │
       │  - Login       │           │  - Orders       │
       │  - Register    │           │  - Deliveries   │
       │  - JWT Issuance│           │  - Payments     │
       │  - User Mgmt   │           │  - Tracking     │
       └────────┬───────┘           └────────┬────────┘
                │                            │
                │ JWT Token                  │
                │ (Validates token)          │
                └──────────────┬─────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│              API Gateway (Kong/Nginx)                        │
│  - Rate Limiting                                             │
│  - JWT Validation (via Auth Server)                          │
│  - Request Routing                                           │
│  - Load Balancing                                            │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│              NestJS Application (Monolithic → Microservices) │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ JWT Validator│  │ Order Service│  │ Delivery Svc │      │
│  │ (Auth Client)│  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Payment Svc  │  │ Notification │  │ Location Svc │      │
│  │              │  │ Service      │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Analytics Svc│  │ WebSocket    │                        │
│  │              │  │ Server       │                        │
│  └──────────────┘  └──────────────┘                        │
└───────────────────────┬──────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │    Redis     │  │    Kafka     │
│  (Primary)   │  │   (Cache)    │  │  (Events)    │
│              │  │              │  │              │
│  - Partitioned│  │ - Sessions   │  │ - Topics     │
│  - Read       │  │ - Locations  │  │ - Consumers  │
│    Replicas   │  │ - Cache      │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
        │
        └───────────────┬───────────────┐
                        │               │
                        ▼               ▼
              ┌──────────────┐  ┌──────────────┐
              │ TimescaleDB  │  │ Elasticsearch│
              │ (Analytics)  │  │ (Search)     │
              └──────────────┘  └──────────────┘
```

---

## 🗄️ Database Architecture (Scalability-Focused)

### Primary Recommendation: **PostgreSQL** (with TimescaleDB for time-series data)

#### Why PostgreSQL for Scalability?

1. **Horizontal Scaling**: Partitioning, read replicas, sharding support
2. **ACID Compliance**: Critical for financial transactions
3. **PostGIS Extension**: Geospatial queries for location-based features
4. **TimescaleDB**: Time-series data for tracking and analytics
5. **JSONB Support**: Flexible schema for evolving requirements
6. **Connection Pooling**: Efficient resource management at scale

---

## 📊 Database Schema (Optimized for Scale)

### Core Tables (Scalable Design)

```sql
-- ============================================
-- USER & PROFILE TABLES (Reference Only)
-- ============================================
-- Note: Users are managed by external Auth Server
-- We only store user_id and profile extensions

CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY,  -- From Auth Server
    role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'partner', 'rider', 'admin')),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_user_profiles_role (role),
    INDEX idx_user_profiles_created_at (created_at)
) PARTITION BY HASH (user_id);  -- Partition for scale

-- Customer Profiles
CREATE TABLE customers (
    user_id UUID PRIMARY KEY REFERENCES user_profiles(user_id),
    default_address TEXT,
    default_location POINT,  -- PostGIS
    preferences JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_customers_location USING GIST (default_location)
);

-- Partner (Business) Profiles
CREATE TABLE partners (
    user_id UUID PRIMARY KEY REFERENCES user_profiles(user_id),
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(50),
    address TEXT,
    location POINT,  -- PostGIS
    verification_status VARCHAR(20) DEFAULT 'pending',
    rating DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_partners_location USING GIST (location),
    INDEX idx_partners_status (verification_status),
    INDEX idx_partners_rating (rating)
);

-- Rider Profiles
CREATE TABLE riders (
    user_id UUID PRIMARY KEY REFERENCES user_profiles(user_id),
    vehicle_type VARCHAR(50),
    vehicle_number VARCHAR(50),
    license_number VARCHAR(100),
    online_status BOOLEAN DEFAULT FALSE,
    current_location POINT,  -- PostGIS (updated frequently)
    last_location_update TIMESTAMP,
    rating DECIMAL(3,2),
    total_deliveries INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_riders_location USING GIST (current_location),
    INDEX idx_riders_online_status (online_status),
    INDEX idx_riders_rating (rating)
);

-- ============================================
-- ORDER TABLES (Partitioned by Date)
-- ============================================

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,  -- Human-readable: ORD-2024-001234
    partner_id UUID NOT NULL REFERENCES partners(user_id),
    customer_id UUID NOT NULL REFERENCES customers(user_id),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'preparing', 'ready', 'assigned', 
        'picked_up', 'in_transit', 'delivered', 'cancelled'
    )),
    total_amount DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'BDT',
    tracking_number VARCHAR(50) UNIQUE NOT NULL,
    pickup_address TEXT NOT NULL,
    pickup_location POINT,  -- PostGIS
    delivery_address TEXT NOT NULL,
    delivery_location POINT,  -- PostGIS
    estimated_delivery_time TIMESTAMP,
    actual_delivery_time TIMESTAMP,
    special_instructions TEXT,
    metadata JSONB,  -- Flexible fields
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    
    -- Indexes for performance
    INDEX idx_orders_partner_id (partner_id),
    INDEX idx_orders_customer_id (customer_id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_tracking_number (tracking_number),
    INDEX idx_orders_order_number (order_number),
    INDEX idx_orders_created_at (created_at DESC),
    INDEX idx_orders_delivery_location USING GIST (delivery_location),
    INDEX idx_orders_status_created (status, created_at DESC)
) PARTITION BY RANGE (created_at);  -- Partition by month/quarter

-- Monthly partitions (auto-created)
CREATE TABLE orders_2024_01 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE orders_2024_02 PARTITION OF orders
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
-- ... continue for each month

-- Order Items (Child table, inherits partitioning)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_order_items_order_id (order_id)
);

-- ============================================
-- DELIVERY TABLES (Partitioned)
-- ============================================

CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    delivery_number VARCHAR(50) UNIQUE NOT NULL,  -- DLV-2024-001234
    order_id UUID NOT NULL REFERENCES orders(id),
    rider_id UUID REFERENCES riders(user_id),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'assigned', 'accepted', 'picked_up', 
        'in_transit', 'delivered', 'failed', 'cancelled'
    )),
    pickup_location POINT NOT NULL,
    delivery_location POINT NOT NULL,
    estimated_distance_km DECIMAL(8,2),
    estimated_time_minutes INT,
    actual_distance_km DECIMAL(8,2),
    actual_time_minutes INT,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    delivery_proof_url TEXT,
    delivery_notes TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    
    -- Indexes
    INDEX idx_deliveries_order_id (order_id),
    INDEX idx_deliveries_rider_id (rider_id),
    INDEX idx_deliveries_status (status),
    INDEX idx_deliveries_rider_status (rider_id, status),
    INDEX idx_deliveries_pickup_location USING GIST (pickup_location),
    INDEX idx_deliveries_delivery_location USING GIST (delivery_location),
    INDEX idx_deliveries_created_at (created_at DESC)
) PARTITION BY RANGE (created_at);

-- Delivery Tracking (TimescaleDB Hypertable for Time-Series)
CREATE TABLE delivery_tracking (
    delivery_id UUID NOT NULL REFERENCES deliveries(id) ON DELETE CASCADE,
    rider_id UUID NOT NULL REFERENCES riders(user_id),
    location POINT NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,  -- Denormalized for queries
    longitude DECIMAL(11,8) NOT NULL,
    accuracy DECIMAL(5,2),  -- GPS accuracy in meters
    speed_kmh DECIMAL(5,2),
    heading DECIMAL(5,2),
    status VARCHAR(20),
    timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    
    -- Indexes
    INDEX idx_delivery_tracking_delivery_id (delivery_id),
    INDEX idx_delivery_tracking_timestamp (timestamp DESC),
    INDEX idx_delivery_tracking_location USING GIST (location),
    INDEX idx_delivery_tracking_delivery_timestamp (delivery_id, timestamp DESC)
);

-- Convert to TimescaleDB hypertable (for time-series optimization)
SELECT create_hypertable('delivery_tracking', 'timestamp', 
    chunk_time_interval => INTERVAL '1 day',
    if_not_exists => TRUE);

-- ============================================
-- PAYMENT TABLES (Partitioned)
-- ============================================

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_number VARCHAR(50) UNIQUE NOT NULL,  -- PAY-2024-001234
    order_id UUID NOT NULL REFERENCES orders(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BDT',
    payment_method VARCHAR(50) NOT NULL,  -- 'cash', 'bkash', 'nagad', 'card'
    payment_gateway VARCHAR(50),  -- 'bkash', 'stripe', etc.
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'processing', 'completed', 'failed', 'refunded'
    )),
    transaction_id VARCHAR(255),  -- Gateway transaction ID
    gateway_response JSONB,
    failure_reason TEXT,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    
    -- Indexes
    INDEX idx_payments_order_id (order_id),
    INDEX idx_payments_status (status),
    INDEX idx_payments_transaction_id (transaction_id),
    INDEX idx_payments_payment_method (payment_method),
    INDEX idx_payments_created_at (created_at DESC)
) PARTITION BY RANGE (created_at);

-- Rider Earnings
CREATE TABLE rider_earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rider_id UUID NOT NULL REFERENCES riders(user_id),
    delivery_id UUID NOT NULL REFERENCES deliveries(id),
    order_id UUID NOT NULL REFERENCES orders(id),
    amount DECIMAL(10,2) NOT NULL,
    commission_percentage DECIMAL(5,2),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN (
        'pending', 'processing', 'paid', 'cancelled'
    )),
    payment_date DATE,
    paid_at TIMESTAMP,
    transaction_reference VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    
    -- Indexes
    INDEX idx_rider_earnings_rider_id (rider_id),
    INDEX idx_rider_earnings_delivery_id (delivery_id),
    INDEX idx_rider_earnings_payment_status (payment_status),
    INDEX idx_rider_earnings_payment_date (payment_date DESC),
    INDEX idx_rider_earnings_rider_date (rider_id, payment_date DESC)
) PARTITION BY RANGE (created_at);

-- ============================================
-- NOTIFICATION & FCM TABLES
-- ============================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,  -- From Auth Server
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB,  -- Additional payload
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    
    -- Indexes
    INDEX idx_notifications_user_id (user_id),
    INDEX idx_notifications_read (read),
    INDEX idx_notifications_created_at (created_at DESC),
    INDEX idx_notifications_user_read (user_id, read, created_at DESC)
) PARTITION BY HASH (user_id);  -- Partition by user for scale

-- FCM Tokens (High write, moderate read)
CREATE TABLE fcm_tokens (
    user_id UUID NOT NULL,
    token VARCHAR(255) NOT NULL,
    device_type VARCHAR(20) CHECK (device_type IN ('android', 'ios', 'web')),
    device_id VARCHAR(255),
    app_version VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    PRIMARY KEY (user_id, token),
    INDEX idx_fcm_tokens_user_id (user_id),
    INDEX idx_fcm_tokens_active (is_active),
    INDEX idx_fcm_tokens_last_used (last_used_at DESC)
);

-- ============================================
-- ANALYTICS & AUDIT TABLES
-- ============================================

-- Event Audit Log (TimescaleDB)
CREATE TABLE event_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,  -- 'order', 'delivery', 'payment'
    entity_id UUID NOT NULL,
    user_id UUID,
    action VARCHAR(50) NOT NULL,
    old_data JSONB,
    new_data JSONB,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    
    INDEX idx_event_audit_event_type (event_type),
    INDEX idx_event_audit_entity (entity_type, entity_id),
    INDEX idx_event_audit_user_id (user_id),
    INDEX idx_event_audit_timestamp (timestamp DESC)
);

SELECT create_hypertable('event_audit_log', 'timestamp', 
    chunk_time_interval => INTERVAL '1 day',
    if_not_exists => TRUE);

-- ============================================
-- PERFORMANCE INDEXES SUMMARY
-- ============================================

-- Composite indexes for common queries
CREATE INDEX idx_orders_partner_status_created ON orders(partner_id, status, created_at DESC);
CREATE INDEX idx_orders_customer_status_created ON orders(customer_id, status, created_at DESC);
CREATE INDEX idx_deliveries_rider_status_created ON deliveries(rider_id, status, created_at DESC);
CREATE INDEX idx_payments_status_created ON payments(status, created_at DESC);

-- Full-text search indexes (if needed)
CREATE INDEX idx_partners_business_name_fts ON partners USING GIN(to_tsvector('english', business_name));
```

### Database Partitioning Strategy

#### 1. **Hash Partitioning** (for user-based tables)
- `user_profiles` - Partition by `user_id` (hash)
- `notifications` - Partition by `user_id` (hash)
- **Benefits**: Even distribution, parallel queries

#### 2. **Range Partitioning** (for time-based tables)
- `orders` - Partition by `created_at` (monthly/quarterly)
- `deliveries` - Partition by `created_at` (monthly)
- `payments` - Partition by `created_at` (monthly)
- `rider_earnings` - Partition by `created_at` (monthly)
- **Benefits**: Easy archiving, query optimization, partition pruning

#### 3. **TimescaleDB Hypertables** (for time-series)
- `delivery_tracking` - Chunked by day
- `event_audit_log` - Chunked by day
- **Benefits**: Automatic retention policies, optimized time-series queries

---

## 🔄 Scalability Features

### 1. **Read Replicas Strategy**

```sql
-- Primary Database (Write)
PRIMARY_DB: gramee_delivery_primary

-- Read Replicas
READ_REPLICA_1: gramee_delivery_read_1 (Analytics queries)
READ_REPLICA_2: gramee_delivery_read_2 (API queries)
READ_REPLICA_3: gramee_delivery_read_3 (Reporting)
```

### 2. **Connection Pooling**

```typescript
// TypeORM configuration
{
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  extra: {
    max: 20,  // Maximum pool size
    min: 5,   // Minimum pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  // Read replicas for read operations
  replication: {
    master: {
      host: process.env.DATABASE_MASTER_HOST,
      // ...
    },
    slaves: [
      {
        host: process.env.DATABASE_READ_REPLICA_1_HOST,
        // ...
      },
      {
        host: process.env.DATABASE_READ_REPLICA_2_HOST,
        // ...
      }
    ]
  }
}
```

### 3. **Sharding Strategy** (Future)

When needed, shard by:
- **Geography**: Different regions (Dhaka, Chittagong, etc.)
- **Partner ID**: Large partners get dedicated shards
- **User ID**: Hash-based sharding for users

---

## 🔐 Authentication & Authorization

### External Auth Server Integration

**This service does NOT handle user registration/login. It validates JWT tokens from external Auth Server.**

#### JWT Validation Flow

```
1. Client sends request with JWT token (from Auth Server)
   ↓
2. API Gateway validates token signature
   ↓
3. NestJS JWT Guard validates token
   ↓
4. Optionally: Verify token with Auth Server (for revocation check)
   ↓
5. Extract user_id and role from token payload
   ↓
6. Allow/deny request based on role
```

#### Implementation

```typescript
// JWT Validation Service
@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVER_CLIENT') private authClient: HttpService,
  ) {}

  async validateToken(token: string): Promise<JwtPayload> {
    // 1. Verify JWT signature (using Auth Server's public key)
    // 2. Optional: Check token revocation with Auth Server
    // 3. Return user payload
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    // Fetch user profile from Auth Server or cache
  }
}
```

---

## 🛠️ Backend Technology Stack

### **Node.js with TypeScript + NestJS** ✅

#### Core Libraries & Packages

```json
{
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/platform-express": "^10.0.0",
  "@nestjs/platform-socket.io": "^10.0.0",
  "@nestjs/websockets": "^10.0.0",
  "@nestjs/config": "^3.0.0",
  "@nestjs/jwt": "^10.0.0",
  "@nestjs/passport": "^10.0.0",
  "@nestjs/typeorm": "^10.0.0",
  "@nestjs/axios": "^3.0.0",
  "typeorm": "^0.3.17",
  "pg": "^8.11.0",
  "redis": "^4.6.0",
  "ioredis": "^5.3.0",
  "kafkajs": "^2.2.4",
  "firebase-admin": "^11.0.0",
  "socket.io": "^4.6.0",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1",
  "helmet": "^7.0.0",
  "rate-limiter-flexible": "^3.0.0",
  "axios": "^1.6.0",
  "jwks-rsa": "^3.0.0"
}
```

---

## 🔄 Event-Driven Architecture with Kafka

### Kafka Topics Structure

```yaml
Topics:
  # Order Lifecycle
  - order.created
    partitions: 10
    replication-factor: 3
    # Payload: { orderId, partnerId, customerId, items, totalAmount, trackingNumber }
  
  - order.status.updated
    partitions: 10
    # Payload: { orderId, oldStatus, newStatus, updatedBy, timestamp }
  
  - order.cancelled
    partitions: 5
    # Payload: { orderId, cancelledBy, reason, timestamp }
  
  # Delivery Lifecycle
  - delivery.assigned
    partitions: 10
    # Payload: { deliveryId, orderId, riderId, estimatedTime, pickupLocation, deliveryLocation }
  
  - delivery.started
    partitions: 5
    # Payload: { deliveryId, riderId, startTime }
  
  - delivery.location.updated
    partitions: 20  # High-frequency, more partitions
    retention: 24h  # Short retention
    # Payload: { deliveryId, riderId, latitude, longitude, timestamp }
    # High-frequency topic (every 30-60 seconds)
  
  - delivery.completed
    partitions: 10
    # Payload: { deliveryId, orderId, riderId, completedAt, deliveryProof }
  
  # Payment Events
  - payment.initiated
    partitions: 5
    # Payload: { paymentId, orderId, amount, paymentMethod }
  
  - payment.completed
    partitions: 10
    # Payload: { paymentId, orderId, amount, transactionId, timestamp }
  
  - payment.failed
    partitions: 5
    # Payload: { paymentId, orderId, reason, timestamp }
  
  # User Events
  - rider.online.status.changed
    partitions: 5
    # Payload: { riderId, isOnline, timestamp }
  
  - rider.location.updated
    partitions: 20  # High-frequency
    retention: 1h
    # Payload: { riderId, latitude, longitude, timestamp }
```

### Kafka Consumer Groups

```yaml
Consumer Groups:
  - notification-service
    topics: [order.created, delivery.assigned, delivery.completed, payment.completed]
    instances: 3  # Scale horizontally
    
  - analytics-service
    topics: [order.*, delivery.*, payment.*]
    instances: 2
    
  - websocket-service
    topics: [delivery.location.updated, order.status.updated]
    instances: 5  # Scale for real-time updates
    
  - audit-service
    topics: [*]  # All topics
    instances: 1
```

---

## 🔔 FCM (Firebase Cloud Messaging) Integration

### Implementation Strategy

#### Kafka → FCM Flow

```
Event Published to Kafka
  ↓
Notification Service consumes event (3 instances)
  ↓
Determine notification type & recipients
  ↓
Fetch FCM tokens from Redis (cached) or DB
  ↓
Batch FCM notifications (500 per batch)
  ↓
Update notification status in DB
  ↓
Log delivery status to Kafka (notification.sent)
```

---

## 🏗️ Service Architecture (Scalable Monolith → Microservices)

### Recommended Structure (Scalable Monolith)

```
src/
├── common/              # Shared utilities, guards, filters
│   ├── guards/         # JWT guard, role guard
│   ├── interceptors/   # Logging, transformation
│   ├── filters/        # Exception filters
│   └── decorators/     # Custom decorators
│
├── auth/               # JWT Validation & Auth Server Client
│   ├── auth.service.ts      # Validates JWT from Auth Server
│   ├── auth.guard.ts        # JWT guard
│   ├── role.guard.ts        # Role-based access control
│   └── auth-client.module.ts # HTTP client for Auth Server
│
├── users/              # User profile management
│   ├── user-profiles/  # Customer, Partner, Rider profiles
│   └── ...
│
├── orders/             # Order management
│   ├── orders.service.ts
│   ├── orders.controller.ts
│   └── orders.module.ts
│
├── deliveries/         # Delivery management
│   ├── deliveries.service.ts
│   ├── deliveries.controller.ts
│   └── ...
│
├── payments/           # Payment processing
│   └── ...
│
├── notifications/      # FCM & notification service
│   ├── fcm.service.ts
│   ├── notification.service.ts
│   └── kafka-consumers/  # Notification consumers
│
├── location/           # Location tracking service
│   ├── location.service.ts
│   ├── geospatial.service.ts  # PostGIS queries
│   └── ...
│
├── analytics/          # Analytics & reporting
│   └── ...
│
├── kafka/              # Kafka producers/consumers
│   ├── kafka.module.ts
│   ├── kafka.producer.service.ts
│   └── consumers/      # Event consumers
│
└── websocket/          # WebSocket server
    ├── websocket.gateway.ts
    └── ...
```

---

## 📈 Scalability Strategies

### 1. **Horizontal Scaling**

- **API Instances**: Run multiple NestJS instances behind load balancer
- **Database**: Read replicas for read operations
- **Kafka**: Multiple partitions, multiple consumer instances
- **Redis**: Redis Cluster for distributed caching

### 2. **Caching Strategy**

```typescript
// Redis Cache Layers
1. L1: In-memory cache (Node.js) - 1-5 minutes
2. L2: Redis - 5-60 minutes
3. L3: Database - Source of truth

// Cache Keys
- user_profile:{userId} - TTL: 30 minutes
- rider_location:{riderId} - TTL: 60 seconds
- partner_info:{partnerId} - TTL: 1 hour
- order_details:{orderId} - TTL: 15 minutes
- fcm_tokens:{userId} - TTL: 1 hour
```

### 3. **Database Optimization**

- **Connection Pooling**: Max 20 connections per instance
- **Query Optimization**: Use indexes, avoid N+1 queries
- **Read Replicas**: Route read queries to replicas
- **Partition Pruning**: Automatic for partitioned tables
- **Batch Operations**: Bulk inserts/updates

### 4. **API Optimization**

- **Pagination**: Limit 50 items per page, cursor-based for large datasets
- **Field Selection**: Allow clients to select fields
- **Compression**: gzip responses
- **Rate Limiting**: Per user/IP (Redis-based)

---

## 🔑 Environment Variables

```env
# Database (Primary)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=gramee_delivery

# Database (Read Replicas)
DATABASE_READ_REPLICA_1_HOST=read-replica-1.example.com
DATABASE_READ_REPLICA_2_HOST=read-replica-2.example.com

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_CLUSTER_NODES=node1:6379,node2:6379,node3:6379

# Kafka
KAFKA_BROKERS=broker1:9092,broker2:9092,broker3:9092
KAFKA_CLIENT_ID=gramee-delivery-api
KAFKA_GROUP_ID=gramee-delivery-group

# Auth Server (External)
AUTH_SERVER_URL=https://auth.example.com
AUTH_SERVER_JWKS_URL=https://auth.example.com/.well-known/jwks.json
AUTH_SERVER_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----...

# FCM
FCM_PROJECT_ID=your-project-id
FCM_PRIVATE_KEY=your-private-key
FCM_CLIENT_EMAIL=your-client-email

# API
PORT=3000
NODE_ENV=production
API_PREFIX=/api/v1

# External Services
GOOGLE_MAPS_API_KEY=your-google-maps-key
PAYMENT_GATEWAY_KEY=your-payment-key

# Scaling
MAX_CONNECTION_POOL_SIZE=20
MIN_CONNECTION_POOL_SIZE=5
CACHE_TTL_USER_PROFILE=1800
CACHE_TTL_RIDER_LOCATION=60
```

---

## 🎯 Implementation Roadmap

### Phase 1: MVP (Months 1-2)
- ✅ NestJS API with PostgreSQL
- ✅ JWT validation from external Auth Server
- ✅ Order & Delivery CRUD
- ✅ Kafka integration (basic topics)
- ✅ FCM notifications (essential events)
- ✅ Basic database partitioning

### Phase 2: Scale Preparation (Months 3-4)
- ✅ Real-time location tracking
- ✅ WebSocket for live updates
- ✅ Payment integration
- ✅ Read replicas setup
- ✅ Redis caching layer
- ✅ Advanced notification system

### Phase 3: Scale Optimization (Months 5-6)
- ✅ TimescaleDB for tracking
- ✅ Database query optimization
- ✅ Kafka consumer scaling
- ✅ API horizontal scaling
- ✅ Advanced analytics
- ✅ Monitoring & alerting

### Phase 4: Enterprise Scale (Months 7+)
- ✅ Database sharding (if needed)
- ✅ Service separation (microservices)
- ✅ Multi-region support
- ✅ Advanced caching strategies
- ✅ Performance tuning

---

## 📚 Additional Resources

- **NestJS**: https://docs.nestjs.com/
- **PostgreSQL Partitioning**: https://www.postgresql.org/docs/current/ddl-partitioning.html
- **TimescaleDB**: https://docs.timescale.com/
- **Kafka**: https://kafka.apache.org/documentation/
- **FCM**: https://firebase.google.com/docs/cloud-messaging
- **TypeORM**: https://typeorm.io/

---

## ✅ Final Recommendations Summary

| Component | Technology | Scalability Feature |
|-----------|-----------|---------------------|
| **Primary Database** | PostgreSQL + PostGIS | Partitioning, Read Replicas, Sharding-ready |
| **Time-Series** | TimescaleDB | Automatic chunking, retention policies |
| **Cache** | Redis Cluster | Distributed caching, high availability |
| **Backend Framework** | NestJS (Node.js + TypeScript) | Horizontal scaling, microservices-ready |
| **Message Queue** | Apache Kafka | Multi-partition, consumer scaling |
| **Push Notifications** | FCM | Batch processing, reliable delivery |
| **Authentication** | External Auth Server | JWT validation, centralized auth |
| **Monitoring** | Prometheus + Grafana | Metrics, alerts, dashboards |

---

**This architecture is designed to scale from thousands to millions of users! 🚀**
