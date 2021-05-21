"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var entities_1 = __importDefault(require("../entities"));
var ConnectionOptions = {
    type: 'postgres',
    port: 5432,
    host: process.env.DB_URL,
    synchronize: true,
    logging: true,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: entities_1.default,
};
exports.default = ConnectionOptions;
