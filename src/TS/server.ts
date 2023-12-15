import Fastify from 'fastify';
import client from './Bot/Zap';
import cors from '@fastify/cors'
import '@fastify/static'

import { GravarAltomacao } from './Automation/AutoResponse';
import path from 'node:path';

const app = Fastify({
    logger: false
})

app.register(cors, {
    origin: (origin, cb) => {
        cb(null, true)
    }
})

app.register(require('@fastify/static'), {
    root: path.join(__dirname, '../../app'),
    prefix: '/app/'
})

app.get('/', (req: any, res: any) => {
    return { 'Clinet': 'Read' }
});

app.post('/post', (req: any, res: any) => {
    try {
        GravarAltomacao(req.body.Pergunta, req.body.Reposta);
    } catch (er) {
        console.log(er)
        return 'err';
    }
    return 'ok';
});

client.initialize();
app.listen({ port: 80 }).then(result => console.log('Servidor rando no 80'))