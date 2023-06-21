"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDB = exports.disconnect = exports.connect = void 0;
const db_1 = require("../../server/src/db");
async function connect() {
    await db_1.default.initialize();
}
exports.connect = connect;
async function disconnect() {
    await db_1.default.destroy();
}
exports.disconnect = disconnect;
async function clearDB() {
    const entities = db_1.default.entityMetadatas;
    return Promise.all(entities.map((entity) => db_1.default.getRepository(entity.name).delete({})));
}
exports.clearDB = clearDB;
//# sourceMappingURL=dbHelpers.js.map