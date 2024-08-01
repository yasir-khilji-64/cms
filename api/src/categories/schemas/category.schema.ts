import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'categories',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Category {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  picture: string;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  description: string;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  status: boolean;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { status: { $ne: false } } });
});
