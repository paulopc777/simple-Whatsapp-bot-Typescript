const { Client, LocalAuth } = require('whatsapp-web.js');
import qrcode from 'qrcode-terminal';
import { AutoResposta } from '../Automation/AutoResponse'


const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr: any) => {
    qrcode.generate(qr, { small: true });
});

client.on('loading_screen', (percent: any, message: any) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('ready', () => {
    console.log('Cliente Rodando');
});

client.on('message', async (message: any) => {
    //notifyName = Nome de Usuario 
    // from = Numero da Pessoa
    console.log(`Nova mensagem de ${message.notifyName} de numero ${message.from}`)
    const Resposta = await AutoResposta(message.body);
    if (Resposta) {
        client.sendMessage(message.from, Resposta)
    }
})

export default client;

