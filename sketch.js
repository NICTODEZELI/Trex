var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var caqui1,caqui2,caqui3,caqui4,caqui5,caqui6
var score = 0
var gupodecaqui
var gupodenuvren
var PLAY = 1
var END = 0
var GAMESTATE = PLAY
var morreukk
var podetentadnv
var checkpoint
var die
var jumpi

var newImage;

function preload(){
  //jumpi.loadSound("jump.mp3")
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  caqui1 = loadImage("obstacle1.png")
  caqui2 = loadImage("obstacle2.png")
  caqui3 = loadImage("obstacle3.png")
  caqui4 = loadImage("obstacle4.png")
  caqui5 = loadImage("obstacle5.png")
  caqui6 = loadImage("obstacle6.png")
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  morreukk = loadImage("gameOver.png")
  podetentadnv = loadImage("restart.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  trex = createSprite(50,height-20,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Bateuacara",trex_collided)
  trex.scale = 0.5;

  //trex.setCollider("circle",0,0,50)
  //trex.debug = true

  //trex.setCollider("rectangle",0,0,60,40)
  //trex.debug = true
  
  ground = createSprite(width/2,height-30,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;

  gupodecaqui = new Group()
  gupodenuvren = new Group()

  gameover = createSprite(width/2,height/2-50);
  gameover.addImage(morreukk)
  reset = createSprite(width/2,height/2);
  reset.addImage(podetentadnv)
  reset.scale = 0.5
  gameover.scale = 0.5
  reset.visible = false
  gameover.visible = false

  console.log("Hello"+ 5)
  
}

function draw() {
  background(255);
  text("Pontos: "+ score, width/2-20,height-600)

  if (GAMESTATE == PLAY){
    score = score + Math.round(getFrameRate()/60)

    ground.velocityX = -(4+3*score/100)

    if(touches.length>0&& trex.y >= height-120||keyDown("space")&& trex.y > 565) {
      trex.velocityY = -10;
      touches = []
    }  

    console.log(trex.y)

    trex.velocityY = trex.velocityY + 0.8

   if (ground.x < 0){
     ground.x = ground.width/2;
    }

    spawnClouds();
  
    Caqueto();

    if (gupodecaqui.isTouching(trex)){
      GAMESTATE = END
    }
  }else if (GAMESTATE == END){
    reset.visible = true
    gameover.visible = true
    trex.changeAnimation("Bateuacara")
    trex.velocityY = 0
    ground.velocityX = 0
    gupodecaqui.setVelocityXEach(0)
    gupodenuvren.setVelocityXEach(0)
    gupodenuvren.setLifetimeEach(-1)
    gupodecaqui.setLifetimeEach(-1)

    if (mousePressedOver(reset)||touches.length > 0){
      Resett();
      touches = []
    }
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(width-20,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //atribua tempo de vida à variável
    cloud.lifetime = 430

    gupodenuvren.add(cloud)
    
    //ajuste a profundidade
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

function Caqueto() {
  if (frameCount % 60 === 0) {
    Mortecerta = createSprite(width-20,height-35,10,40);
    Mortecerta.velocityX = -(6+score/100);
    var F = Math.round(random(1,6))
    switch(F) {
      case 1:Mortecerta.addImage(caqui1);
        break;
      case 2:Mortecerta.addImage(caqui2);
        break;
      case 3:Mortecerta.addImage(caqui3);
        break;
      case 4:Mortecerta.addImage(caqui4);
        break;
      case 5:Mortecerta.addImage(caqui5);
        break;
      case 6:Mortecerta.addImage(caqui6);
        break;
      default:break
    }
    Mortecerta.scale = 0.5;
    Mortecerta.lifetime = 300

    gupodecaqui.add(Mortecerta)
  }
}

function Resett() {
 gupodecaqui.destroyEach();
 gupodenuvren.destroyEach();
 GAMESTATE = PLAY
 reset.visible = false
 gameover.visible = false
 trex.changeAnimation("running")
 score = 0
}
