//Welcome to COVID Hunter! You are driving an ambulance and you need to sanatize the highway. Here's how you play:

//Cars will be randomly coming and you have to avoid them, use the right and left arrow keys to move side to side. Watch out, if you miss 5 virus or if you get hit by a car once, you lose the game.

var PLAY = 1
var END = 0
var gameState = PLAY

var player, playerImage

var back, backImage

var virus, virusImage

var score = 0

var invisibleBlock

var rightEdge, leftEdge

var restart, restartImage

lives = 0

var obstacle, car1, car2, car3, car4, car5, car6, car7;

function preload() {
  playerImage = loadImage("ambulance.png");
  backImage = loadImage("31048632-asphalt-road-texture-and-lines-of-traffic.jpg");

  virusImage = loadImage("corona.png");

  car1 = loadImage("orangecar.png");
  car2 = loadImage("graycar.png");
  car3 = loadImage("bluecar.png");
  car4 = loadImage("greencar.png");
  car5 = loadImage("yellowcar.png");
  car6 = loadImage("whitecar.png");
  car7 = loadImage("player.png");

  restartImage = loadImage("Restart.png");
}

function setup() {
  createCanvas(displayWidth/2-85, displayHeight-300);

  leftEdge = createSprite(0, 225, 10, 600);
  rightEdge = createSprite(600, 225, 10, 600);

  back = createSprite(300, 300);
  back.y = back.height / 2;
  back.addImage(backImage);
  back.scale = 2.4;

  player = createSprite(300, 360);
  player.shapeColor = "blue";
  player.addImage(playerImage);
  player.scale = 0.15;

  restart = createSprite(300, 225, 100, 30);
  restart.addImage(restartImage);
  restart.scale = 0.15;
  // restart.depth = player.depth;
  restart.depth = restart.depth+10000;
  
  obstacleGroup = createGroup();
  virusGroup = createGroup();
}

function draw() {
  background(0);
  invisibleBlock = createSprite(300, 450, 600, 10);
  invisibleBlock.visible = false;

  player.setCollider("rectangle", 0, 25, 355, 800);

  if (gameState === PLAY) {
    restart.visible = false;
    createObstacles();
    createCovid();

    if (back.y > 500) {
      back.y = 300;
    }
    player.bounce(leftEdge);
    player.bounce(rightEdge);

    if (virusGroup.isTouching(invisibleBlock)) {
      virusGroup.get(0).destroy();
      lives = lives + 1
    }

    if (player.isTouching(virusGroup)) {
      
      virusGroup.get(0).destroy();
      score = score + 1;
    }
    
    // if (keyDown("up")) {
      back.y = back.y + 7;
      // virusGroup.setVelocityYEach(7);
    // }
    
    if (keyWentUp("up")) {
      // virusGroup.setVelocityYEach(0);
    }
    
    if (keyDown("left")) {
      player.x = player.x - 10;
    }
    
    if (keyDown("right")) {
      player.x = player.x + 10;
    }
    
    if (lives === 5) {
      gameState = END;
    }

    if (obstacleGroup.isTouching(player)) {
      gameState = END;
    }
  } 
  else if (gameState === END) {
    back.velocityY = 0;
    player.velocityX = 0;

    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityYEach(0);

    virusGroup.setLifetimeEach(-1);
    virusGroup.setVelocityYEach(0);
  }

  drawSprites();

  textSize(16);
  stroke("black");
  fill("white");
  text("Captured : " + score, 20, 20);
  text("Escaped  : " + lives, 20, 40)

  if (gameState === END) {
    textSize(50);
    stroke("blue");
    fill("yellow");
    text("Game Over", 170, 180);
    restart.visible = true;
    
    if (mousePressedOver(restart)) {
      reset();
    }
  }
}

function createObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(300, -50);

    r = Math.round(random(1, 7));
    if (r == 1) {
      obstacle.addImage(car1);
      obstacle.scale = 0.2;
    } else if (r == 2) {
      obstacle.addImage(car2);
      obstacle.scale = 0.2
    } else if (r == 3) {
      obstacle.addImage(car3);
      obstacle.scale = 0.12;
    } else if (r == 4) {
      obstacle.addImage(car4);
      obstacle.scale = 0.2;
    } else if (r == 5) {
      obstacle.addImage(car5);
      obstacle.scale = 0.15;
    } else if (r == 6) {
      obstacle.addImage(car6);
      obstacle.scale = 0.07;
    } else if (r == 7) {
      obstacle.addImage(car7);
      obstacle.scale = 0.2;
    }
    obstacle.x = Math.round(random(40, 560));
    obstacle.shapeColor = "red";

    obstacle.velocityY = (random(10, 20));
    obstacle.lifetime = 200;

    obstacle.depth = player.depth;
    player.depth = obstacle.depth + 1;

    obstacleGroup.add(obstacle);
  }
}

function createCovid() {
  
  if (frameCount % 30 === 0) {
    virus = createSprite(300, -50);
    virus.addImage(virusImage);
    virus.scale = 0.05
    virus.x = Math.round(random(40, 560));
    virus.velocityY = (7);
    virus.lifetime = 2000;
    virusGroup.add(virus);
  }
}

function reset() {
  gameState = PLAY;
  score = 0;
  lives = 0;
  virusGroup.destroyEach();
  obstacleGroup.destroyEach();
  restart.visible = false;
  player.x = 300;
}