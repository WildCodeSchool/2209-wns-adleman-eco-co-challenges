import {  Arg, Mutation, Query, Resolver } from "type-graphql";
import Event, {EventInput} from "../entity/Event";

import DataSource from "../db";

@Resolver(Event)
export class EventResolver {
 @Query(() => [Event])

 async events(): Promise<Event[]> {
        const events = await DataSource
    
        .getRepository(Event)
        .find()
        
        return events.map((event) => ({
            
            id: event.id,
            name: event.name,
            startDate: event.startDate,
            endDate: event.endDate,
            image: event.image,
            participant: event.participant,

    }));
    }

    @Mutation(() => Event)
async createEvent (@Arg("data")  data: EventInput): Promise<Event> {
    return await DataSource.getRepository(Event).save({...data});
}
}
    
