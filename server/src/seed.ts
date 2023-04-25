
import User, { hashPassword } from "./entity/User";

import Event from "./entity/Event";
import db from "./db";


async function seed(): Promise<void> {
  await db.initialize();
  await db.getRepository(User).delete({});
  await db.getRepository(Event).delete({});

  const user1 = {
    nickName: "Charlie",
    hashedPassword: await hashPassword("Password1"),
    xp: 3530,
    description: "Sed velit risus, porttitor vel quam in, dignissim maximus mauris. Aliquam quis neque vitae eros tincidunt semper. Aenean fringilla neque tellus. Vivamus non sapien eget diam congue mattis non vitae est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed efficitur augue felis. Quisque a commodo dui.",
  };

  const user2 = {
    nickName: "Alice",
    hashedPassword: await hashPassword("Password2"),
    xp: 0,
    description: "Donec lobortis dolor tortor, porttitor blandit neque pharetra id. Nulla sit amet ullamcorper turpis. Nunc eget dignissim massa. Morbi dignissim in ligula eget elementum. Maecenas rhoncus nisl odio, in interdum mi posuere eget. Nulla porta a est eu porta. Vestibulum malesuada erat vel purus condimentum commodo. Integer tincidunt lectus quis enim imperdiet efficitur. Vivamus pretium nulla at lectus laoreet facilisis. Duis porta lacus vel massa commodo, at viverra nisi tempor.",
    friends: [user1], 
  };

  const user3 = {
    nickName: "Bob",
    hashedPassword: await hashPassword("Password3"),
    xp: 10,
    description: "Suspendisse lacinia metus lectus, id ullamcorper nisl venenatis quis. Donec auctor massa ac ullamcorper tincidunt. Vivamus egestas erat quam, sit amet blandit lacus imperdiet at. Donec interdum vel enim at pharetra. Integer varius ultricies nisl, vel ultrices lectus facilisis ac. Cras ac dolor mollis, pellentesque nisi nec, convallis orci. Etiam tincidunt maximus nulla at volutpat. Morbi euismod arcu non pretium varius. In a felis orci. Sed blandit lacus et est efficitur, id dignissim augue iaculis. Mauris ornare metus eu lorem lacinia, non porttitor lorem pretium. Nullam nisi purus, tincidunt id bibendum id, ultrices ut leo. Vivamus vitae aliquam odio.",
  };

  const user4 = {
    nickName: "Eve",
    hashedPassword: await hashPassword("Password4"),
    xp: 20,
    description: "Praesent sed lorem eget purus ornare maximus ac at nibh. Nam ut turpis vel tellus venenatis luctus in ut metus. Mauris egestas nulla orci, sit amet lacinia ex aliquam sed. Curabitur porttitor felis elit, at ullamcorper elit dignissim sit amet. Integer aliquam massa sit amet laoreet pharetra. Integer venenatis accumsan nulla, eu cursus magna semper vel. Suspendisse potenti. Vivamus finibus arcu lacinia, sagittis ipsum ut, tincidunt neque. Pellentesque egestas purus quis lobortis imperdiet. Ut sit amet tristique arcu, sed auctor eros. Cras tristique, lacus non convallis hendrerit, dui libero porttitor nisi, non mollis urna enim in nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean tortor nibh, hendrerit sed ultricies consectetur, facilisis id nunc.",
  };

  const user5 = {
    nickName: "Mallory",
    hashedPassword: await hashPassword("Password5"),
    xp: 5,
    description: "Pellentesque ante turpis, mattis et finibus sit amet, laoreet sed eros. Nullam commodo diam non dui bibendum, at consequat felis iaculis. Nullam aliquam nunc ac purus rhoncus, tincidunt fermentum sem commodo. Vestibulum et sollicitudin turpis. Mauris mattis, nisi at convallis fermentum, lorem elit accumsan purus, eu ultricies dui sapien ac turpis. In sit amet vehicula nisl. Suspendisse potenti. Sed pharetra, magna quis faucibus porttitor, enim metus dapibus eros, nec efficitur massa velit sollicitudin enim. Etiam semper ornare tortor. Fusce sit amet nisl convallis orci tincidunt tempor eget in dui. In sodales sem quis velit placerat volutpat. Quisque bibendum mollis faucibus.",
    friends: [user3],
  };

  const user6 = {
    nickName: "Oscar",
    hashedPassword: await hashPassword("Password6"),
    xp: 15,
    description: "Aenean quis diam a nulla dictum lacinia sit amet eget mauris. Sed et mattis lectus. Fusce lorem lectus, pretium id faucibus vitae, convallis vitae sem. Duis id neque vitae nibh consectetur ornare porttitor blandit urna. Maecenas ut ex sapien. Nullam tempus turpis arcu, nec condimentum sapien ultrices in. Cras a purus vitae nunc ultricies condimentum. Cras mauris ex, tincidunt id mauris nec, sagittis lobortis sem. Pellentesque eget condimentum lectus, id euismod urna. Nulla suscipit dictum quam at lobortis. Integer vel tortor vulputate, finibus purus sodales, hendrerit arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In quis dui tincidunt, porta orci quis, fringilla orci. Nunc luctus imperdiet augue, at convallis ante. Vestibulum tincidunt dolor ante, accumsan sagittis diam feugiat et. Nulla nulla nunc, tincidunt eu tincidunt eu, tristique sit amet ipsum.",
    friends: [user1, user2, user3, user4, user5],
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
