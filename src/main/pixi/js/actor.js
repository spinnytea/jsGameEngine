function createActor(stage, xpos) {
	var obj = {};
	
	// create a texture from an image path
	// create a new Sprite using the texture
	var circle = new PIXI.Sprite(getTexture("circle"));
	var shadow = new PIXI.Sprite(getTexture("shadow"));
	
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
		//// step the breathing
	    // update breathing state
	    obj.state.breathingStep += obj.state.activity*obj.state.breathingVel;
	    if(obj.state.breathingStep > obj.base.breathingMagnitude || obj.state.breathingStep < -obj.base.breathingMagnitude)
	    	obj.state.breathingVel *= -1;
	    // update stage state
	    obj.stage.shadow.width = obj.base.width + obj.state.breathingStep;
	    obj.stage.circle.width = obj.base.width + obj.state.breathingStep;
	    obj.stage.circle.height = obj.base.height - obj.state.breathingStep;
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


function createAgent(stage, xpos) {
	var agent = createActor(stage, xpos);
	
	// scalar value from 0 to 1
	agent.state.mood = 0.1;
	agent.state.velocity = 0;
	
	// you can have three items
	agent.inventory = [ null, null, null ];
	for(i in agent.inventory) {
		var slot = new PIXI.Sprite(getTexture("inventoryslot"));
		slot.width = slot.height = 40;
		slot.position.x = slot.width * (i * 1.5 + 0.5);
		slot.position.y = WORLD.HEIGHT - slot.height * 1.5;
		stage.addChild(slot);
	}
	
	return agent;
}

// if the mood is below this threshold, then increase the mood be this amount
function increaseMood(amount, threshold) {
	if(WORLD.AGENT.state.mood < threshold)
		WORLD.AGENT.state.mood += amount;
	
	// clamp the value between 0 and 1
	WORLD.AGENT.state.mood = Math.max(0, Math.min(1, WORLD.AGENT.state.mood));
}
