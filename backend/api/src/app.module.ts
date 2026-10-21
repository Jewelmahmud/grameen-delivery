import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { KafkaModule } from './kafka/kafka.module';
import { WebsocketModule } from './websocket/websocket.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Order } from './orders/order.entity';
import { Delivery } from './deliveries/delivery.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'postgres',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'gramee_delivery',
        entities: [Order, Delivery],
        synchronize: false,
        logging: false,
      }),
    }),
    OrdersModule,
    DeliveriesModule,
    KafkaModule,
    WebsocketModule,
    AuthModule,
    RedisModule,
    NotificationsModule,
  ],
})
export class AppModule {}


