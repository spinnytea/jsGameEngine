function createActor(stage, xpos) {
	var obj = {};
	
	// create a texture from an image path
	// create a new Sprite using the texture
	var circle = new PIXI.Sprite(PIXI.Texture.fromImage("assets/circle.png"));
	var shadow = new PIXI.Sprite(PIXI.Texture.fromImage("assets/shadow.png"));
	
	// center the sprites anchor point
	circle.anchor.x = 0.5;
	circle.anchor.y = 1;
	shadow.anchor.x = 0.5;
	shadow.anchor.y = 0.5;
	
	stage.addChild(shadow);
	stage.addChild(circle);
	
	obj.stage = {};
	obj.stage.circle = circle;
	obj.stage.shadow = shadow;
	
	obj.base = {};
	obj.base.width = 32;
	obj.base.height = 32;
	obj.base.breathingMagnitude = 5;
	
	obj.state = {};
	obj.state.breathingStep = 0;
	obj.state.breathingVel = 1;
	obj.state.activity = Math.random()*0.1 + 0.25;
	
	// set the height of the shadow
	obj.stage.shadow.height = obj.base.height / 4;
	
	obj.update = function() {
		
		// step the breathing
	    obj.stage.shadow.width = obj.base.width + obj.state.breathingStep;
	    obj.stage.circle.width = obj.base.width + obj.state.breathingStep;
	    obj.stage.circle.height = obj.base.height - obj.state.breathingStep;
	    obj.state.breathingStep += obj.state.activity*obj.state.breathingVel;
	    
	    if(obj.state.breathingStep > obj.base.breathingMagnitude || obj.state.breathingStep < -obj.base.breathingMagnitude)
	    	obj.state.breathingVel *= -1;
	};
	
	obj.getX = function() { return obj.stage.circle.position.x };
	obj.getY = function() { return obj.stage.circle.position.y };
	obj.setX = function(x) {
		circle.position.x = x;
		shadow.position.x = x;
	};
	obj.setY = function(y) {
		circle.position.y = y;
		shadow.position.y = y;
	};
	
	obj.getStageX = function() {
		return obj.stage.circle.position.x + obj.stage.circle.parent.position.x;
	}
	
	obj.setX(xpos);
	obj.setY(WORLD.FLOOR);
	
	return obj;
}