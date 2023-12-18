
async function Enviar() {
    const Pergunta = document.getElementById('Pergunta').value;
    const Reposta = document.getElementById('Reposta').value;


    if (Pergunta && Reposta) {
        Send(Pergunta, Reposta);
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


    //https://bot-service-nqh5.onrender.com/
    axios.post('http://localhost:3000/post', {
        Per: Pergunta,
        Rep: Reposta
    })
        .then((response) => {
            console.log(response)
        })
        .catch((Er) => {
            console.log(Er)
        })
    await Carregando()
}

async function Carregando() {
    const Car = document.getElementById('car');
    const conteiner = document.getElementById('container-form');

    Car.classList.remove('hidden');
    conteiner.classList.add('hidden')
    setTimeout(() => {
        Car.classList.add('hidden');
        conteiner.classList.remove('hidden')
    }, 5000)
}