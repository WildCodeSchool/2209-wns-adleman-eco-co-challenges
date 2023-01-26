import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { EventResolver } from "./resolver/EventResolver";
import { UserResolver } from "./resolver/UserResolver";
import { buildSchema } from "type-graphql";
import datasource from "./db";

const start = async (): Promise<void> => {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver, EventResolver],
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.listen().then(({ url }) => {
    console.log(`🚀  oServer ready at ${url}`);
  });
};

void start();
