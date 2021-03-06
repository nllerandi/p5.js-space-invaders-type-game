var enemies = require('./enemies.js');

var x = 500;
var y = 900;

var heroWidth = 50;
var minWidth = 10;
var maxWidth = 75;

var numPixels = 10;

var vel = 5;

var myLife = 10;
var startDate;
var refDate;


function setup() {
    createCanvas(1000, 1000);
    enemies.init();
    startDate = new Date();
}

function userInputs(){
    // LEFT @todo need to put these numbers in global scope
    if (keyIsDown(65)) {
        if (x<=0) {
            x = 999;
        }
        else {
            x-=vel;
        }
    }

    // RIGHT
    if (keyIsDown(68)) {
        if (x>=1000) {
            x = 1;
        }
        else {
            x+=vel;
        }
    }

    // UP
    if (keyIsDown(87)) {
        if (y<=0) {
        }
        else {
            y-=vel;
        }
    }

    // DOWN
    if (keyIsDown(83)) {
        if (y>=1000) {
        }
        else {
            y+=vel;
        }
    }

    if (keyIsDown(LEFT_ARROW)){
        if(heroWidth >= minWidth + .4){
            heroWidth -= .4;
            vel = heroWidth/10;
        } else {
        }
    }
    if (keyIsDown(RIGHT_ARROW)){
        if(heroWidth <= maxWidth - .4){
            heroWidth += .4;
            vel = heroWidth/10;
        } else {
        }
    }
};

function update() {
    enemies.updateEnemies();

    var nme = enemies.getEnemies();

    for(var i=0; i < nme.length; i++)
    {
        var e = nme[i];

        if(!e.hitUser){
            if(collideRectRect( x, y, heroWidth, 50,
                    e.x, e.y, 35 ,35)){
                e.hitUser = true;
                onCollision(e.id, e.black);
            }
        }
    }
};

function score() {
    fill(0);
    noStroke();
    textSize(50);

    if(myLife > 0) {
        refDate = new Date();
    }

    var myScore = Math.floor( (refDate - startDate)/50 );
    text('Score: ' + myScore, 10, 40);
    text('Life: ' + myLife, 800, 40);
};


function onCollision(uid, black)
{
    if(black){
        myLife -= 2;
    } else {
        myLife -= 1;
    }
}

function draw() {
    userInputs();

    background(211, 211, 211);
    fill(255, 0, 0);

    if( myLife > 0 ) {
        rect(x, y, heroWidth, 50);
        // Enemy logic below
        var nme = enemies.getEnemies();

        update();

        for(var i=0; i < nme.length; i++)
        {
            var e = nme[i];

            if(!e.hitUser) {
                if(e.black) {
                    fill(255, 0, 0);
                } else {
                    fill(0, 0, 255);
                }
                rect(e.x, e.y, 35, 35);
            }
        }
    }


    score();
}

global.setup = setup;
global.draw = draw;
