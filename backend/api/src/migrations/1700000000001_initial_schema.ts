import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialSchema1700000000001 implements MigrationInterface {
  name = 'initialSchema1700000000001'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Profiles
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_profiles (
      user_id UUID PRIMARY KEY,
      role VARCHAR(20) NOT NULL CHECK (role IN ('customer','partner','rider','admin')),
      phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS customers (
      user_id UUID PRIMARY KEY REFERENCES user_profiles(user_id),
      default_address TEXT,
      default_location POINT,
      preferences JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_customers_location ON customers USING GIST (default_location)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS partners (
      user_id UUID PRIMARY KEY REFERENCES user_profiles(user_id),
      business_name VARCHAR(255) NOT NULL,
      business_type VARCHAR(50),
      address TEXT,
      location POINT,
      verification_status VARCHAR(20) DEFAULT 'pending',
      rating DECIMAL(3,2),
      created_at TIMESTAMP DEFAULT NOW()
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_partners_location ON partners USING GIST (location)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(verification_status)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_partners_rating ON partners(rating)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS riders (
      user_id UUID PRIMARY KEY REFERENCES user_profiles(user_id),
      vehicle_type VARCHAR(50),
      vehicle_number VARCHAR(50),
      license_number VARCHAR(100),
      online_status BOOLEAN DEFAULT FALSE,
      current_location POINT,
      last_location_update TIMESTAMP,
      rating DECIMAL(3,2),
      total_deliveries INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_riders_location ON riders USING GIST (current_location)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_riders_online_status ON riders(online_status)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_riders_rating ON riders(rating)`);

    // Orders
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      order_number VARCHAR(50) UNIQUE NOT NULL,
      partner_id UUID NOT NULL REFERENCES partners(user_id),
      customer_id UUID NOT NULL REFERENCES customers(user_id),
      status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','preparing','ready','assigned','picked_up','in_transit','delivered','cancelled')),
      total_amount DECIMAL(10,2) NOT NULL,
      delivery_fee DECIMAL(10,2) DEFAULT 0,
      currency VARCHAR(3) DEFAULT 'BDT',
      tracking_number VARCHAR(50) UNIQUE NOT NULL,
      pickup_address TEXT NOT NULL,
      pickup_location POINT,
      delivery_address TEXT NOT NULL,
      delivery_location POINT,
      estimated_delivery_time TIMESTAMP,
      actual_delivery_time TIMESTAMP,
      special_instructions TEXT,
      metadata JSONB,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_partner_id ON orders(partner_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_tracking_number ON orders(tracking_number)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_delivery_location ON orders USING GIST (delivery_location)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders(status, created_at DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_partner_status_created ON orders(partner_id, status, created_at DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_orders_customer_status_created ON orders(customer_id, status, created_at DESC)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS order_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      item_name VARCHAR(255) NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      unit_price DECIMAL(10,2) NOT NULL,
      total_price DECIMAL(10,2) NOT NULL,
      metadata JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)`);

    // Deliveries
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS deliveries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      delivery_number VARCHAR(50) UNIQUE NOT NULL,
      order_id UUID NOT NULL REFERENCES orders(id),
      rider_id UUID REFERENCES riders(user_id),
      status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','assigned','accepted','picked_up','in_transit','delivered','failed','cancelled')),
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
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_deliveries_order_id ON deliveries(order_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_deliveries_rider_id ON deliveries(rider_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_deliveries_status ON deliveries(status)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_deliveries_rider_status ON deliveries(rider_id, status)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_deliveries_pickup_location ON deliveries USING GIST (pickup_location)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_deliveries_delivery_location ON deliveries USING GIST (delivery_location)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_deliveries_created_at ON deliveries(created_at DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_deliveries_rider_status_created ON deliveries(rider_id, status, created_at DESC)`);

    // Delivery tracking (hypertable assumed extensions exist)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS delivery_tracking (
      delivery_id UUID NOT NULL REFERENCES deliveries(id) ON DELETE CASCADE,
      rider_id UUID NOT NULL REFERENCES riders(user_id),
      location POINT NOT NULL,
      latitude DECIMAL(10,8) NOT NULL,
      longitude DECIMAL(11,8) NOT NULL,
      accuracy DECIMAL(5,2),
      speed_kmh DECIMAL(5,2),
      heading DECIMAL(5,2),
      status VARCHAR(20),
      timestamp TIMESTAMP NOT NULL DEFAULT NOW()
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_delivery_tracking_delivery_id ON delivery_tracking(delivery_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_delivery_tracking_timestamp ON delivery_tracking(timestamp DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_delivery_tracking_location ON delivery_tracking USING GIST (location)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_delivery_tracking_delivery_timestamp ON delivery_tracking(delivery_id, timestamp DESC)`);
    await queryRunner.query(`SELECT create_hypertable('delivery_tracking','timestamp', chunk_time_interval => INTERVAL '1 day', if_not_exists => TRUE)`);

    // Payments
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS payments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      payment_number VARCHAR(50) UNIQUE NOT NULL,
      order_id UUID NOT NULL REFERENCES orders(id),
      amount DECIMAL(10,2) NOT NULL,
      currency VARCHAR(3) DEFAULT 'BDT',
      payment_method VARCHAR(50) NOT NULL,
      payment_gateway VARCHAR(50),
      status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed','refunded')),
      transaction_id VARCHAR(255),
      gateway_response JSONB,
      failure_reason TEXT,
      processed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_payments_payment_method ON payments(payment_method)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_payments_status_created ON payments(status, created_at DESC)`);

    // Rider earnings
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS rider_earnings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      rider_id UUID NOT NULL REFERENCES riders(user_id),
      delivery_id UUID NOT NULL REFERENCES deliveries(id),
      order_id UUID NOT NULL REFERENCES orders(id),
      amount DECIMAL(10,2) NOT NULL,
      commission_percentage DECIMAL(5,2),
      payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending','processing','paid','cancelled')),
      payment_date DATE,
      paid_at TIMESTAMP,
      transaction_reference VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_rider_earnings_rider_id ON rider_earnings(rider_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_rider_earnings_delivery_id ON rider_earnings(delivery_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_rider_earnings_payment_status ON rider_earnings(payment_status)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_rider_earnings_payment_date ON rider_earnings(payment_date DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_rider_earnings_rider_date ON rider_earnings(rider_id, payment_date DESC)`);

    // Notifications
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS notifications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL,
      type VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      data JSONB,
      read BOOLEAN DEFAULT FALSE,
      read_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, read, created_at DESC)`);

    // FCM tokens
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS fcm_tokens (
      user_id UUID NOT NULL,
      token VARCHAR(255) NOT NULL,
      device_type VARCHAR(20) CHECK (device_type IN ('android','ios','web')),
      device_id VARCHAR(255),
      app_version VARCHAR(20),
      is_active BOOLEAN DEFAULT TRUE,
      last_used_at TIMESTAMP DEFAULT NOW(),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (user_id, token)
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_fcm_tokens_user_id ON fcm_tokens(user_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_fcm_tokens_active ON fcm_tokens(is_active)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_fcm_tokens_last_used ON fcm_tokens(last_used_at DESC)`);

    // Audit log (hypertable)
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS event_audit_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_type VARCHAR(100) NOT NULL,
      entity_type VARCHAR(50) NOT NULL,
      entity_id UUID NOT NULL,
      user_id UUID,
      action VARCHAR(50) NOT NULL,
      old_data JSONB,
      new_data JSONB,
      metadata JSONB,
      ip_address INET,
      user_agent TEXT,
      timestamp TIMESTAMP DEFAULT NOW() NOT NULL
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_event_audit_event_type ON event_audit_log(event_type)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_event_audit_entity ON event_audit_log(entity_type, entity_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_event_audit_user_id ON event_audit_log(user_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_event_audit_timestamp ON event_audit_log(timestamp DESC)`);
    await queryRunner.query(`SELECT create_hypertable('event_audit_log','timestamp', chunk_time_interval => INTERVAL '1 day', if_not_exists => TRUE)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS order_items`);
    await queryRunner.query(`DROP TABLE IF EXISTS deliveries`);
    await queryRunner.query(`DROP TABLE IF EXISTS orders`);
    await queryRunner.query(`DROP TABLE IF EXISTS delivery_tracking`);
    await queryRunner.query(`DROP TABLE IF EXISTS payments`);
    await queryRunner.query(`DROP TABLE IF EXISTS rider_earnings`);
    await queryRunner.query(`DROP TABLE IF EXISTS notifications`);
    await queryRunner.query(`DROP TABLE IF EXISTS fcm_tokens`);
    await queryRunner.query(`DROP TABLE IF EXISTS event_audit_log`);
    await queryRunner.query(`DROP TABLE IF EXISTS riders`);
    await queryRunner.query(`DROP TABLE IF EXISTS partners`);
    await queryRunner.query(`DROP TABLE IF EXISTS customers`);
    await queryRunner.query(`DROP TABLE IF EXISTS user_profiles`);
  }
}


