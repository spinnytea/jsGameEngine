function createProp(stage, xpos, texturename, height)
{
	var obj = {};
	
	// create a texture from an image path
	// create a new Sprite using the texture
	var item = new PIXI.Sprite(getTexture(texturename));
	
	// center the sprites anchor point
	item.anchor.x = 0.1;
	item.anchor.y = 1;
	
	stage.addChild(item);
	
	obj.stage = {};
	obj.stage.item = item;
	
	if(height) {
		var ratio = item.width/item.height;
		item.width = ratio*height;
		item.height = height;
	}
	
	
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