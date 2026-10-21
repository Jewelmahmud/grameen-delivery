import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ name: 'order_number', type: 'varchar', length: 50 })
  orderNumber!: string;

  @Index()
  @Column({ name: 'partner_id', type: 'uuid' })
  partnerId!: string;

  @Index()
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId!: string;

  @Index()
  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: string;

  @Column({ name: 'total_amount', type: 'numeric', precision: 10, scale: 2 })
  totalAmount!: string;

  @Index({ unique: true })
  @Column({ name: 'tracking_number', type: 'varchar', length: 50 })
  trackingNumber!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}


