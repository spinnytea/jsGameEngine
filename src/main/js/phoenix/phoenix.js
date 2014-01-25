////
// game loop methods

function update() {
}

function draw() {
}


////
// overwrite some interfaces

keyLeft = function() { console.log("phoenix left"); };
keyRight = function() { console.log("phoenix right"); };


////
// start the game

// start the game
framerateGameLoop(update, draw, 1000);
