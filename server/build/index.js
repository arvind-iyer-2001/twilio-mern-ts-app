"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var tokens_1 = require("./tokens");
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
dotenv_1.default.config();
var PORT = process.env.PORT || 3001;
app.get('/api/greeting', function (req, res) {
    var name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ greeting: "Hello ".concat(name, "!") }));
});
app.get('/video/token', function (req, res) {
    console.log('token requested');
    var identity = req.body.identity;
    var roomName = req.query.roomName;
    console.log(identity, roomName);
    var token = (0, tokens_1.generateTwilioToken)(identity, roomName);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
        roomName: roomName,
        token: token
    }));
});
app.post('/video/token', function (req, res) {
    console.log('token requested');
    var identity = req.body.identity;
    var roomName = req.query.roomName;
    console.log(req.body);
    console.log(identity, roomName);
    var token = (0, tokens_1.generateTwilioToken)(identity, roomName);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
        roomName: roomName,
        token: token
    }));
});
app.listen(PORT, function () {
    return console.log("Express server is running on localhost:".concat(PORT));
});
