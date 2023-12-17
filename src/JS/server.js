"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
const Zap_1 = __importDefault(require("./Bot/Zap"));
const AutoResponse_1 = require("./Automation/AutoResponse");
const node_path_1 = __importDefault(require("node:path"));
var cors = require('cors');
app.use(express.static(node_path_1.default.join(__dirname, '../../app')));
const corsOptions = {
    origin: 'https://bot-service-nqh5.onrender.com/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send({ 'Clinet': 'Read' });
});
app.post('/post', (req, res) => {
    try {
        (0, AutoResponse_1.GravarAltomacao)(req.body.Pergunta, req.body.Reposta);
    }
    catch (er) {
        console.log(er);
        res.send('err');
    }
    res.send('ok');
});
Zap_1.default.initialize();
app.listen(3000, () => {
    console.log('Servidor rondao na 3000');
});
