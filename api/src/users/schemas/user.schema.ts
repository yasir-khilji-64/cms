import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  firstname: string;

  @Prop({
    type: String,
    required: true,
  })
  lastname: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  })
  username: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  dob: Date;

  @Prop({
    type: String,
    required: false,
    default: 'https://gravatar.com/avatar/?s=400&d=identicon',
  })
  picture: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  website: string;

  @Prop({
    type: Boolean,
    required: true,
  })
  gender: boolean;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  socialMediaHandle: string;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  status: boolean;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Role',
      },
    ],
    default: [new Types.ObjectId('000000000000000000000000')],
  })
  roles: Types.ObjectId[];

  @Prop({
    type: String,
    default: null,
    required: false,
  })
  phone: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
