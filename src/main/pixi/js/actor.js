function createActor(stage, xpos, texturename) {
	var obj = {};
	
	// create a texture from an image path
	// create a new Sprite using the texture
	if(!texturename)
		texturename = "triangle";
	var circle = new PIXI.Sprite(getTexture(texturename));
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
	
	obj.state.movement = {
		original_x: obj.stage.circle.position.x,
		max_dist: 32,
		move_chance: 0.01,
		move_step: 0,
		move_maxsteps: 40,
		move_speed: 0, // modifier
	};
	obj.movement = function() {
		// if we are already moving, then keep moving
		// if we are not moving, then there is a chance to start
		if(obj.state.movement.move_step > 0 || Math.random() < obj.state.movement.move_chance) {
			// if we are starting a move, then randomize the movement speed modifier
			if(obj.state.movement.move_step == 0) {
				obj.state.movement.move_speed = Math.random() * 0.5 + 0.2;
				
				// change the randomness of the direction flip based on distance away from the original
				if(Math.random() > (obj.state.movement.original_x-obj.getX())/(obj.state.movement.max_dist*2) + 0.5)
					obj.state.movement.move_speed *= -1;
			}
			
			// first movment step will be 1
			obj.state.movement.move_step++;
			// if we get to the end of the movement step count, then reset the movement state
			if(obj.state.movement.move_step >= obj.state.movement.move_maxsteps) {
				obj.state.movement.is_moving = false;
				obj.state.movement.move_step = 0;
			} else {
				// calculate the speed (interpolate the positive side of a sin wav
				var speed = Math.sin(obj.state.movement.move_step*Math.PI/obj.state.movement.move_maxsteps);
				obj.setX(
						Math.min(obj.state.movement.original_x + obj.state.movement.max_dist,
								Math.max(obj.state.movement.original_x - obj.state.movement.max_dist,
										obj.getX() + speed * obj.state.movement.move_speed)));
			}
		}
	}
	
	obj.update = function() {
		if(obj.movement)
			obj.movement();
		
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
		obj.stage.circle.position.x = x;
		obj.stage.shadow.position.x = x;
	};
	obj.setY = function(y) {
		obj.stage.circle.position.y = y;
		obj.stage.shadow.position.y = y;
	};
	
	obj.getStageX = function() {
		return obj.stage.circle.position.x + obj.stage.circle.parent.position.x;
	}
	
	obj.setX(xpos);
	obj.setY(WORLD.FLOOR);
	
	return obj;
}


function createAgent(stage, xpos) {
	var agent = createActor(stage, xpos, "square");
	agent.movement = null;
	
	// scalar value from 0 to 1
	agent.state.mood      = 0.1;
    agent.state.jump      = 0;
    agent.state.doJump    = false;
	agent.state.onGround  = true;
	agent.state.velocity  = 0;
	agent.state.jump_velocity = 0;
	agent.state.direction = 1;

	var update = agent.update;
	agent.update = function() {
		update();

		if(agent.state.doJump && agent.state.onGround)  {
			agent.state.doJump   = false;
			agent.state.onGround = false;
			increaseMood(0.001, 0.9);
			if(WORLD.EEGGS.jumpover_count < 0) {
				playSound("jump");
				if(WORLD.MOVEMENT == "player") {
					WORLD.EEGGS.moonmoon_count--;
					if(WORLD.EEGGS.moonmoon_count < 0) {
						WORLD.thesun.setTexture(getTexture("sunsun"));
						WORLD.themoon.setTexture(getTexture("moonmoon"));
						WORLD.EEGGS.ready_go = true;
					}
				}
			}
		}
		if(!agent.state.onGround) {
			agent.state.jump += 0.1;
			if(WORLD.FLOOR - Math.sin(agent.state.jump) >= WORLD.FLOOR) {
				agent.state.jump = 0;
				agent.state.onGround = true;
				WORLD.EEGGS.jump_state = 0;
			}
		}

		agent.stage.circle.position.y = WORLD.FLOOR - (agent.base.height*2*Math.sin(agent.state.jump));
		agent.state.jump_velocity = agent.state.jump*0.1*agent.state.direction;
	};
	
	// you can have three items
	agent.inventory = [ null, null ];
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
	if(!threshold || WORLD.AGENT.state.mood < threshold)
		WORLD.AGENT.state.mood += amount;
	
	// clamp the value between 0 and 1
	WORLD.AGENT.state.mood = Math.max(0, Math.min(1, WORLD.AGENT.state.mood));
}

// put an item in the inventory
// THIS MAY FAIL AND THE ITEM WILL BE LOST
function aquireProp(prop) {
	removeObjectFromScene(prop);
	var success = false;
	
	for(i in WORLD.AGENT.inventory)
		if(WORLD.AGENT.inventory[i] == null) {
			success = true;
			WORLD.AGENT.inventory[i] = prop;
			WORLD.AGENT.stage.circle.parent.addChild(prop.stage.item);
			prop.setX(40 * (i * 1.5 + 1));
			prop.setY(WORLD.HEIGHT - 20);
			break;
		}
	
	if(!success)
		dialog("[an item has been lost forever]");
}

function useItem(name, amount) {
	var success = false;
	
	for(i in WORLD.AGENT.inventory)
		if(WORLD.AGENT.inventory[i] != null && WORLD.AGENT.inventory[i].name == name) {
			removeObjectFromScene(WORLD.AGENT.inventory[i]);
			increaseMood(amount);
			WORLD.AGENT.inventory[i] = null;
			success = true;
			break;
		}
	
	if(!success)
		dialog("[you don't have a "+name+"]");
}
