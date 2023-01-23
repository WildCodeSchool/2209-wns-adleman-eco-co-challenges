import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User, { FriendInput, UserInput } from "../entity/User";

import DataSource from "../db";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await DataSource.getRepository(User).find();

    return users.map((user) => ({
      id: user.id,
      nickName: user.nickName,
      password: user.password,
      role: user.role,
      xp: user.xp,
      image: user.image,
      friends: user.friends,
      eventOfUser: user.eventOfUser,
    }));
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    return await DataSource.getRepository(User).save({ ...data });
  }

  @Mutation(() => User)
  async createNewFriend(@Arg('userId') userId: number, @Arg("friendId") friendId: number): Promise<User> {

    try {
      const userToChange: User | null = await DataSource.getRepository(User).findOne({where: {id: userId}});
      const friendToChange: User | null = await DataSource.getRepository(User).findOne({where: {id: friendId}});

      if (userToChange != null && friendToChange != null) {

        userToChange?.friends?.push(friendId);

        await DataSource.getRepository(User).save(userToChange);

        friendToChange?.friends?.push(userId);

        await DataSource.getRepository(User).save(friendToChange);

        return userToChange;
      }
      throw new Error("User not found");
    } catch (error) {
      throw new Error("User not found");
    }
  }
}
