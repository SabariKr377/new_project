import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
      ],
    });
    console.log('Prisma Service Initialized');
  }

  async onModuleInit() {
    console.log('Connecting Prisma...');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.log('Disconnecting Prisma on Module Destroy...');
    await this.$disconnect();
  }

  async onApplicationShutdown() {
    console.log('Disconnecting Prisma on Application Shutdown...');
    await this.$disconnect();
  }
}