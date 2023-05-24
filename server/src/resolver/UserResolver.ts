import jwt from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User, {
  getSafeAttributes,
  UserInput,
  UserUpdateInput,
  verifyPassword,
  hashPassword,
} from "../entity/User";
import { ContextType } from "../index";
import { ApolloError } from "apollo-server-errors";

import DataSource from "../db";
import { env } from "../environment";

@Resolver(User)
export class UserResolver {
  // Get all users
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await DataSource.getRepository(User).find({
      relations: { friends: true, eventOfUser: true },
    });
    return users;
  }

  // Get user connected
  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }

  // create new user
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const exisitingUser = await DataSource.getRepository(User).findOne({
      where: { nickName: data.nickName },
    });

    if (exisitingUser !== null) throw new ApolloError("USER_ALREADY_EXISTS");

    const hashedPassword: string = await hashPassword(data.password);
    const user = { ...data, hashedPassword, friends: [], eventOfUser: [] };

    return await DataSource.getRepository(User).save(user);
  }

  // Update user
  @Mutation(() => User)
  async updateUser(
    @Arg("data") data: UserUpdateInput,
    @Arg("userId") userId: number
  ): Promise<User> {
    const { friendsId, xp, description, image, password } = data;
    const userUpdated = await DataSource.getRepository(User).findOneOrFail({
      where: { id: userId },
      relations: ["friends"],
    });

    if (typeof friendsId !== "undefined") {
      const friends = await Promise.all(
        friendsId?.map(
          async (id) =>
            await DataSource.getRepository(User).findOneOrFail({
              where: { id },
              relations: { friends: true },
            })
        )
      );

      const newFriendsList = userUpdated.friends.concat(friends);

      const uniqueFriends = newFriendsList.filter(
        (friend, index, self) =>
          index === self.findIndex((f) => f.id === friend.id)
      );

      userUpdated.friends = uniqueFriends;

      await Promise.all(
        uniqueFriends.map(async (uniqueFriend) => {
          const friendToUpdate = await DataSource.getRepository(
            User
          ).findOneOrFail({
            where: { id: uniqueFriend.id },
            relations: { friends: true },
          });
          const newFriendsList = friendToUpdate.friends.concat([userUpdated]);

          const uniqueFriends = newFriendsList.filter(
            (friend, index, self) =>
              index === self.findIndex((f) => f.id === friend.id)
          );

          friendToUpdate.friends = uniqueFriends;

          return await DataSource.manager.save(friendToUpdate);
        })
      );
    }

    if (typeof xp !== "undefined") userUpdated.xp = xp;
    if (typeof description !== "undefined")
      userUpdated.description = description;
    if (typeof image !== "undefined") userUpdated.image = image;
    if (typeof password !== "undefined")
      userUpdated.hashedPassword = await hashPassword(password);

    return await DataSource.manager.save(userUpdated);
  }

  // Remove Friend
  @Mutation(() => User)
  async removeFriendUser(
    @Arg("userId") userId: number,
    @Arg("friendToRemoveId") friendToRemoveId: number
  ): Promise<User> {

    // user that will be updated
    const userUpdated = await DataSource.getRepository(User).findOneOrFail({
      where: { id: userId },
      relations: ["friends"],
    });
    // friend to remove from our list of friends

    const friendToRemove = await DataSource.getRepository(User).findOneOrFail({
      where: { id: friendToRemoveId},
      relations: ["friends"],
    });
  
    // condition to remove friend from our list of friends
    if (typeof friendToRemove !== "undefined") {
      // we filter our existing Friends list to remove the friend we want to remove
      userUpdated.friends = userUpdated.friends.filter(
        (friend) => friend.id !== friendToRemoveId
      );
      // we filter the list of friends of the friend we want to remove to remove from our friend list
      friendToRemove.friends = friendToRemove.friends.filter(
        (friend) => friend.id !== userUpdated.id
      );
      // we save the friend list of the friend we want to remove
      await DataSource.manager.save(friendToRemove);
    }

    return await DataSource.manager.save(userUpdated);
  }

  // Login
  @Mutation(() => String)
  async login(
    @Arg("data") { nickName, password }: UserInput,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    const user = await DataSource.getRepository(User).findOne({
      where: { nickName },
    });

    if (
      user === null ||
      typeof user.hashedPassword !== "string" ||
      !(await verifyPassword(password, user.hashedPassword))
    )
      throw new ApolloError("invalid credentials");

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    ctx.res.cookie("token", token, {
      secure: env.NODE_ENV === "production",
      httpOnly: true,
    });

    return token;
  }

  // Logout
  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType): Promise<string> {
    ctx.res.clearCookie("token");
    return "Déconnection réussie";
  }
}
