import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User, { UserInput } from "../entity/User";

import DataSource from "../db";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await DataSource.getRepository(User).find({
      relations: { friends: true, eventOfUser: true },
    });

    return users;
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const { nickName, password, role, xp, image } = data;
    return await DataSource.getRepository(User).save({
      nickName,
      password,
      role,
      xp,
      image,
    });
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("data") data: UserInput,
    @Arg("userId") userId: number
  ): Promise<User> {
    const { friendsId } = data;
    const userUpdated = await DataSource.getRepository(User).findOneOrFail({
      where: { id: userId },
    });

    if (typeof friendsId !== "undefined") {
      const friends = await Promise.all(
        friendsId?.map(
          async (id) =>
            await DataSource.getRepository(User).findOneOrFail({
              where: { id },
            })
        )
      );
      userUpdated.friends = friends;
      await Promise.all(
        friends.map(async (friend) => {
          friend.friends = [userUpdated];

          return await DataSource.manager.save(friend);
        })
      );
    }

    await DataSource.manager.save(userUpdated);

    return userUpdated;
  }
}
