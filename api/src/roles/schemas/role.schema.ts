import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'roles',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Role {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  name: string;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  status: boolean;
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
