import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Event, { EventInput } from "../entity/Event";
import User from "../entity/User";

import DataSource from "../db";
import { LessThan, MoreThan } from "typeorm";

@Resolver(Event)
export class EventResolver {
  // This method will filter all events with parameters isOver to get all events that are over or not
  @Query(() => [Event])
  async getEvents(
    @Arg("isOver") isOver: boolean,
    @Arg("userId", { defaultValue: 0 }) userId: number,
  ): Promise<Event[]> {
    const overOrNot = isOver
      ? { endDate: LessThan(new Date()) }
      : { endDate: MoreThan(new Date()) };
    let events = await DataSource.getRepository(Event).find({
      relations: { participants: true, actions: true},
      where: overOrNot,
      order: { startDate: "ASC" },
    });

    if (userId !== 0) {
      events = events.filter((event) =>
        event.participants?.some((participant) => participant.id === userId)
      );
    }
    return events;
  }

  @Mutation(() => Event)
  async createEvent(@Arg("data") data: EventInput): Promise<Event> {
    const { name, startDate, endDate, image, description} = data;
    // format de date à utiliser 2024-01-01
    return await DataSource.getRepository(Event).save({
      name,
      startDate,
      endDate,
      image,
      description,
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

      //   Pour chaque participant on lui rajouter l'event
      await Promise.all(
        participants.map(async (participant) => {
          // faire un nouveau tableau et ajouter à la fin eventUpdated
          participant.eventOfUser = [eventUpdated];
          return await DataSource.manager.save(participant);
        })
      );
    }

    return await DataSource.manager.save(eventUpdated);
  }
}
