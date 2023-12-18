
var express = require('express');
var app = express();
import client from './Bot/Zap';
import { GravarAltomacao } from './Automation/AutoResponse';
import path from 'node:path';
var cors = require('cors')


app.use(express.static(path.join(__dirname, '../../app')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions))

//https://bot-service-nqh5.onrender.com/

app.get('/', (req: any, res: any) => {
    res.sendFile('/index.html')
});

app.post('/post/', async function (req: any, res: any) {

    const dadosCorpo = req.body;
    let Pergunta = dadosCorpo.Per;
    let Respota = dadosCorpo.Rep;

    if (Pergunta && Respota) {
        try {
            await GravarAltomacao(Pergunta, Respota)
        } catch (err) {
            console.log('Erro da função ao gravar na DB')
        }
    }else{
        console.log('Erro Dados não batem...')
    }
    

    res.status(200).json({ message: 'ok' });

});

client.initialize();
app.listen(3000, () => {
    console.log('Servidor rondao na 3000')
})