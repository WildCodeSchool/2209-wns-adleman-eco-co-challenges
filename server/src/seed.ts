import db from "./db";
import User, { hashPassword } from "./entity/User";
import Event from "./entity/Event";

async function seed(): Promise<void> {
  await db.initialize();
  await db.getRepository(User).delete({});
  await db.getRepository(Event).delete({});

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
    nickName: "Bob",
    hashedPassword: await hashPassword("password3"),
    xp: 10,
    description: "Description for user 3",
  };

  const user4 = {
    nickName: "Eve",
    hashedPassword: await hashPassword("password4"),
    xp: 20,
    description: "Description for user 4",
  };

  const user5 = {
    nickName: "Mallory",
    hashedPassword: await hashPassword("password5"),
    xp: 5,
    description: "Description for user 5",
    friends: [user3],
  };

  const user6 = {
    nickName: "Oscar",
    hashedPassword: await hashPassword("password6"),
    xp: 15,
    description: "Description for user 6",
    friends: [user1, user5],
  };

  const event1 = {
    name: "Event 1",
    startDate: new Date("2023-03-06"),
    endDate: new Date("2023-03-08"),
    participants: [user1, user2, user3],
  };

  const event2 = {
    name: "Event 2",
    startDate: new Date("2023-03-10"),
    endDate: new Date("2023-03-12"),
    participants: [user2, user3, user4],
  };

  const event3 = {
    name: "Event 3",
    startDate: new Date("2023-03-14"),
    endDate: new Date("2023-03-16"),
    participants: [user1, user4, user5],
  };

  const event4 = {
    name: "Event 4",
    startDate: new Date("2023-03-18"),
    endDate: new Date("2023-03-20"),
    participants: [user2, user4, user6],
  };

  const users = [user1, user2, user3, user4, user5, user6];
  const events = [event1, event2, event3, event4];

  const savedUsers = await db.getRepository(User).save(users);
  const savedEvents = await db.getRepository(Event).save(events);

  console.log("Saved users: ", savedUsers);
  console.log("Saved events: ", savedEvents);
  await db.close();
}

seed().catch((err) => console.log(err));
