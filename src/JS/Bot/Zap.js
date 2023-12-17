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
Object.defineProperty(exports, "__esModule", { value: true });
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const AutoResponse_1 = require("../Automation/AutoResponse");
const client = new Client({
    authStrategy: new LocalAuth()
});
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});
client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});
client.on('ready', () => {
    console.log('Cliente Rodando');
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    //notifyName = Nome de Usuario 
    // from = Numero da Pessoa
    console.log(`Nova mensagem de ${message.notifyName} de numero ${message.from}`);
    const Resposta = yield (0, AutoResponse_1.AutoResposta)(message.body);
    if (Resposta) {
        client.sendMessage(message.from, Resposta);
    }
}));
exports.default = client;
