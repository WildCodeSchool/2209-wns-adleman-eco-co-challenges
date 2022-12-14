import { DataSource } from "typeorm";
import Event from "./entity/Event";
import User from "./entity/User";

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "ecochallenge",
  synchronize: true,
  entities: [User, Event],
  logging: ["query", "error"],
});
