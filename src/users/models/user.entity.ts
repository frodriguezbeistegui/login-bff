import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
export type UserDocument = User & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true }, _id: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  admin: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CurrentSession' })
  currentSession: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
