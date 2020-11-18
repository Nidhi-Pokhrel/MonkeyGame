var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, bananaGroup
var FoodG, obstacleG
var score, PLAY = 1, END = 0
var gamestate = PLAY

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(150,570,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,600,600,20);
  ground.x = ground.width /2;
  FoodG = new Group();
  obstacleG = new Group();
  score = 0;
}

function draw() {

  
background("White");
  textSize(50)
  stroke("black")
  text("Survival Time: "+ score, 200,50);
  
  if(gamestate === PLAY){
    
  
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 510) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground)
    
    spawnObstacles();
  spawnBananaGroup();
  
  if(FoodG.isTouching(monkey)){
    FoodG.destroyEach() 
  }

   if(obstacleG.isTouching(monkey)){
     gamestate = END
  }
  }
  if(gamestate === END){
     FoodG.setVelocityXEach(0)
    obstacleG.setVelocityXEach(0)
    monkey.velocityX = 0
    ground.velocityX = 0
    obstacleG.setLifetimeEach(-1); 
    FoodG.setLifetimeEach(-1);
  }
  
  drawSprites();

}



function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(600,571,10,40);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   obstacle.addImage(obstaceImage);
   obstacle.velocityX = -4
   obstacleG.add(obstacle)
 }
}

function spawnBananaGroup(){
 if (frameCount % 150 === 0){
   var banana = createSprite(600,500,10,40);
    banana.lifetime = 300;
 banana.y = Math.round(random(540,520));
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    FoodG.add(banana)
 }
}