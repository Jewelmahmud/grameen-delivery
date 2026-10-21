import { Controller, Get } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveries: DeliveriesService) {}

  @Get()
  list() {
    return this.deliveries.findAll();
  }
}


