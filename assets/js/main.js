const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const startPauseBt = document.querySelector('#start-pause')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const buttons = document.querySelectorAll('.app__card-button')
const startPauseText = document.querySelector('#start-pause span')
const startPauseIcon = document.querySelector('.app__card-primary-butto-icon')
const startIcon = new Image('../assets/img/play_arrow.png')
const pauseIcon = new Image('../assets/img/pause.png')
const musicInput = document.querySelector('#alternar-musica')
const musica = new Audio('../assets/sounds/luna-rise-part-one.mp3')
const soundForPlay = new Audio('../assets/sounds/play.wav')
const soundForPause = new Audio('../assets/sounds/pause.mp3')
const soundWhenFinish = new Audio('../assets/sounds/beep.mp3')
const timer = document.querySelector('#timer')

let tempOnSec = 1500
let intervalId = null

focoBt.addEventListener('click', () => {
    tempOnSec = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempOnSec = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
}) 

longoBt.addEventListener('click', () => {
    tempOnSec = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    showTimer()
    buttons.forEach(contexto => {
        contexto.classList.remove('active')
    });
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `../assets/img/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            title.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        case 'descanso-longo':
            title.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break
        default:
            break;
    }
}

musicInput.addEventListener('change', () => {
    musica.loop = true
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

const contRegressive = () => {
    if (tempOnSec <= 0) {
        soundWhenFinish.play()
        clearCont()
        return
    }
    tempOnSec -= 1
    showTimer()
}

startPauseBt.addEventListener('click', startPauseCont)

function startPauseCont() {
    if (intervalId) {
        soundForPause.play()
        clearCont()
        return
    }
    soundForPlay.play()
    startPauseIcon.setAttribute('src', `../assets/img/pause.png`)
    startPauseText.textContent = "Pausar"
    intervalId = setInterval(contRegressive, 1000)
}

function clearCont() {
    clearInterval(intervalId)
    startPauseIcon.setAttribute('src', `../assets/img/play_arrow.png`)
    startPauseText.textContent = "Iniciar"
    intervalId = null
}

function showTimer() {
    const time = new Date(tempOnSec * 1000)
    const timeFinal = time.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `<h1>${timeFinal}</h1>`
}

showTimer()