import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Event {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  startDate: Date;

  @Column()
  @Field()
  endDate: Date;

  @Column()
  @Field()
  image: string;
}

@InputType()
export class EventInput {
  @Field()
  name: string;
  
  @Field()
  startDate: Date;
}
export default Event;
