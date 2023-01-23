import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, Int, ObjectType } from "type-graphql";

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
  @Column({ nullable: true, type: "varchar" })
  image?: string;

  
  @Field(() => [Int], { nullable: true })
  @Column({ nullable: true })
  friends?: number[]; 

  @ManyToMany(() => Event)
  @Field(() => [Event])
  eventOfUser: Event[];
}

@InputType()
export class UserInput {
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
}


@InputType()
export class FriendInput {
  
  @Field()
  @Column({ length: 100 , type: "varchar", unique: true})
  nickName: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 100, type: "varchar" })
  role?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  xp?: number;
}

export default User;
