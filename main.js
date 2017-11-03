var game = new Phaser.Game(623, 628, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
function preload() {
    game.load.spritesheet('mummy', 'assets/pics/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.image("background", "assets/pics/background.jpg")
    game.load.image("bulletleft", "assets/pics/bullet0.png")
    game.load.image("bulletright", "assets/pics/bullet0.png")
    game.load.image("bulletcen", "assets/pics/bullet0.png")
    game.load.image("ufo", "assets/pics/ufo.png")
    game.load.audio("music","assets/sound/bgmfinalnormal.mp3")
    
  

}
var mummy;
var fx;
var bulletleft;
var bulletright;
var bulletcen;
var spawnAllowed = true;
var lives = 12;
var score = 0;
var music;
var scoreText;
var livesText;
var introText;

function create() {
    background = game.add.tileSprite(0, 0, 1200, 900, "background");
    
    
    mummy = game.add.sprite(60, 550, 'mummy');
    mummy.scale.setTo(-1.5, 1.5);
    var walk = mummy.animations.add('walk');
    mummy.animations.play('walk', 30, true);

    bulletleft = game.add.sprite(40, 50, 'bulletleft');
    bulletleft.scale.setTo(2, 2);

    bulletright = game.add.sprite(570, 50, 'bulletright');
    bulletright.scale.setTo(2, 2);

    bulletcen = game.add.sprite(250, 50, 'bulletcen');
    bulletcen.scale.setTo(2, 2);

    ufo = game.add.sprite(100, -75, 'ufo');
    ufo.scale.setTo(0.625, 0.625);

    music = game.add.audio('music');
    music.play();
    
    scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(500, 550, 'lives: 12', { font: "20px Arial", fill: "#ffffff", align: "left" });
    introText = game.add.text(game.world.centerX, 400, '  <-- or -->  ', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);


    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.enable([mummy, bulletleft, bulletright, bulletcen, ufo], Phaser.Physics.ARCADE);



    cursors = game.input.keyboard.createCursorKeys();

    bulletright.body.gravity.y = 1500;
    bulletleft.body.gravity.y = 500;
    bulletcen.body.gravity.y = 700;


    mummy.enableBody = true;
    mummy.angle = 90
    cursors = game.input.keyboard.createCursorKeys();
    mummy.body.collideWorldBounds = true;

    game.time.events.repeat(Phaser.Timer.SECOND * (Math.random() * (1.5 - 0.5) + 1), 50, createBulletleft);
    game.time.events.repeat(Phaser.Timer.SECOND * (Math.random() * (1.5 - 0.5) + 1), 50, createBulletright);
    game.time.events.repeat(Phaser.Timer.SECOND * (Math.random() * (1.5 - 0.5) + 1), 50, createBulletcen);



}
function createBulletleft() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    bulletleft = game.add.sprite(40, 0, 'bulletleft');
    bulletleft.scale.setTo(2, 2);
    game.physics.enable([bulletleft], Phaser.Physics.ARCADE);
    bulletleft.body.gravity.y = (Math.random() * 1500) + 1000;
    bulletleft.body.collideWorldBounds = false;
}
function createBulletcen() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    bulletcen = game.add.sprite(270, 0, 'bulletcen');
    bulletcen.scale.setTo(2, 2);
    game.physics.enable([bulletcen], Phaser.Physics.ARCADE);
    bulletcen.body.gravity.y = (Math.random() * 1500) + 1000;
    bulletcen.body.collideWorldBounds = false;
}
function createBulletright() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    bulletright = game.add.sprite(570, 0, 'bulletright');
    bulletright.scale.setTo(2, 2);
    game.physics.enable([bulletright], Phaser.Physics.ARCADE);
    bulletright.body.gravity.y = (Math.random() * 1500) + 1000;
    bulletright.body.collideWorldBounds = false;
}

function update() {
    
    if (cursors.left.isDown) {
        score += 10;
        
            scoreText.text = 'score: ' + score;
        mummy.body.velocity.x = -1000
        mummy.body.gravity.x = -2000;
    }
    if (cursors.right.isDown) {
        score += 10;
        
            scoreText.text = 'score: ' + score;
        mummy.body.velocity.x = 1000
        mummy.body.gravity.x = 2000;

    }
    background.tilePosition.y += 5;

    if(checkOverlap(mummy,bulletcen)||checkOverlap1(mummy,bulletleft)||checkOverlap2(mummy,bulletright)){
        lives=lives-1;
        livesText.text = 'lives: ' + lives;
       
        
    }
    if(lives<0){
        introText = game.add.text(100, 200, '  Gameover \n Click to restart  '+ '\n'+'your score is '+score, { font: "40px Arial", fill: "#ffffff", align: "center" })
        if(cursors.left.isDown||cursors.right.isDown){
            score = 0;
            lives=12;
            game.state.restart();
        }
       
             
    }
    
}

function checkOverlap(mummy,bulletcen){
     var boundsA = mummy.getBounds()
     var boundsB = bulletcen.getBounds()
     
     return Phaser.Rectangle.intersects(boundsA,boundsB)

}
function checkOverlap1(mummy,bulletleft){
    var boundsA = mummy.getBounds()
    var boundsC = bulletleft.getBounds()
    
    return Phaser.Rectangle.intersects(boundsA,boundsC)

}
function checkOverlap2(mummy,bulletright){
    var boundsA = mummy.getBounds()
    var boundsD= bulletright.getBounds()
    
    return Phaser.Rectangle.intersects(boundsA,boundsD)

}


