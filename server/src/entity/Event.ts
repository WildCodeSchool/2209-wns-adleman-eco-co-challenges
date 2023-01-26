import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

import User from "./User";

@Entity()
@ObjectType()
class Event {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image: string;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];
}

@InputType()
export class EventInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  image: string;

  @Field(() => [Number], { nullable: true })
  participantsId?: number[];
}
export default Event;
