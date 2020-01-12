const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/1562688808.png";

const food = new Image();
food.src = "img/bug.png";

let box = 32;
let score = 0;
let food_position = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener("keydown", direction);

let tap;

function direction(event) {
    if(event.keyCode == 37 && tap != "right")
        tap = "left";
    else if(event.keyCode == 38 && tap != "down")
        tap = "up";
    else if(event.keyCode == 39 && tap != "left")
        tap = "right";
    else if(event.keyCode == 40 && tap != "up")
        tap = "down";
    else if(event.keyCode == 32)
        document.location.reload(true);
};

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}

function GamePicture() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(food, food_position.x, food_position.y);
    
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

    };

    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food_position.x && snakeY == food_position.y) {
        score++;
        food_position = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17 
        || snakeY < 3 * box || snakeY > box * 17)
    clearInterval(game);

    if(tap == "left") snakeX -= box;
    if(tap == "right") snakeX += box;
    if(tap == "up") snakeY -= box;
    if(tap == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
};

const game = setInterval(GamePicture, 100);
