"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var fs_1 = __importDefault(require("fs"));
var moment_1 = __importDefault(require("moment"));
var csvtojson_1 = __importDefault(require("csvtojson"));
var upload = new koa_router_1.default();
aws_sdk_1.default.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
var s3 = new aws_sdk_1.default.S3({
    apiVersion: '2006-03-01',
});
var Bucket = 'file.closed-status.shop';
upload.post('/', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var file, _a, key, url;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!ctx.request.files) return [3 /*break*/, 2];
                file = ctx.request.files.file;
                return [4 /*yield*/, uploadFile(file)];
            case 1:
                _a = _b.sent(), key = _a.key, url = _a.url;
                ctx.body = { key: key, url: url };
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, next()];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
upload.get('/:id', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!('GET' != ctx.method)) return [3 /*break*/, 2];
                return [4 /*yield*/, next()];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                id = ctx.params.id;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, getFile(id)];
            case 4:
                data = _a.sent();
                ctx.body = data;
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                ctx.throw(500, err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
var uploadFile = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var stream = fs_1.default.createReadStream(file.path);
                var saveTime = "" + moment_1.default().format('YYMMDD_HHmmdd');
                var newFilename = saveTime + "_" + file.name.trim();
                stream.on('error', function (err) {
                    reject(err);
                });
                s3.upload({
                    Bucket: Bucket,
                    Body: stream,
                    Key: newFilename,
                    ContentType: file.type,
                }, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    else if (data) {
                        resolve({
                            key: data.Key,
                            url: data.Location,
                        });
                    }
                });
            })];
    });
}); };
var getFile = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var stream, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                stream = s3
                    .getObject({
                    Bucket: Bucket,
                    Key: name,
                })
                    .createReadStream();
                return [4 /*yield*/, csvtojson_1.default().fromStream(stream)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
exports.default = upload;
