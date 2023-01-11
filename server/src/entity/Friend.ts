import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";


@Entity()
@ObjectType()
export default class Friend {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;
  
    @Column({ nullable: true })
    @Field({ nullable: true })
    name: string;
    
  }