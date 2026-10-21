import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private readonly repo: Repository<Order>) {}

  findAll(): Promise<Order[]> {
    return this.repo.find({ take: 50, order: { createdAt: 'DESC' } });
  }
}


