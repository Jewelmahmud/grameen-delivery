import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './delivery.entity';

@Injectable()
export class DeliveriesService {
  constructor(@InjectRepository(Delivery) private readonly repo: Repository<Delivery>) {}

  findAll(): Promise<Delivery[]> {
    return this.repo.find({ take: 50, order: { createdAt: 'DESC' } });
  }
}


