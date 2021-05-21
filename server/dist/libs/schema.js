"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var path_1 = __importDefault(require("path"));
var graphql_tools_1 = require("graphql-tools");
var allTypes = merge_graphql_schemas_1.fileLoader(path_1.default.resolve(process.cwd(), './src/api/**/*.graphql'));
var allResolvers = merge_graphql_schemas_1.fileLoader(path_1.default.resolve(__dirname, './../api/**/*.resolvers.*'));
var typeDefs = merge_graphql_schemas_1.mergeTypes(allTypes);
var resolvers = merge_graphql_schemas_1.mergeResolvers(allResolvers);
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
});
exports.default = schema;
