import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Order } from './orders/order.entity';
import { Delivery } from './deliveries/delivery.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'postgres',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'gramee_delivery',
  entities: [Order, Delivery],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: false,
  logging: false,
});


