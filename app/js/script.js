
async function Enviar() {
    const Pergunta = document.getElementById('Pergunta').value;
    const Reposta = document.getElementById('Reposta').value;


    if (Pergunta && Reposta) {
        Send(Pergunta, Reposta)
    }

    if (!Pergunta) {
        TextoTela('Digite a Pergunta')
    } else if (!Reposta) {
        TextoTela('Digite a Reposta')
    }
}


async function TextoTela(TextMessage) {
    const Text = document.getElementById('Text');
    Text.innerText = TextMessage;
}


async function Send(Pergunta, Reposta) {

    var configuracao = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Pergunta: Pergunta, Reposta: Reposta }) 
    };

    const url = 'https://bot-service-nqh5.onrender.com/post';

    fetch(url, configuracao)
        .then(async function (response) {
            return response.json();
        })
        .then(async function (data) {
            console.log('Resposta do servidor:', data);
        })
        .catch(function (error) {
            console.error('Erro:', error);
        });
        
        await Carregando()
}



async function Carregando(){
    const Car = document.getElementById('car')
    const conteiner = document.getElementById('container-form')
    const Text = document.getElementById('Text');

    Car.classList.remove('hidden');
    conteiner.classList.add('hidden')
    setTimeout(() =>{
        Car.classList.add('hidden');
        conteiner.classList.remove('hidden')
    },5000)
}