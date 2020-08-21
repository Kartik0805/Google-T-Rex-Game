var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var play  = 1, end = 0, gameState = play, gameOver, resatButton, gameoverpic, resatbuttonpic
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverpic = loadImage("gameOver.png");
  resatbuttonpic = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colliding", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -10;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameoverpic);
  gameOver.scale = 0.7;
  gameOver.visible = false;

  resatButton = createSprite(300,140); 
  resatButton.addImage(resatbuttonpic);
  resatButton.scale = 0.5;
  resatButton.visible = false;
  }

function draw() {
  background("white");
  text(score, 0, 15);
  if (gameState==play) {
    ground.velocityX = -(5 + score/100);
    score = score + Math.round(frameRate()/60);
    //if (score%100==0 && score >0) {
    //playSound("sound://category_achievements/bubbly_game_achievement_sound.mp3");
    //ground.velocityX + ground.velocityX + 1;
    //}
    if (ground.x < 0) {
    ground.x = ground.width / 2; 
    }
    if(keyDown("space") && trex.y >= 159){
    trex.velocityY = -12  ;
    //playSound("sound://category_jump/arcade_game_jump_11.mp3");
    }
    trex.velocityY = trex.velocityY + 0.8;
    spawnClouds();
    spawnObstacles();
    if (trex.isTouching(obstaclesGroup)) {
    gameState = end;
    //playSound("sound://category_hits/8bit_splat.mp3");
    }
  }else if (gameState==end)  {
    obstaclesGroup.setLifetimeEach(0);
    cloudsGroup.setLifetimeEach(0);
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("colliding", trex_collided);
    //score = 0; 
    gameOver.visible = true;
    resatButton.visible = true;
  
  
  if (mousePressedOver(resatButton)) {
  restart();
  }
  if (trex.y > 159) {
  trex.y = trex.y + 10;  
  }
  }
  
  createEdgeSprites();
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.7;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function restart() {gameState = play;
score = 0; 
gameOver.visible = false;
resatButton.visible = false;
trex.changeAnimation("running", trex_running);  
}
