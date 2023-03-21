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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateInput = exports.UserInput = exports.getSafeAttributes = exports.verifyPassword = exports.hashPassword = exports.EventOfUser = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const argon2_1 = require("argon2");
const Event_1 = require("./Event");
let EventOfUser = class EventOfUser {
    id;
    name;
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], EventOfUser.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EventOfUser.prototype, "name", void 0);
EventOfUser = __decorate([
    (0, type_graphql_1.ObjectType)()
], EventOfUser);
exports.EventOfUser = EventOfUser;
let User = User_1 = class User {
    id;
    nickName;
    description;
    hashedPassword;
    role;
    xp;
    image;
    friends;
    eventOfUser;
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 100, type: "varchar", unique: true }),
    __metadata("design:type", String)
], User.prototype, "nickName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 100, type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "hashedPassword", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, length: 100, type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "xp", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1]),
    (0, typeorm_1.ManyToMany)(() => User_1, (user) => user.friends),
    (0, typeorm_1.JoinTable)({ joinColumn: { name: "users_id_1" } }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Event_1.default]),
    (0, typeorm_1.ManyToMany)(() => Event_1.default, (event) => event.participants, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "eventOfUser", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], User);
const hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2_1.argon2id,
};
const hashPassword = async (plainPassword) => (0, argon2_1.hash)(plainPassword, hashingOptions);
exports.hashPassword = hashPassword;
const verifyPassword = async (plainPassword, hashedPassword) => (0, argon2_1.verify)(hashedPassword, plainPassword, hashingOptions);
exports.verifyPassword = verifyPassword;
const getSafeAttributes = (user) => ({
    ...user,
    hashedPassword: undefined,
});
exports.getSafeAttributes = getSafeAttributes;
let UserInput = class UserInput {
    nickName;
    password;
    role;
    xp;
    friendsId;
    image;
    eventOfUser;
    description;
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "nickName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "role", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UserInput.prototype, "xp", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Number], { nullable: true }),
    __metadata("design:type", Array)
], UserInput.prototype, "friendsId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Number], { nullable: true }),
    __metadata("design:type", Array)
], UserInput.prototype, "eventOfUser", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "description", void 0);
UserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserInput);
exports.UserInput = UserInput;
let UserUpdateInput = class UserUpdateInput {
    friendsId;
    xp;
};
__decorate([
    (0, type_graphql_1.Field)(() => [Number], { nullable: true }),
    __metadata("design:type", Array)
], UserUpdateInput.prototype, "friendsId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UserUpdateInput.prototype, "xp", void 0);
UserUpdateInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserUpdateInput);
exports.UserUpdateInput = UserUpdateInput;
exports.default = User;
//# sourceMappingURL=User.js.map