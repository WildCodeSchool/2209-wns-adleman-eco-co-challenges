import jwt from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User, {
  getSafeAttributes,
  UserInput,
  verifyPassword,
  hashPassword,
} from "../entity/User";
import { ContextType } from "../index";
import { ApolloError } from "apollo-server-errors";

import DataSource from "../db";
import { env } from "../environment";

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
    const exisitingUser = await DataSource.getRepository(User).findOne({
      where: { nickName: data.nickName },
    });

    if (exisitingUser !== null) throw new ApolloError("USER_ALREADY_EXISTS");

    const hashedPassword: string = await hashPassword(data.password);
    const user = { ...data, hashedPassword, friends: [], eventOfUser: [] };

    return await DataSource.getRepository(User).save(user);
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

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }
}
