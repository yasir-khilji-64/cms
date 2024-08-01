import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'tags',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Tag {
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
    type: Boolean,
    required: false,
    default: true,
  })
  active: boolean;
}

export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { active: { $ne: false } } });
});
