import { DataSource } from "typeorm";
import Event from "./entity/Event";
import User from "./entity/User";

export default new DataSource({
  type: "postgres",
  host: typeof process.env.DB_HOST === "undefined"
  ? "localhost"
  : process.env.DB_HOST,
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [User, Event],
  logging: ["query", "error"],
});
