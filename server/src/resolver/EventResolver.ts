import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Event, {EventInput} from "../entity/Event";
import User from "../entity/User";
import DataSource from "../db";
import {LessThan, MoreThan} from "typeorm";

@Resolver(Event)
export class EventResolver {
  // This method will filter all events with parameters isOver to get all events that are over or not
  @Query(() => [Event])
  async getEvents(
    @Arg("isOver") isOver: boolean,
    @Arg("userId", { defaultValue: 0 }) userId: number
  ): Promise<Event[]> {
    const overOrNot = isOver
      ? { endDate: LessThan(new Date()) }
      : { endDate: MoreThan(new Date()) };
    let events = await DataSource.getRepository(Event).find({
      relations: { participants: true, actions: true },
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

  @Query(() => Event)
  async getEvent(
      @Arg("id") id: number,
  ): Promise<Event> {
    return await DataSource.getRepository(Event).findOneOrFail({
      relations: { participants: true, actions: true},
      where: {id},
    });
  }
  // format de date à utiliser 2024-01-01
  @Mutation(() => Event)
  async createEvent(@Arg("data") data: EventInput): Promise<Event> {
    let startDateObj, endDateObj;
    const { name, startDate, endDate, image, description } = data;
    if (typeof startDate !== "undefined" && typeof endDate !== "undefined") {
      startDateObj = new Date(startDate);
      endDateObj = new Date(endDate);
      if (startDateObj > endDateObj)
        throw new Error("Start date must be before end date");
    }
    return await DataSource.getRepository(Event).save({
      name,
      startDate: startDateObj,
      endDate: endDateObj,
      image,
      description,
    });
  }

  @Mutation(() => Event)
  async updateEvent(
    @Arg("data") data: EventInput,
    @Arg("eventId") eventId: number
  ): Promise<Event> {
    // Get array of participants id from data input
    const { participantsId, participantsAction } = data;
    // Get event to update from data input
    const eventUpdated = await DataSource.getRepository(Event).findOneOrFail({
      where: { id: eventId },
      // TODO : missing participants
      relations: { participants: true},
    });

    if (typeof participantsId !== "undefined"
        && participantsAction !== undefined
        && participantsAction === "add") {
      participantsId?.map(
          async (id: number) => {
            const newParticipant =
                await DataSource.getRepository(User).findOneOrFail({
                  where: {id},
                });
            if (newParticipant !== null) {
              // Vérification du doublon
              const isDuplicate = eventUpdated.participants?.some(
                  (participant) => participant.id === newParticipant.id
              );
              if (isDuplicate === false) {
                eventUpdated.participants?.push(newParticipant);
              }
            }
          }
      );
    }
    if (typeof participantsId !== "undefined"
        && participantsAction !== undefined
        && participantsAction === "remove") {

      participantsId?.map(
        async (id: number) => {
          const participantToremove
              = await DataSource.getRepository(User).findOneOrFail({
                  where: {id},
          })
          if (participantToremove !== null && eventUpdated.participants !== undefined) {
            eventUpdated.participants = (eventUpdated.participants).filter(
                (participant) => participant.id !== participantToremove.id
            );
          }
        }
      )
    }
    // return the flush
    return await DataSource.manager.save(eventUpdated);
  }
}
