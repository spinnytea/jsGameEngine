// create the player object

var player = {};

// create the 
player.$handle = $('<img id="player" src="imgs/flying_w.png"/>').appendTo($game_window);
player.$handle.css('left', '32px');
player.$handle.css('top', '32px');

player.getX = function() { return parseInt(player.$handle.css('left'), 10); };
player.getY = function() { return parseInt(player.$handle.css('top'), 10); };
player.setX = function(x) { player.$handle.css('left', x+'px'); }
player.setY = function(y) { player.$handle.css('top', y+'px'); }

// initialize the x position to be in the center of the game window
player.setX( (parseInt($game_window.css('width'), 10) - parseInt(player.$handle.css('width'), 10)) / 2 );
// initialize the y position to be near the bottom of the game window
player.setY( (parseInt($game_window.css('height'), 10) - parseInt(player.$handle.css('height'), 10)) * 4 / 5 );
