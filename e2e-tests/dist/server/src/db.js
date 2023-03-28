"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Event_1 = require("./entity/Event");
const User_1 = require("./entity/User");
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "ecochallenge",
    synchronize: true,
    entities: [User_1.default, Event_1.default],
    logging: ["query", "error"],
});
//# sourceMappingURL=db.js.map