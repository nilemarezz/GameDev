var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
function preload() {
    game.load.image('background',"assets/pics/background.jpg");
    game.load.image('player', "assets/pics/player.png",80,111,28);
    game.load.audio('bgmfinalnormal', "assets/sound/ttt.mp3");
    

}   
var background;
var player;
var music;
function create() {
    background = game.add.tileSprite(50, 0, 700, 700, 'background');
    
    player = game.add.sprite(100, 500, "player");
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(0.25, 0.25);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

game.physics.enable(player, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.8;
    
    music = game.add.audio('bgmfinalnormal');
    music.play();

    


}
function update() {
    if (cursors.left.isDown) {
        player.body.velocity.x = -2000;
        player.angle += 1000;
        game.physics.arcade.gravity.x = -2000;
    }
    if (cursors.right.isDown) {
        player.body.velocity.x = 2000;
        player.angle += 1000;
        game.physics.arcade.gravity.x = 2000;
    }
    background.tilePosition.y += 2;
}



