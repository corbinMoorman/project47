var gameState = "start"
var fsImg1, fsImg2
var rightRunanimation, leftRunanimation
var jump1, jump2
var jL, jR
var runL, runR ,zRWalk,zLwalk
var bgImg
var futureSldr
var zLDead, zRDead, zLAttack,zRAttack
var titleImg
var playBtn, backBtn, storyBtn
var bulletImg
var score=0
var platform1,platform2
var life = 5
var defeatImg, youWinImg
var acidRainImg, aRain
var lZombieHealth = 3
var rZombieHealth = 3 
var mBFlyLeftAnimation
var mBFlyRightAnimation



function preload(){
//titleAndBackground  
bgImg = loadImage("background.png")
titleImg = loadImage("zSlayer_title.png")
//victory and defeatImages
youWinImg = loadImage("youWin.png")
defeatImg = loadImage("defeat.png")
//buttons
playBtn = loadImage("playBtn.png")
backBtn = loadImage("backButton.png")
storyBtn = loadImage("storyButton.png")
bulletImg = loadImage("bullet.png")
//soldierAnimations  
fsImg1 = loadAnimation("future_soldier1.png")
fsImg2 = loadAnimation("future_soldier2.png")
jump1 = loadAnimation("fsldr_jump1.png")
jump2 = loadAnimation("fsldr_jump2.png")
rightRunanimation = loadAnimation("fsldr_runR1.png","fsldr_runR2.png","fsldr_runR3.png","fsldr_runR4.png","fsldr_runR5.png","fsldr_runR6.png")
leftRunanimation = loadAnimation("fsldr_runL2.png","fsldr_runL3.png","fsldr_runL4.png","fsldr_runL5.png")
//zombieAnimation
zRWalk = loadAnimation("zL_walk1.png", "zL_walk2.png","zL_walk3.png","zL_walk4.png", "zL_walk5.png", "zL_walk6.png", "zL_walk7.png", "zL_walk8.png")
zRDead = loadAnimation("zL_dead10.png","zL_dead20.png","zL_dead30.png","zL_dead40.png",)
zRAttack = loadAnimation("zL_attack10.png", "zL_attack20.png", "zL_attack30.png", "zL_attack40.png", "zL_attack50.png", "zL_attack60.png", "zL_attack70.png", "zL_attack80.png")

zLWalk = loadAnimation("zR_walk10.png", "zR_walk20.png","zR_walk30.png","zR_walk40.png","zR_walk50.png","zR_walk60.png","zR_walk70.png","zR_walk80.png","zR_walk90.png")
zLAttack = loadAnimation("zR_attack10.png","zR_attack20.png","zR_attack30.png","zR_attack40.png","zR_attack50.png","zR_attack60.png","zR_attack70.png","zR_attack80.png")
zLDead = loadAnimation("zR_dead10.png","zR_dead20.png","zR_dead30.png","zR_dead40.png")
//acidrain
acidRainImg = loadImage("acidRain.png")
//mutantBird Animation
mBFlyLeftAnimation = loadAnimation("mB_Lrun10.png","mB_Lrun20.png","mB_Lrun30.png","mB_Lrun40.png")
mBFlyRightAnimation = loadAnimation("mB_Rrun10.png","mB_Rrun20.png","mB_Rrun30.png","mB_Rrun40.png")
}



function setup() {
  createCanvas(900,600);
  title =  createSprite(500,250,10,20)
  title.addImage(titleImg)
  title.scale = 2
 
  startButton = createSprite(478, 340, 50, 50);
  startButton.addImage(playBtn)
  startButton.scale = 2
  
  //bullet group
  bulletGroup = new Group()
  
  //zrwalk group
   zRightWalkGroup = new Group()

   //zlwalk group
   zLeftWalkGroup = new Group()

   //acidrain group
   acidGroup = new Group()
   //mutantBirdGroups
   mBFR_Group = new Group()
   mBFL_Group = new Group()

   //level2
   nextLevel = createSprite(460,555)
   nextLevel.scale = 0.5
   nextLevel.visible = false


  

  //PC
  futureSldr = createSprite(466,486,70,70)
  futureSldr.addAnimation("normal1",fsImg1)
  futureSldr.addAnimation("normal2",fsImg2)
  futureSldr.addAnimation("jumpL",jump1)
  futureSldr.addAnimation("jumpR",jump2)
  futureSldr.addAnimation("RunL",leftRunanimation)
  futureSldr.addAnimation("RunR",rightRunanimation)
  futureSldr.changeAnimation("normal1",fsImg1)
  futureSldr.scale = 2

  
 
  //invisibleGround
  invisibleGround = createSprite(450,545,900,10)
  invisibleGround.visible = true

  //platforms
  platform1 = createSprite(222,305,150,10)
  platform1.visible = false

  platform2 = createSprite(670,305,150,10)
  platform2.visible = false
  
  //score and life
  heading= createElement("h1");
  scoreboard= createElement("h1");

  //defeat
  defeat = createSprite(471,310,50,50)
  defeat.addImage(defeatImg)
  defeat.scale = 2
  defeat.visible = false

  win = createSprite(471,310,50,50)
  win.addImage(youWinImg)
  win.scale = 3
  win.visible = false
  
}
function draw() {
  background(bgImg) 
  fill ("white")
  text(mouseX+','+ mouseY,mouseX,mouseY);

   // Start 
   if(gameState ===  "start"){
    
    
    //change gameState to play
    if(mousePressedOver(startButton)){
     gameState = "play"
     startButton.destroy()
     
    }
   }

   //play state
   if(gameState ===  "play"){
  //score
  textSize(20)
  text("Score: "+ score, 50,50);

    //scoreboard.html("Score: "+score)
    //scoreboard.style('color:red'); 
    //scoreboard.position(width-200,20)
    

  //PC life
  textSize(20)
  text("Life: "+ life, 50,20);

    //heading.html("Life: "+life)
    //heading.style('color:red'); 
    //heading.position(150,20)
  

  

  //npc
     title.visible = false
      platform1.visible = true
      platform2.visible = true
  
    
    spawnRightZombies()
    spawnLeftZombies()
    spawnNpcRight()
    spawnNpcLeft()
    
    //PC movement
    if(keyWentDown(LEFT_ARROW)){
      futureSldr.velocityX = -5
      futureSldr.changeAnimation("RunL")
      
    } 
    if(keyWentUp(LEFT_ARROW)){
      
      futureSldr.changeAnimation("normal2")
      futureSldr.velocityX = 0
    } 
    if(keyWentDown(RIGHT_ARROW)){
      futureSldr.velocityX = 5
      futureSldr.changeAnimation("RunR")
    }
    if(keyWentUp(RIGHT_ARROW)){
    
      futureSldr.changeAnimation("normal1")
      futureSldr.velocityX = 0
    } 
    if(keyWentDown(UP_ARROW)){
      futureSldr.velocityY = -20
      futureSldr.changeAnimation("jumpL")
    }
    if(keyWentUp(UP_ARROW)){
      futureSldr.changeAnimation("normal1")
      futureSldr.velocityY = 1
    }
  // zombie attack  
  if(zLeftWalkGroup.collide(futureSldr)){
    zLeftWalk.changeAnimation("zLA", zLAttack)
    zLeftWalk.lifetime = 0
    life = life-1
  }
  if(zRightWalkGroup.collide(futureSldr)){
    zRightWalk.changeAnimation("zRA", zRAttack)
    zRightWalk.lifetime = 0
    life= life-1
   }
   
    //futuresldr defeat zombie
  if(keyIsDown(83)){
    shootBulletRIght()
    futureSldr.changeAnimation("normal1")
  }

  if(keyIsDown(65)){
    shootBulletLeft()
    futureSldr.changeAnimation("normal2")
  }
  if(bulletGroup.collide(zLeftWalkGroup)){
    bulletGroup.destroyEach()
    lZombieHealth = lZombieHealth -1
    }

  if(bulletGroup.collide(zRightWalkGroup)){
    bulletGroup.destroyEach()
    rZombieHealth = rZombieHealth -1

  }
  //zombieHealth
  if(rZombieHealth === 0){
    zRightWalkGroup.destroyEach()
    spawnRightZombies()
    score = score +5000
  }
  if(lZombieHealth === 0){
    zLeftWalkGroup.destroyEach()
    spawnLeftZombies()
    score = score +5000
  }
  
  
    
    //applying Gravity
    futureSldr.velocityY = futureSldr.velocityY +1
   

   //colliding the future soldier with the ground 
   futureSldr.collide(invisibleGround)
   futureSldr.collide(platform2)
   futureSldr.collide(platform1)
   

   //colliding zombies with ground
   zRightWalkGroup.collide(invisibleGround)
   zLeftWalkGroup.collide(invisibleGround)
  
  //adding acidRain
  if(frameCount % 100 === 0){
    drawacidRain()
  }
  //applying damage from acid rain
  if(acidGroup.collide(futureSldr)){
    life = life-1
    acidGroup.destroyEach()
   
  }

  // ending the level(gameState = endLose)
  if(life === 0){
    gameState = "endLose"  
   
  }
//endWin
  if(score > 5000){
    gameState = "endWin"
    futureSldr.visible = true  
  }
}

  if(gameState === "endWin"){
    zLeftWalkGroup.destroyEach()
    zRightWalkGroup.destroyEach()
    win.visible = true
    nextLevel.visible = true
    futureSldr.visible = false


    
    if(mousePressedOver(nextLevel)){
      score = 0
      life = 7
      gameState = "level2"
    }

  }

  //changing level
  
  if(gameState === "level2"){
    spawnLeftZombiesLevel2()
    spawnRightZombiesLevel2()
    drawacidRainLevel2()
    win.visible = false
    futureSldr.visible = true
    nextLevel.destroy()
    level2_basics()
    futureSldr.collide(invisibleGround)
    
  }

//gamestate End Lose
if(gameState === "endLose"){
    futureSldr.destroy()
    zLeftWalk.lifetime = 0
    zRightWalk.lifetime = 0
    defeat.visible = true
    
    if(keyCode === 82){
      reset()
      futureSldr = createSprite(466,486,70,70)
      futureSldr.addAnimation("normal1",fsImg1)
      futureSldr.addAnimation("normal2",fsImg2)
      futureSldr.addAnimation("jumpL",jump1)
      futureSldr.addAnimation("jumpR",jump2)
      futureSldr.addAnimation("RunL",leftRunanimation)
      futureSldr.addAnimation("RunR",rightRunanimation)
      futureSldr.changeAnimation("normal1",fsImg1)
      futureSldr.scale = 2
    }
      
    
    


    textSize(20)
    fill("red")
    text("press 'R' to restart", 475,540)
  }
  drawSprites();
}
//Npc
function spawnRightZombies(){
  if(frameCount % 120 === 0){
   zRightWalk = createSprite(0,500, 10,10)
   zRightWalk.lifetime = 360
   zRightWalk.addAnimation("zLW", zLWalk)
   zRightWalk.addAnimation("zRA", zRAttack)
   zRightWalk.addAnimation("zLD", zLDead)
   zRightWalk.velocityX = 5
   zRightWalk.scale = 1.4
   zRightWalkGroup.add(zRightWalk)
   rZombieHealth = 3
  }
  
}
//Npc
function spawnLeftZombies(){
  if(frameCount % 100 === 0){
    zLeftWalk = createSprite(900,510, 10,10)
    zLeftWalk.lifetime = 360
    zLeftWalk.addAnimation("zRW", zRWalk)
    zLeftWalk.addAnimation("zLA", zLAttack)
    zLeftWalk.addAnimation("zRD", zRDead)
    zLeftWalk.velocityX = -5
    zLeftWalk.scale =  1.4
    zLeftWalkGroup.add(zLeftWalk)
    lZombieHealth = 3
    

   }
   
}
//bullet
function shootBulletRIght(){
 if(frameCount % 4 === 0){
  bullet= createSprite(150, width/2, 50,20)
  bullet.x = futureSldr.x 
  bullet.y = futureSldr.y 
  bullet.addImage(bulletImg)
  bullet.scale=1.1
  bullet.velocityX= 25
  bulletGroup.add(bullet)
 
 }
}
function shootBulletLeft(){
  if(frameCount % 4 === 0){
   bullet= createSprite(150, width/2, 50,20)
   bullet.x = futureSldr.x 
   bullet.y = futureSldr.y 
   bullet.addImage(bulletImg)
   bullet.scale=1.1
   bullet.velocityX= -25
   bulletGroup.add(bullet)
  }
 }
function reset(){
  gameState = "play"
  defeat.visible = false
  life = 5
  score = 0
 
  
}
//npc
function drawacidRain(){
  aRain = createSprite(random(10,870),1,10,10)
  aRain.addImage(acidRainImg)
  aRain.velocityY = 5
  aRain.lifetime = 180
  aRain.scale = 0.5
  acidGroup.add(aRain)
  
  
}
function spawnNpcRight(){
  if(frameCount % 120 === 0){
    mBFR = createSprite(880,250,10,10)
    mBFR.addAnimation("mBFRA",mBFlyRightAnimation)
    mBFR.velocityX = -3
    mBFR.lifetime = 180
    mBFR.scale = 1
    mBFR_Group.add(mBFR)
  
}
}
function spawnNpcLeft(){
  if(frameCount % 140 === 0){
    mBFL = createSprite(0,250,10,10)
    mBFL.addAnimation("mBFLA", mBFlyLeftAnimation)
    mBFL.velocityX = 3
    mBFL.lifetime = 180
    mBFL.scale = 1
    mBFL_Group.add(mBFL)
  }
}
function spawnRightZombiesLevel2(){
  if(frameCount % 100 === 0){
   zRightWalk = createSprite(0,500, 10,10)
   zRightWalk.lifetime = 180
   zRightWalk.addAnimation("zLW", zLWalk)
   zRightWalk.addAnimation("zRA", zRAttack)
   zRightWalk.addAnimation("zLD", zLDead)
   zRightWalk.velocityX = 5
   zRightWalk.scale = 1.4
   zRightWalkGroup.add(zRightWalk)
   rZombieHealth = 5
  }
  
}
//Npc
function spawnLeftZombiesLevel2(){
  if(frameCount % 80 === 0){
    zLeftWalk = createSprite(900,510, 10,10)
    zLeftWalk.lifetime = 180
    zLeftWalk.addAnimation("zRW", zRWalk)
    zLeftWalk.addAnimation("zLA", zLAttack)
    zLeftWalk.addAnimation("zRD", zRDead)
    zLeftWalk.velocityX = -6
    zLeftWalk.scale =  1.4
    zLeftWalkGroup.add(zLeftWalk)
    lZombieHealth = 5
    

   }
   
}

function drawacidRainLevel2(){
  if(frameCount % 80 === 0){
  aRain = createSprite(random(10,870),1,10,10)
  aRain.addImage(acidRainImg)
  aRain.velocityY = 7
  aRain.lifetime = 180
  aRain.scale = 0.5
  acidGroup.add(aRain)
  }
}
function level2_basics(){
  life = 7
  score = 0
  //shooting and defeating zombies
  if(keyIsDown(83)){
    shootBulletRIght()
    futureSldr.changeAnimation("normal1")
  }

  if(keyIsDown(65)){
    shootBulletLeft()
    futureSldr.changeAnimation("normal2")
  }
  if(bulletGroup.collide(zLeftWalkGroup)){
    bulletGroup.destroyEach()
    lZombieHealth = lZombieHealth -1
    }

  if(bulletGroup.collide(zRightWalkGroup)){
    bulletGroup.destroyEach()
    rZombieHealth = rZombieHealth -1

  }
  //zombieHealth
  if(rZombieHealth === 0){
    zRightWalkGroup.destroyEach()
    spawnRightZombies()
    score = score +5000
  }
  if(lZombieHealth === 0){
    zLeftWalkGroup.destroyEach()
    spawnLeftZombies()
    score = score +5000
  }
   //PC movement
   if(keyWentDown(LEFT_ARROW)){
    futureSldr.velocityX = -5
    futureSldr.changeAnimation("RunL")
    
  } 
  if(keyWentUp(LEFT_ARROW)){
    
    futureSldr.changeAnimation("normal2")
    futureSldr.velocityX = 0
  } 
  if(keyWentDown(RIGHT_ARROW)){
    futureSldr.velocityX = 5
    futureSldr.changeAnimation("RunR")
  }
  if(keyWentUp(RIGHT_ARROW)){
  
    futureSldr.changeAnimation("normal1")
    futureSldr.velocityX = 0
  } 
  if(keyWentDown(UP_ARROW)){
    futureSldr.velocityY = -20
    futureSldr.changeAnimation("jumpL")
  }
  if(keyWentUp(UP_ARROW)){
    futureSldr.changeAnimation("normal1")
    futureSldr.velocityY = 1
  }
// zombie attack  
if(zLeftWalkGroup.collide(futureSldr)){
  zLeftWalk.changeAnimation("zLA", zLAttack)
  zLeftWalk.lifetime = 0
  life = life-1
}
if(zRightWalkGroup.collide(futureSldr)){
  zRightWalk.changeAnimation("zRA", zRAttack)
  zRightWalk.lifetime = 0
  life= life-1
 }
}