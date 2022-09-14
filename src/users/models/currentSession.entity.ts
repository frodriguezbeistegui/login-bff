import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrentSessionDocument = CurrentSession & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true }, _id: true })
export class CurrentSession {
  @Prop({ default: Date.now() })
  creationDate: Date;
  @Prop({ default: Date.now() + 120000 })
  expirationDate: Date;
  @Prop()
  ip: string;
  @Prop()
  provider: string;
}

export const CurrentSessionSchema =
  SchemaFactory.createForClass(CurrentSession);
