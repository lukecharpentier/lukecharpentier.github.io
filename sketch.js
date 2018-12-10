var ballSpeed = 11;
var ballX = 450;
var ballY = 350;
var angle = 270;
var gameOver = false;
var score1 = 0;
var score2 = 0;
var nets = [];
var paddles = [];
var time = 0;

//hit sounds
function preload(){
  mySound = loadSound("pong.wav");
  mySound2 = loadSound("pong2.wav");
  mySound3 = loadSound("death.wav");
}

function setup(){
  createCanvas(900,700)
  for(var i = 0; i<15; i++){
    nets[i] = new Net(i*51 + 12);
  }
  paddles[0] = new Paddle(10,1);
  paddles[1] = new Paddle(870,2);
  volume();
}

function draw(){
  background(0);
  lose();
  score();
  time++;
  displayNet();
  displayPaddles();
  ball();
  ballMove();
  ballBounce();
  if(gameOver){
    start();
  }
}

//hit volume
function volume(){
  mySound.setVolume(1);
  mySound2.setVolume(1);
  mySound3.setVolume(1);
}

//starting the game
function start(){
  ballX = 500;
  ballY = 350;
  paddles[0].y = 300;
  paddles[1].y = 300;
  angle += random(-8,8);
}

//moving the ball
function ballMove() {
  ballX += ballSpeed * sin(radians(angle));
  ballY += ballSpeed * cos(radians(angle));
}

//making the ball bounce
function ballBounce() {
  if (ballY <= 0){
    angle = 180-angle;
    mySound2.play();
  }
  if (ballY >= 685){
    angle = 180-angle;
    mySound2.play();
  }
}

//making the ball
function ball(){
  noStroke();
  rect(ballX,ballY,15,15);
}

//recording the score
function score(){
  fill(255);
  textSize(60);
  textFont("impact");
  text(score1,550,50);
  text(score2,300,50);
}

//making player lose
function lose(){
  if (ballX <= 0){
    gameOver = true;
    score1++;
    angle = 90;
    mySound3.play();
  }
  else if (ballX >= 900){
    gameOver = true;
    score2++;
    angle = 270;
    mySound3.play();
  }
  else{
    gameOver = false;
  }
}

//restarting game
function keyPressed(){
  if(key == "r"){
    score1 = 0;
    score2 = 0;
    start();
    angle = 270;
  }
}

//drawing paddle
function Paddle(x,p){
  this.x = x;
  this.y = 300;
  this.player = p;
  this.speed = 10;
  this.move = function(){
    if (keyIsDown(80) && this.player == 2){
      this.y-=this.speed;
    }
    if (keyIsDown(76) && this.player == 2){
      this.y+=this.speed;
    }
    if (keyIsDown(81) && this.player == 1){
      this.y-=this.speed;
    }
    if (keyIsDown(65) && this.player == 1){
      this.y+=this.speed;
    }
    if(this.y < 0){
      this.y = 0;
    }else if (this.y > 600){
      this.y = 600;
    }
  }
  this.display = function(){
    rect(this.x,this.y,20,100);
  }
  this.hit = function(){
    if (ballY > this.y - 10 && ballY < this.y + 100 && abs(ballX - this.x)<10){
      if(time>5){
        mySound.play();
        angle = 360-angle + random(-15,15);
        time = 0;
      }
    }
  }
}

//displaying paddles
function displayPaddles(){
  for(var i =0; i<paddles.length; i++){
    paddles[i].display();
    paddles[i].move();
    paddles[i].hit();
  }
}

//drawing net
function Net(y){
  this.y = y;
  this.x = width/2 - 5;
  this.display = function(){
    rect(this.x,this.y,10,10);
  }
}

//displaying net
function displayNet(){
  for(var i =0; i<nets.length; i++){
    nets[i].display();
  }
}
