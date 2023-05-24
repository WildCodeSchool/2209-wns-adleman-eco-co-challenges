import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import { Matches, MinLength } from "class-validator";
import { argon2id, hash, verify } from "argon2";

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
  id?: number;

  @Field()
  @Column({ length: 100, type: "varchar", unique: true })
  nickName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "varchar" })
  description?: string;

  @Field()
  @Column({ length: 100, type: "varchar" })
  hashedPassword?: string;

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
  friends: User[];

  @Field(() => [Event])
  @ManyToMany(() => Event, (event) => event.participants, { cascade: true })
  @JoinTable()
  eventOfUser?: Event[];
}

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2id,
};

export const hashPassword = async (plainPassword: string): Promise<string> =>
  await hash(plainPassword, hashingOptions);

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => await verify(hashedPassword, plainPassword, hashingOptions);

export const getSafeAttributes = (user: User): User => ({
  ...user,
  hashedPassword: undefined,
});

@InputType()
export class UserInput {
  @Field()
  nickName: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
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

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UserUpdateInput {
  @Field(() => [Number], { nullable: true })
  friendsId?: number[];

  @Field({ nullable: true })
  xp?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  password?: string
}

export default User;
