//Declaramos las variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//Lo que ocupara la bola
var ballRadius = 10;
//Variables para delimitar la pantalla en el juego
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
//Variables para indicar el tamaño que tendra la paleta
var paddleHeight = 10;
var paddleWidth = 95;
var paddleX = (canvas.width-paddleWidth)/2;

//Variables para las pulsaciones de teclado
var rightPressed = false;
var leftPressed = false;
//variables para dar forma a los ladrillos
var brickRowCount = 11;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var again;
var contador = 0;
var audio = document.getElementById("principal");
var audio2 = document.getElementById("perder");
var audio3 = document.getElementById("ganar");
var audio4 = document.getElementById("colision");


//Variables iniciales para la puntuacion y las vidas
var score = 0;
var lives = 3;
//Variables para colocar los ladrillos en orden
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
//Detectamos las pulsaciones de teclado y el movimiento del raton
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
//funciones para controlar la pulsacion
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
//funcion para controlar el movimiento del raton
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

//Funcion a la que llamamos desde el boton, el nombre que introduzcamos lo
//meteremos en otro input, haremos que el div #primero desaparezca
function start(){
    var user = document.getElementById("usu").value;
    if(user == ""){
      alert("El cuadro para el nombre esta vacio, no crees que ahi va tu nombre?.");

    }
    else{
      alert("A jugar "+ user);
      document.getElementById("usuario").innerHTML = "Jugador actual: " + user;
      document.getElementById("primero").style.display =  "none";
      document.getElementById("segundo").style.display =  "block";
      draw();
    }

}
function pause(){

}

//Funcion para detectar cuando colision la bola con los ladrillos, sumandolo
//a la puntuacion
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    audio4.play();
                    if(score == brickRowCount*brickColumnCount) {
                        audio.pause();
                        audio3.play();
                        alert("Has eliminado todos los bloques, Felicidades!");
                        var again = prompt("Quieres volver a jugar?");
                        if(again == "si"){
                            alert("Juego concluido");
                              document.location.reload();
                      }
                      else{
                        alert("Hasta la proxima!");
                          document.location.reload();
                      }

                    }
                }
            }
        }
    }
}

//Funcion que dibujar la bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//Funcion que dibuja la paleta
function drawPaddle() {
  //Si rompermos 30 bloques, la paleta se hara mas pequeña
  if(score == 20){
    paddleWidth = 75;
  }
  if(score == 40){
    paddleWidth = 50;
  }
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//Funcion para dibujar los ladrillos en caso que no haya chocado la bola con ellos
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//Funcion para indicar los ladrillos que se han eliminado
function drawScore() {
  document.getElementById("puntos").innerHTML = " " + score;
  /*  ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);*/
}
//Funcion para indicar cuantas vidas nos quedan
function drawLives() {
  document.getElementById("vidas").innerHTML = " " + lives;
  /*  ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);*/
}



//Funcion que llamara a las demas funciones para crear los elementos del juego:
//los ladrillos,bola,paleta,puntuacion,vidas y deteccion de colisiones.
//Establece el movimiento de la bola, cada vez que la bola choca en la parte
//inferior, resta una vida.
function draw() {
    audio.play();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
  var user = document.getElementById("usuario");
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
              audio.pause();
              audio2.play();
                alert("Has perdido...");
                if(contador == 0){
                var again = prompt("Quieres seguir jugando?");
                    if(again == "si" || again == "yes" || again == "y" || again == "SI"){
                        alert("Eres un pelin malo, te dare un plus de vidas " + user)
                      lives=6;

                      draw();

                    }
                    else{
                      alert("Hasta la proxima!");
                        document.location.reload();
                    }
                      contador++;
                  }
                    else{
                      alert("No hay terceras oportunidades");
                        document.location.reload();

                    }

            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
//Con este elemento, el navegador refrescara la pagina automaticamente
    requestAnimationFrame(draw);

}
