  var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var background, backgroundImage;
  var score= 0;
  var ground;

function preload(){ 
  backgroundImage= loadImage("jungle.jpg")
  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage= loadImage("banana.png");
  obstacleImage= loadImage("stone.png");
}

function setup() {  
    createCanvas(400,400);
  
    background= createSprite (200,200);
    background.addImage ("backgroundimage", backgroundImage);
    background.velocityX= -2;
    
    monkey= createSprite (50,340,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.15;

    ground= createSprite (0,390,800,10);
    ground.visible= false;

    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
 
    console.log(monkey.y);

    if (background.x<150) {
      background.x= 200
    }   
  
    if (keyDown ("space")&& monkey.y>=355) {
      monkey.velocityY= -20;  
    }    
    
    monkey.velocityY= monkey.velocityY + 0.8;
    monkey.collide (ground);

    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
    }
  
    switch (score) {
      case 10: monkey.scale= 0.15;
      break;
      case 20: monkey.scale= 0.20;
      break;
      case 30: monkey.scale= 0.25;
      break;
      case 40: monkey.scale= 0.30;
      break;
      case 50: monkey.scale= 0.35;
      break;
      default: break;
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      score= 0;
      obstacleGroup.destroyEach();
      monkey.scale= 0.1;
    }
    spawnBananas();
    spawnObstacles();
  
    drawSprites();

    stroke ("white");
    textSize (15);
    text ("Score: "+score,190,70);  
}


function spawnBananas () {
  if (frameCount%90===0) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;
    banana.lifetime= 150;
    bananaGroup.add(banana);
  }
}


function spawnObstacles () {
  if (frameCount%100===0) {
    obstacle= createSprite (270,370,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.2;
    obstacle.velocityX= -4;
    obstacleGroup.add(obstacle);
  }
}