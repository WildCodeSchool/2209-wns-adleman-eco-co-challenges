import "reflect-metadata";

import { ActionResolver } from "./resolver/ActionResolver";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { EventResolver } from "./resolver/EventResolver";
import User from "./entity/User";
import { UserResolver } from "./resolver/UserResolver";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import cors from "cors";
import datasource from "./db";
import { env } from "./environment";
import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import cookie from "cookie";


export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
  jwtPayload?: jwt.JwtPayload;
}

const start = async (): Promise<void> => {
  await datasource.initialize();
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
      ["/", "/graphql"],
      cors<cors.CorsRequest>({
        origin: env.CORS_ALLOWED_ORIGINS.split(","),
        credentials: true,
      }),
      express.json(),
  );

  app.use(cookieParser());

  const schema = await buildSchema({
    resolvers: [UserResolver, EventResolver, ActionResolver],
    authChecker: async ({ context }: { context: ContextType }, roles) => {
      const tokenInHeaders = context.req.headers.authorization?.split(" ")[1];
      const tokenInCookie = cookie.parse(context.req.headers.cookie ?? "").token;
      const token = tokenInHeaders ?? tokenInCookie;

      if (typeof token !== "string") return false;
      try {
        let decoded;
        if (typeof token === "string")
          decoded = jwt.verify(token, env.JWT_PRIVATE_KEY);
        if (typeof decoded === "object") context.jwtPayload = decoded;
      } catch (err) {}

      let user;
      if (context.jwtPayload != null)
        user = await datasource
          .getRepository(User)
          .findOne({
            where: { id: context.jwtPayload.userId },
            relations: { friends: true, eventOfUser: true },
          });

      if (user !== null) context.currentUser = user;

      if (context.currentUser == null) return false;
      return roles.length === 0 || roles.includes(context.currentUser.role);
    },
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],

    context: ({ req, res }) => {
      return { req, res };
    },
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
