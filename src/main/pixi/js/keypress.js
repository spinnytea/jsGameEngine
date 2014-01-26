
var keydown_left = function() { };
var keydown_right = function() { };
var keydown_up = function() { };
var keydown_down = function() { };
var keydown_jump = function() { };
var keyup_left = function() { };
var keyup_right = function() { };
var keyup_up = function() { };
var keyup_down = function() { };

onkeydown = function(e) {
	var event = window.event ?  window.event : e;
	switch(event.keyCode) {
	case 37:	keydown_left();		break;
	case 38:	keydown_up();		break;
	case 39:	keydown_right();	break;
	case 40:	keydown_down();		break;
	case 70:	keyInteract();		break;
	case 32:    keydown_jump();     break;
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
