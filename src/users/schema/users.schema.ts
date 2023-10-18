import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string[];

  @Prop({ default: true })
  active: boolean;
  static _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
