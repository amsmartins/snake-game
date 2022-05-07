const cvs = document.getElementById('snake')
const ctx = cvs.getContext('2d') 

const box = 32

//IMAGENS
const ground = new Image()
ground.src = "img/ground.png"

const foodImg = new Image()
foodImg.src = "img/food.png"

//AUDIOS
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


//SNAKE
let snake = []
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

//FOOD
let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

//SCORE
let score = 0

//CONTROLS
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

//COLLID
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y) {
            return true
        }
    }
    return false
}

//CANVAS
function draw() {
    
    //SNAKE HEAD
    ctx.drawImage(ground, 0, 0)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)

        ctx.strokeStyle = 'red'
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)
    }
    //MOVIMENT FOOD
    ctx.drawImage(foodImg, food.x, food.y)

    //HEAD POSITIONS
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    //DIRECTIONS
    if (d == 'LEFT') snakeX -= box
    if (d == 'UP') snakeY -= box
    if (d == 'RIGHT') snakeX += box
    if (d == 'DOWN') snakeY += box

    //INCREMENT FOOD
    if (snakeX == food.x && snakeY == food.y) {
        score++
        eat.play()
        
        //PONT FOR EAT FRUIT
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        }
    } else {
        snake.pop()
    }

    //NEW HEAD
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

let game = setInterval(draw, 100)
