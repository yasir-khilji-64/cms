import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { INestApplicationContext } from '@nestjs/common';
import { SeedService } from './seed.service';

async function bootstrap() {
  let _ctx: INestApplicationContext;
  try {
    _ctx = await NestFactory.createApplicationContext(SeedModule);
    const seedService = _ctx.get(SeedService);
    await seedService.create();
  } catch (error) {
    throw error;
  } finally {
    _ctx.close();
  }
}

bootstrap();
