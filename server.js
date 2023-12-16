"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const Zap_1 = __importDefault(require("./src/JS/Bot/Zap"));
const cors_1 = __importDefault(require("@fastify/cors"));
require("@fastify/static");
const AutoResponse_1 = require("./src/JS/Automation/AutoResponse");
const node_path_1 = __importDefault(require("node:path"));
const app = (0, fastify_1.default)({
    logger: false
});
app.register(cors_1.default, {
    origin: (origin, cb) => {
        cb(null, true);
    }
});
app.register(require('@fastify/static'), {
    root: node_path_1.default.join(__dirname, '../../app'),
    prefix: '/app/'
});
app.get('/', (req, res) => {
    return { 'Clinet': 'Read' };
});
app.post('/post', (req, res) => {
    try {
        (0, AutoResponse_1.GravarAltomacao)(req.body.Pergunta, req.body.Reposta);
    }
    catch (er) {
        console.log(er);
        return 'err';
    }
    return 'ok';
});
Zap_1.default.initialize();
app.listen({ port: 80 }).then(result => console.log('Servidor rando no 80'));
