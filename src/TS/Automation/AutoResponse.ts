import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function AutoResposta(Message: string) {

    let RespostaAuto = await prisma.pergunta.findMany({
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
    })

    if (!RespostaAuto) {
        RespostaAuto = await prisma.pergunta.findMany({
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
        })

    }

    await prisma.$disconnect();

    if (RespostaAuto && RespostaAuto.length > 0) {
        if (RespostaAuto[0].Tipo_id === 3) {
            return 'Esse item não está mais disponível, temos outros modelos que podem se adequar a sua escolha, teria interesse?'
        }
        return RespostaAuto[0].Respostas[0].Text_Respostas
    } else {
        return false
    }
}

export async function GravarAltomacao(Pergutan: string, Resposta: string) {
    const ResultP = await prisma.pergunta.create({
        data: {
            Text_Pergunta: Pergutan,
            Tipo_id: 1
        },
    })

    const ResultR = await prisma.resposta.create({
        data: {
            Text_Respostas: Pergutan,
            id_Pergunta: ResultP.id_Pergunta
        },
    })

    if(ResultP && ResultR){
        return true
    }else{
        return false
    }
}
