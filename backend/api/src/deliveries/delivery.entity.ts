import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'deliveries' })
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ name: 'delivery_number', type: 'varchar', length: 50 })
  deliveryNumber!: string;

  @Index()
  @Column({ name: 'order_id', type: 'uuid' })
  orderId!: string;

  @Index()
  @Column({ name: 'rider_id', type: 'uuid', nullable: true })
  riderId!: string | null;

  @Index()
  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}


