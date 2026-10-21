import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, Consumer, logLevel } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer!: Producer;
  private consumer!: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID || 'gramee-delivery-api',
      brokers: (process.env.KAFKA_BROKERS || 'kafka:9092').split(','),
      logLevel: logLevel.NOTHING,
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || 'gramee-delivery-group' });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    // Example subscription (no-op handler)
    await this.consumer.subscribe({ topic: 'order.created', fromBeginning: false });
    await this.consumer.run({ eachMessage: async () => {} });
  }

  async emit(topic: string, message: unknown) {
    await this.producer.send({ topic, messages: [{ value: JSON.stringify(message) }] });
  }

  async onModuleDestroy() {
    await Promise.allSettled([this.consumer.disconnect(), this.producer.disconnect()]);
  }
}


