import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true }, _id: true })
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ default: true })
  admin: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CurrentSession' })
  currentSession: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   @IsOptional()
//   name: string;

//   @Column()
//   email: string;

//   @Column()
//   @Exclude()
//   password: string;

//   @Column({ default: true })
//   admin: boolean;

//   @OneToOne(() => CurrentSession, (currentSession) => currentSession.user, {
//     cascade: true,
//     nullable: false,
//     eager: true,
//   })
//   @JoinColumn()
//   currentSession: CurrentSession;

//   @AfterInsert()
//   logInsert() {
//     console.log('Inserted User with id ' + this.id);
//   }

//   @AfterUpdate()
//   logUpdate() {
//     console.log('Updated User with id ' + this.id);
//   }

//   @AfterRemove()
//   logRemove() {
//     console.log('Removed User with id' + this.id);
//   }
// }
