var game = new Phaser.Game(623, 628, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image("bg", "assets/pics/bg.png")
    game.load.image("startbutton", "assets/pics/playbut2.png")
    game.load.image("exitbutton", "assets/pics/exitbut2.png")

}

var button1;
var button2;
var background;

function create() {
    button1 = game.add.sprite(250, 200, 'startbutton');
    button1.scale.setTo(0.5, 0.5);

    button2 = game.add.sprite(250, 300, 'exitbutton');
    button2.scale.setTo(0.5, 0.5);
                               
   
}

