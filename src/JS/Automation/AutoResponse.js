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
exports.GravarAltomacao = exports.AutoResposta = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function AutoResposta(Message) {
    return __awaiter(this, void 0, void 0, function* () {
        let RespostaAuto = yield prisma.pergunta.findMany({
            where: {
                Text_Pergunta: {
                    startsWith: Message
                }
            },
            include: {
                Respostas: {
                    select: {
                        Text_Respostas: true
                    }
                }
            }
        });
        if (!RespostaAuto) {
            RespostaAuto = yield prisma.pergunta.findMany({
                where: {
                    Text_Pergunta: {
                        contains: Message
                    }
                },
                include: {
                    Respostas: {
                        select: {
                            Text_Respostas: true
                        }
                    }
                }
            });
        }
        yield prisma.$disconnect();
        if (RespostaAuto && RespostaAuto.length > 0) {
            if (RespostaAuto[0].Tipo_id === 3) {
                return 'Esse item não está mais disponível, temos outros modelos que podem se adequar a sua escolha, teria interesse?';
            }
            return RespostaAuto[0].Respostas[0].Text_Respostas;
        }
        else {
            return false;
        }
    });
}
exports.AutoResposta = AutoResposta;
function GravarAltomacao(Pergutan, Resposta) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ResultP = yield prisma.pergunta.create({
                data: {
                    Text_Pergunta: Pergutan,
                    Tipo_id: 1
                },
            });
            const ResultR = yield prisma.resposta.create({
                data: {
                    Text_Respostas: Resposta,
                    id_Pergunta: ResultP.id_Pergunta
                },
            });
            if (ResultP && ResultR) {
                console.log('Altomação Criada');
                return true;
            }
            else {
                return false;
            }
        }
        catch (Err) {
            console.log('Erro automação ja existe...');
        }
    });
}
exports.GravarAltomacao = GravarAltomacao;
