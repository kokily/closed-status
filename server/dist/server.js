"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var https_1 = __importDefault(require("https"));
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var typeorm_1 = require("typeorm");
var app_1 = __importDefault(require("./app"));
var ormConfig_1 = __importDefault(require("./libs/ormConfig"));
// SSL Config
var configurations = {
    production: { ssl: true, port: 443, hostname: 'closed-status.shop' },
    development: { ssl: false, port: 4000, hostname: 'localhost' },
};
var environment = process.env.NODE_ENV || 'production';
var config = configurations[environment];
var server;
if (config.ssl) {
    server = https_1.default.createServer({
        key: fs_1.default.readFileSync("" + process.env.SSL_KEY),
        cert: fs_1.default.readFileSync("" + process.env.SSL_CERT),
    }, app_1.default.callback());
}
else {
    server = http_1.default.createServer(app_1.default.callback());
}
typeorm_1.createConnection(ormConfig_1.default)
    .then(function () {
    server.listen(config.port, function () {
        console.log("> Apollo server on http(s)://" + config.hostname + ":" + config.port);
    });
})
    .catch(function (err) { return console.error(err); });
