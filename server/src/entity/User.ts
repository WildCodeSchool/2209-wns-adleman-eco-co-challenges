import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

import Event from "./Event";

@ObjectType()
export class EventOfUser {
  @Field()
  id: number;

  @Field()
  name: string;
}

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100, type: "varchar", unique: true })
  nickName: string;

  @Field()
  @Column({ length: 100, type: "varchar" })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 100, type: "varchar" })
  role?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  xp?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "varchar" })
  image?: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable({ joinColumn: { name: "users_id_1" } })
  friends?: User[];

  @Field(() => [Event])
  @ManyToMany(() => Event, (event) => event.participants)
  @JoinTable({ joinColumn: { name: "users_id_1" } })
  eventOfUser?: Event[];
}

@InputType()
export class UserInput {
  @Field()
  nickName: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  xp?: number;

  @Field(() => [Number], { nullable: true })
  friendsId?: number[];

  @Field({ nullable: true })
  image?: string;

  @Field(() => [Number], { nullable: true })
  eventOfUser?: number[];
}

export default User;
