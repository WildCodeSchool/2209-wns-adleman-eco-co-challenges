"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionInput = exports.Events = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Event_1 = require("./Event");
let Events = class Events {
    id;
    name;
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Events.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Events.prototype, "name", void 0);
Events = __decorate([
    (0, type_graphql_1.ObjectType)()
], Events);
exports.Events = Events;
let Action = class Action {
    id;
    title;
    description;
    points;
    events;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], Action.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Action.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Action.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Action.prototype, "points", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Event_1.default]),
    (0, typeorm_1.ManyToMany)(() => Event_1.default, (event) => event.actions, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Action.prototype, "events", void 0);
Action = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Action);
let ActionInput = class ActionInput {
    title;
    description;
    points;
    eventId;
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ActionInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ActionInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ActionInput.prototype, "points", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ActionInput.prototype, "eventId", void 0);
ActionInput = __decorate([
    (0, type_graphql_1.InputType)()
], ActionInput);
exports.ActionInput = ActionInput;
exports.default = Action;
//# sourceMappingURL=Action.js.map