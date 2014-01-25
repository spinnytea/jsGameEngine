
var keyLeft = function() { };
var keyRight = function() { };
var keyUp = function() { };
var keyDown = function() { };

var keyInteract = function() { };

onkeydown = function(e) {
	var event = window.event ?  window.event : e;
	switch(event.keyCode) {
	case 37:	keyLeft();		break;
	case 38:	keyUp();		break;
	case 39:	keyRight();		break;
	case 40:	keyDown();		break;
	case 70:	keyInteract();	break;
	default:
		console.log("key: " + event.keyCode);
		break;
	}
};
