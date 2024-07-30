import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';
import { SeedService } from './seed.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_HOST: Joi.string().required(),
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
