import db from "./db";
import User, { hashPassword } from "./entity/User";

async function seed(): Promise<void> {
  await db.initialize();
  await db.getRepository(User).delete({});

  const user1 = {
    nickName: "Charlie",
    hashedPassword: await hashPassword("password1"),
    xp: 30,
    description: "Description for user 1",
  };

  const user2 = {
    nickName: "Alice",
    hashedPassword: await hashPassword("password2"),
    xp: 0,
    description: "Description for user 2",
    friends: [user1],
  };

  const user3 = {
    nickName: "Patrick",
    hashedPassword: await hashPassword("password2"),
    xp: 0,
    description: "Description for user 2",
    friends: [user1, user2],
  };

  await db.getRepository(User).save([user1, user2, user3]);

  
  await db.destroy();
  console.log("done !");
}

seed().catch(console.error);
