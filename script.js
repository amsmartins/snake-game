const cvs = document.getElementById('snake')
const ctx = cvs.getContext('2d') //Metodos de propriedades

//UNIDADE - CAIXA
const box = 32

//INSERIR IMAGEM
const ground = new Image()
ground.src = "img/ground.png"

const foodImg = new Image()
foodImg.src = "img/food.png"

//INSERIR AUDIO
const dead = new Audio()
const eat = new Audio()
const up = new Audio()
const left = new Audio()
const right = new Audio()
const down = new Audio()

dead.src = 'audio/dead.mp3'
eat.src = 'audio/eat.mp3'
up.src = 'audio/up.mp3'
left.src = 'audio/left.mp3'
right.src = 'audio/right.mp3'
down.src = 'audio/down.mp3'


//ANIMAL - COBRA
let snake = []
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

//COMIDA - MAÇA
let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

//SCORE - PONTUAÇÃO
let score = 0

//CONTROLAR A COBRA = TECLADO BOTÕES

let d

document.addEventListener('keydown', direction)

function direction(event) {
    let key = event.keyCode
    if (key == 37 && d != 'RIGHT') {
        left.play()
        d = 'LEFT'
    } else if (key == 38 && d != 'DOWN') {
        up.play()
        d = 'UP'
    } else if (key == 39 && d != 'LEFT') {
        right.play()
        d = 'RIGHT'
    } else if (key == 40 && d != 'UP') {
        down.play()
        d = 'DOWN'
    }
}

//CONFIRMAR COLISÃO
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y) {
            return true
        }
    }
    return false
}

//INSERIR ELEMENTOS AO CANVAS
function draw() {
    //CABEÇA DA COBRA NO JOGO
    ctx.drawImage(ground, 0, 0)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)

        ctx.strokeStyle = 'red'
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)
    }
    //FRUTA SE MOVENDO
    ctx.drawImage(foodImg, food.x, food.y)

    //POSIÇÃO DE CABEÇA ANTERIOR
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    //DIREÇÃO 
    if (d == 'LEFT') snakeX -= box
    if (d == 'UP') snakeY -= box
    if (d == 'RIGHT') snakeX += box
    if (d == 'DOWN') snakeY += box

    //INCREMENTAR AO COMER A FRUTA
    if (snakeX == food.x && snakeY == food.y) {
        score++
        eat.play()
        //SE COMER A FRUTA GANHA PONTO
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        } //SENÃO COMER PERDER A CABEÇA
    } else {
        //REMOVER O RABO DA COBRA
        snake.pop()
    }

    //ADICIONAR NOVA CABEÇA
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //GAME OVER
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)) {
        clearInterval(game)
        dead.play()
    }

    snake.unshift(newHead)

    ctx.fillStyle = 'white'
    ctx.font = '45px Changa one'
    ctx.fillText(score, 2*box, 1.6*box)

}
//CHAMAR FUNÇÃO A CASA 1s
let game = setInterval(draw, 100)