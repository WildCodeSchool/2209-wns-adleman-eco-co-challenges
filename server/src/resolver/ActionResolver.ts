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
    const { title, description, points, eventsId = [] } = data;
   const { id } = await DataSource.getRepository(Action).save({
      title,
      description,
      points,
      events: await Promise.all(eventsId?.map(async (id) => await (DataSource.getRepository(Event).findOneOrFail({ where: { id } })))),
    });

    return await DataSource.getRepository(Action).findOneOrFail({ 
      where: { id },
      relations: ["events"],
    })
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
