import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

import Event from "./Event";

@ObjectType()
export class Events {
  @Field()
  id: number;

  @Field()
  name: string;
}

@Entity()
@ObjectType()
class Action {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  points: number;

  @Field(() => [Event])
  @ManyToMany(() => Event, (event) => event.actions, { cascade: true })
  @JoinTable()
  events: Event[];
}

@InputType()
export class ActionInput {

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  points: number;

  @Field(() => [Number], { nullable: true })
  eventsId?: number[];
}
export default Action;
