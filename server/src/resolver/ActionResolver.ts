import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Action, { ActionInput } from "../entity/Action";
import Event from "../entity/Event";

import DataSource from "../db";

@Resolver(Action)
export class ActionResolver {
  @Query(() => [Action])
  async actions(): Promise<Action[]> {
    const actions = await DataSource.getRepository(Action).find({
      relations: { events: true },
    });
    return actions;
  }

  @Mutation(() => Action)
  async createAction(@Arg("data") data: ActionInput): Promise<Action> {
    const { title, description, points, eventId} = data;
   const action = await DataSource.getRepository(Action).save({
      title,
      description,
      points, 
      eventId,
    });

    if(typeof eventId !== "undefined") {
      const event = await DataSource.getRepository(Event).findOneOrFail({
        where: { id: eventId },
        relations: { actions: true },
      });
      event.actions?.push(action);
      await DataSource.getRepository(Event).save(event);
    }
    return await DataSource.getRepository(Action).findOneOrFail({
      where: { id: action.id },
      relations: { events: true },
    });
  } 

  @Mutation(() => Action)
  async deleteAction(@Arg("actionId") actionId: number): Promise<Action> {
    const actionDeleted = await DataSource.getRepository(Action).findOneOrFail({
      where: { id: actionId },
    });
    await DataSource.getRepository(Action).delete(actionId);
    return actionDeleted;
  }
}
