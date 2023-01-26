import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Event, { EventInput } from "../entity/Event";
import User, { UserInput } from "../entity/User";

import DataSource from "../db";

@Resolver(Event)
export class EventResolver {
  @Query(() => [Event])
  async events(): Promise<Event[]> {
    const events = await DataSource.getRepository(Event).find();

    return events.map((event: Event) => ({
      id: event.id,
      name: event.name,
      startDate: event.startDate,
      endDate: event.endDate,
      image: event.image,
      participants: event.participants,
    }));
  }

  @Mutation(() => Event)
  async createEvent(@Arg("data") data: EventInput): Promise<Event> {
    const { name, startDate, endDate, image } = data;
    return await DataSource.getRepository(Event).save({
      name,
      startDate,
      endDate,
      image,
    });
  }

  @Mutation(() => Event)
  async updateEvent(
    @Arg("data") data: EventInput,
    @Arg("eventId") eventId: number
  ): Promise<Event> {
    const { participantsId } = data;
    const eventUpdated = await DataSource.getRepository(Event).findOneOrFail({
      where: { id: eventId },
    });
    // créé le tableau de participants
    if (typeof participantsId !== "undefined") {
      const participants = await Promise.all(
        participantsId?.map(
          async (id) =>
            await DataSource.getRepository(User).findOneOrFail({
              where: { id },
            })
        )
      );
      // rajoute à l'évent le tableau de participants
      eventUpdated.participants = participants;

      // Pour chaque participant on lui rajouter l'event
      await Promise.all(
        participants.map((participant) => {
          // faire un nouveau tableau et ajouter à la fin eventUpdated
          participant.eventOfUser = [eventUpdated];

          return DataSource.manager.save(participant);
        })
      );
    }

    await DataSource.manager.save(eventUpdated);

    return eventUpdated;
  }
}
