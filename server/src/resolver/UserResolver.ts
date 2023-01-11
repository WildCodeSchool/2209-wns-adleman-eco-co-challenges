import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import  User,{ FriendInput, UserInput } from "../entity/User";

import DataSource from "../db";

@Resolver(User)
export class UserResolver {
 @Query(() => [User])
    
    async users(): Promise<User[]> {
        const users = await DataSource

        .getRepository(User)
        .find()
        
        return users.map((user) => ({
            
            id: user.id,
            nickName: user.nickName,
            password: user.password,
            role: user.role,
            xp: user.xp,
            image: user.image,
            friends: user.friends,
            events: user.events,
    }));
    }

    @Mutation(() => User)
async createUser (@Arg("data")  data: UserInput): Promise<User> {
  return await DataSource.getRepository(User).save({...data});
}

@Mutation(() => User)
async updateUser(@Arg("id", () => Int) id: number, @Arg("data")  data: FriendInput): Promise<User> {
const { friend } = data;
const updated = await DataSource.getRepository(User).findOne({ where: { id } });

updated.friends.push(friend)
 await DataSource.getRepository(User).save(updated);

 return user
}
}
