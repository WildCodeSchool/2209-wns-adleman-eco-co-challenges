import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { EventResolver } from "./resolver/EventResolver";
import { UserResolver } from "./resolver/UserResolver";
import { buildSchema } from "type-graphql";
import cors from "cors";
import datasource from "./db";
import { env } from "./environment";
import express from "express";
import http from "http";

const start = async (): Promise<void> => {
  await datasource.initialize();
  const app = express();
  const httpServer = http.createServer(app);

  const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",");


  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (typeof origin === "undefined" || (Boolean(allowedOrigins.includes(origin))))
          return callback(null, true);
        callback(new Error("Not allowed by CORS"));
      },
    })
  );

  
  const schema = await buildSchema({
    resolvers: [UserResolver, EventResolver],
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: "/" });
  httpServer.listen({ port: env.SERVER_PORT }, () =>
    console.log(
      `🚀 Server ready at ${env.SERVER_HOST}:${env.SERVER_PORT}${server.graphqlPath}`
    )
  );
};

void start();
