const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaBtn = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector("#start-pause")
const imagemButton = document.querySelector('#start-pause img')
const btInicarPausar = document.querySelector('#start-pause span')
const tempoTela = document.querySelector('#timer')

//Sons usados
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const playSon = new Audio('/sons/play.wav')
const pauseSon = new Audio('/sons/pause.mp3')
const beepSon = new Audio('sons/beep.mp3')

musica.loop = true

let tempoEmSegundos = 1500
let intervaloId = null

musicaBtn.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


focoBtn.addEventListener('click', () => {
    tempoEmSegundos = 1500
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener('click', () => {
    tempoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')

})

longoBtn.addEventListener('click', () => {
    tempoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')

})


function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src', `/imagens/${contexto}.png`)
    botoes.forEach(contexto => {
        contexto.classList.remove('active')
    })
    tempoNaTela()

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = ` Hora de voltar à superfície.
            <strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoEmSegundos <= 0) {
        //beepSon.play()
        zerar()
        alert('Acabou o tempo')
        return
    } 
    tempoEmSegundos -= 1
    tempoNaTela()    
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        pauseSon.play()
        zerar()
        return
    }
    playSon.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    btInicarPausar.textContent = "Pausar"
    imagemButton.setAttribute('src', '/imagens/pause.png')

}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    btInicarPausar.textContent = "Começar"
    imagemButton.setAttribute('src', '/imagens/play_arrow.png')
}

function tempoNaTela() {
    const tempo = new Date(tempoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: "2-digit", second: "2-digit"})
    tempoTela.innerHTML = tempoFormatado
}

tempoNaTela()