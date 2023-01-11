import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

import Event from "./Event";
import Friend from "../entity/Friend";

@ObjectType()
class EventOfUser {
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
  @Column({ length: 100 , type: "varchar", unique: true})
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
  @Column({ nullable: true })
  image?: string;

  @OneToMany(() =>User, (user) => user.friends)
  friends: Friend[]; 

  @ManyToMany(() => Event)
  @JoinTable()
  events: EventOfUser[];
}

@InputType()
export class UserInput {
  @Field()
  nickName: string;
  
  @Field()
  password: string;
}

@InputType()
export class FriendInput {
  
  @Field()
  friend: string;
}

export default User;
