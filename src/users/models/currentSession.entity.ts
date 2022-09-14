import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrentSessionDocument = CurrentSession & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true }, _id: true })
export class CurrentSession extends Document {
  @Prop({ select: true, required: true })
  creationDate: Date;

  @Prop({ select: true, required: true })
  expirationDate: Date;

  @Prop({ select: true, required: true })
  ip: string;

  @Prop({ select: true, required: true })
  provider: string;
}

export const CurrentSessionSchema =
  SchemaFactory.createForClass(CurrentSession);
