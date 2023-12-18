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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
    origin: 'https://bot-service-nqh5.onrender.com/'
};
app.use(cors(corsOptions));
//https://bot-service-nqh5.onrender.com/
app.get('/', (req, res) => {
    res.sendFile('/index.html');
});
app.post('/post/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dadosCorpo = req.body;
        let Pergunta = dadosCorpo.Per;
        let Respota = dadosCorpo.Rep;
        if (Pergunta && Respota) {
            try {
                yield (0, AutoResponse_1.GravarAltomacao)(Pergunta, Respota);
            }
            catch (err) {
                console.log('Erro da função ao gravar na DB');
            }
        }
        else {
            console.log('Erro Dados não batem...');
        }
        res.status(200).json({ message: 'ok' });
    });
});
Zap_1.default.initialize();
app.listen(3000, () => {
    console.log('Servidor rondao na 3000');
});
