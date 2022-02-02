var rocket1;
var bgsong
var rocket_still;
var rocket_moving;
var space,rock,star;
var SERVE = 2;
var PLAY = 1;
var END = 0;
var gameState = 2;
var score = 0;
var gameOver;
function preload(){
    rocket_still = loadImage("Rocket_no.png");
    rocket_moving = loadImage("Rocket_yes.png");
    space = loadImage("space.jpg")
    rock_Img = loadImage("Meteorit.png")
    starimg = loadImage("star.png");
    gameOver_img = loadImage("game_over.png")
    bgsong = loadSound('bgs.mp3')
}

function setup() {
    createCanvas(600,600);
    path=createSprite(250,200);
    path.addImage(space);
    path.velocityY = 2;
    rocket1 = createSprite(300,200);
    rocket1.addImage(rocket_still);
    rocket1.scale = 0.2
    rocket1.setCollider("rectangle",0,0,200,300);
    gameOver = createSprite(200,200);
    gameOver.addImage(gameOver_img)
    rockGroup = new Group();
    starG = new Group();
    bgsong.play()
}

function draw() {
    background(0);
    // gamestate serve starts here
    if (gameState === SERVE) {
      gameOver.visible = false
      textSize(50)
      fill('orange');
      textStyle(BOLD);
      text("SAVE THE ROCKET",50,200)
      textSize(30)
      fill('white');
      textStyle(ITALIC);
      text("RIGHT CLICK TO PLAY THE GAME",30,300)
      textSize(14)
      fill('white');
      textStyle(NORMAL);
      text("To thrust the rocket press space to go left press left arrow and to go right press right arrow.",5,350)
      textSize(17)
      textStyle(BOLD)
      text("STARS: 0",10,30)
      textSize(17)
      textStyle(BOLD)
      text("SCORE: 0",10,50)
      if (mouseIsPressed) {
        gameState = 1;
      }
      rocket1.visible = false;
    }


  // gamestate play starts here
    if (gameState === 1) {
      
      // rocket visiblity
      rocket1.visible = true; 
      //score text
      drawSprites()
      textSize(17)
      textStyle(BOLD)
      fill("white")
      text("SCORE:" + score,10,50)

      // controls here
      if(keyDown("left_arrow")){
        rocket1.x = rocket1.x - 5;
      }
        
      if(keyDown("right_arrow")){          
        rocket1.x = rocket1.x + 5;
      }
        
      if(keyDown("space")){
        rocket1.velocityY = -14;
        rocket1.addImage(rocket_moving)
      }

      //star and scoring
      if(starG.isTouching(rocket1)) {
        score = score + 1
        starG.destroyEach()
      }
      if(rockGroup.isTouching(rocket1)){
        score = 0
        gameState = 0
      }

      rocket1.velocityY = rocket1.velocityY + 0.8
      spawnRocks()
      spawnStars()
      if(path.y > 400){
        path.y = height/2;
      }
    }

    if (gameState === 0) {
      bgsong.stop()
      rocket1.destroy()
      star.visible = false;
      rock.visible = false;
      gameOver.visible = true
      textSize(32)
      fill('yellow')
      text("OH! GAME OVER",150,300)
    }
}
function spawnRocks() {
  if (frameCount % 240 ===0) {
    rock = createSprite(200,10);
    rock.addImage(rock_Img);
    rock.scale = 0.1;
    rock.velocityY = 3;
    rock.x = Math.round(random(50,550));
    rock.setCollider("rectangle",0,0,600,800);
    rock.lifetime = 650;
    rockGroup.add(rock);
  }
}

function spawnStars() {
  if (frameCount % 100 === 0) {
    star = createSprite(200,200);
    star.addImage(starimg);
    star.scale = 0.05 ;
    star.velocityY = 3;
    star.x = Math.round(random(50,550));
    star.y = Math.round(random(20,400));
    star.lifetime = 650;
    starG.add(star);
    //star.setCollider("rectangle",0,0,600,800);
  }
}