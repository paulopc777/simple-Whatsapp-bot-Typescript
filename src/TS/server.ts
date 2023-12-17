
var express = require('express');
var app = express();
import client from './Bot/Zap';
import { GravarAltomacao } from './Automation/AutoResponse';
import path from 'node:path';
var cors = require('cors')


app.use(express.static(path.join(__dirname, '../../app')));

const corsOptions = {
    origin: 'https://bot-service-nqh5.onrender.com/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions))

app.get('/', (req: any, res: any) => {
    res.send({ 'Clinet': 'Read' });
});

app.post('/post', (req: any, res: any) => {
    try {
        GravarAltomacao(req.body.Pergunta, req.body.Reposta);
    } catch (er) {
        console.log(er)
        res.send('err');
    }
    res.send('ok');
});

client.initialize();
app.listen(3000, () => {
    console.log('Servidor rondao na 3000')
})