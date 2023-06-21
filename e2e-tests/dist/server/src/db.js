"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./entity/Action");
const typeorm_1 = require("typeorm");
const Event_1 = require("./entity/Event");
const User_1 = require("./entity/User");
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: typeof process.env.DB_HOST === "undefined"
        ? "localhost"
        : process.env.DB_HOST,
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    entities: [User_1.default, Event_1.default, Action_1.default],
    logging: ["query", "error"],
});
//# sourceMappingURL=db.js.map