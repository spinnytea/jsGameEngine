function createProp(stage, xpos, texturename, height)
{
	var obj = {};
	
	// create a texture from an image path
	// create a new Sprite using the texture
	var image = "assets/" + texturename + ".png";
	var item = new PIXI.Sprite(PIXI.Texture.fromImage(image));
	
	// center the sprites anchor point
	item.anchor.x = 0.1;
	item.anchor.y = 1;
	
	stage.addChild(item);
	
	obj.stage = {};
	obj.stage.item = item;
	
	var radio = item.width/item.height;
	item.width = radio*height;
	item.height = height;

	//obj.base.width = 32;
	//obj.base.height = 32;
	// obj.base.breathingMagnitude = breath;
	
	// if(breath != 0) {
	// 	obj.state = {};
	// 	obj.state.breathingStep = 0;
	// 	obj.state.breathingVel = 1;
	// 	obj.state.activity = Math.random()*0.1 + 0.25;
	// }
	
	// set the height of the shadow
	//obj.stage.shadow.height = obj.base.height / 4;
	
	obj.update = function() {
		
	// 	//// step the breathing
	//     // update breathing state
	//     obj.state.breathingStep += obj.state.activity*obj.state.breathingVel;
	//     if(obj.state.breathingStep > obj.base.breathingMagnitude || obj.state.breathingStep < -obj.base.breathingMagnitude)
	//     	obj.state.breathingVel *= -1;
	//     // update stage state
	//     obj.stage.shadow.width = obj.base.width + obj.state.breathingStep;
	//     obj.stage.circle.width = obj.base.width + obj.state.breathingStep;
	//     obj.stage.circle.height = obj.base.height - obj.state.breathingStep;
	};
	
	obj.getX = function() { return obj.stage.item.position.x };
	obj.getY = function() { return obj.stage.item.position.y };
	obj.setX = function(x) {
		item.position.x = x;
	};
	obj.setY = function(y) {
		item.position.y = y;
	};
	
	obj.getStageX = function() {
		return obj.stage.item.position.x + obj.stage.item.parent.position.x;
	}
	
	obj.setX(xpos);
	obj.setY(WORLD.FLOOR);
	
	return obj;
}