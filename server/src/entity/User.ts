import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
class EventOfUser {
  @Field()
  id: number;

  @Field()
  name: string;
}

@ObjectType()
class Friends {
  @Field()
  id: number;

  @Field()
  nickName: string;
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

  @Field(() => [Friends])
  @Column({ nullable: true })
  @ManyToMany(() => User, (user) => user.friends)
  friends?: Friends[]; 

  @Field(() => [EventOfUser])
  events?: EventOfUser[];
}

@InputType()
export class UserInput {
  @Field()
  nickName: string;
  
  @Field()
  password: string;
}



export default User;
