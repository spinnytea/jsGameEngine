
var keydown_left = function() { };
var keydown_right = function() { };
var keydown_up = function() { };
var keydown_down = function() { };
var keydown_interact = function() { };
var keydown_jump = function() { };
var keydown_return = function() { };
var keyup_left = function() { };
var keyup_right = function() { };
var keyup_up = function() { };
var keyup_down = function() { };


onkeydown = function(e) {
	var event = window.event ?  window.event : e;
	switch(event.keyCode) {
	case 37:	keydown_left();			break; // left
	case 38:	keydown_up();			break; // up
	case 39:	keydown_right();		break; // right
	case 40:	keydown_down();			break; // down
	case 70:	keydown_interact();		break; // f
	case 66:    keydown_jump();     	break; // b
	case 82:    keydown_return();       break; // r
	default:
		console.log("key: " + event.keyCode);
		break;
	}
};

onkeyup = function(e) {
	var event = window.event ?  window.event : e;
	switch(event.keyCode) {
	case 37:	keyup_left();		break;
	case 38:	keyup_up();			break;
	case 39:	keyup_right();		break;
	case 40:	keyup_down();		break;
	}
};
