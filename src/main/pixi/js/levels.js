function loadMainstreet(onScreenObjects, from) {
	emptyScreenObjects(onScreenObjects);
	WORLD.AGENT.setX(WORLD.WIDTH / 2);
	WORLD.MOVEMENT = "world";

	var therapist = createProp(WORLD.GROUNDS.foreground, -300, "therapist", 400, 0.7);
	therapist.interact = function() { loadTherapist(onScreenObjects); };
	onScreenObjects.push(therapist);
	if(from && from == "therapist")
		WORLD.GROUNDS.foreground.position.x = WORLD.WIDTH / 2 - therapist.getX();

	var house = createProp(WORLD.GROUNDS.foreground, 270, "house", 250, 0.3);
	house.interact = function() { loadHouse(onScreenObjects); };
	onScreenObjects.push(house);
	if(from && from == "house")
		WORLD.GROUNDS.foreground.position.x = WORLD.WIDTH / 2 - house.getX();
	
	// only show the library if we have had the quest at some point
	var show_library = function() {
		var library = createProp(WORLD.GROUNDS.foreground, 1200, "library", 300, 0.63);
		library.interact = function() {
			dialog("[the book has been returned]");
			useItem("book", 0.15, 0.5);
		};
		onScreenObjects.push(library);
	};
	if(WORLD.PROGRESS.show_library)
		show_library();
	
	var talker = createActor(WORLD.GROUNDS.foreground, 470);
	talker.interact = function() {
		dialog("How are you feeling today?",
				[
				 { 'text': "Kind of grey.", 'response': "We all feel that way sometimes.", 'action': function() { increaseMood(0.05, 0.3); } },
				 { 'text': "Okay, I guess.", 'response': "We all feel that way sometimes.", 'action': function() { increaseMood(0.05, 0.3); } },
				 { 'text': "...", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05, 1); } },
				 ]);
	};
	onScreenObjects.push(talker);
	
	var libquest = createActor(WORLD.GROUNDS.foreground, 100);
	// only allow the quest if you haven't started
	if(!WORLD.PROGRESS.show_library)
	libquest.interact = function() {
		dialog("Hey, Square, you're heading towards the library, right? Can you return this book for me?",
				[
				 { 'text': "Sure.", 'response': "Thanks! [Hands Square the book]", 'action': function() {
					 increaseMood(0.05, 0.3);
					 aquireProp(createProp(WORLD.GROUNDS.foreground, 0, "book"));
					if(!WORLD.PROGRESS.show_library) {
						WORLD.PROGRESS.show_library = true;
						show_library();
					}
					libquest.interact = null;
				 } },
				 { 'text': "Okay, I guess.", 'response': "Oh, okay then.", 'action': function() { increaseMood(-0.05, 0.3); } },
				 ]);
	};
	onScreenObjects.push(libquest);
	
	// create the ground
	var ground = new PIXI.Sprite(getTexture("ground"));
	ground.width = WORLD.WIDTH;
	ground.position.y = WORLD.FLOOR;
	WORLD.GROUNDS.staticforeground.addChild(ground);
	onScreenObjects.push({'stage': {'item': ground } });
}


function loadHouse(onScreenObjects) {
	emptyScreenObjects(onScreenObjects);
	WORLD.MOVEMENT = "player";
	
	var bedroom = createProp(WORLD.GROUNDS.staticforeground, WORLD.WIDTH * 0.44, "bedroom", WORLD.HEIGHT * 1.2, 0.44);
	bedroom.setY(WORLD.HEIGHT);
	bedroom.stage.item.width = WORLD.WIDTH;
	bedroom.interact = function() {
		loadMainstreet(onScreenObjects, "house");
//		dialog("Go outside?",
//				[
//				 { 'text': "Yes.", 'response': "Off you go.", 'action': function() { loadMainstreet(onScreenObjects); } },
//				 { 'text': "No.", 'response': "Not right now.", 'action': function() { } },
//				 ]);
	};
	onScreenObjects.push(bedroom);
	WORLD.AGENT.setX(bedroom.getStageX());
}

function loadTherapist(onScreenObjects) {
	emptyScreenObjects(onScreenObjects);
	WORLD.MOVEMENT = "player";
	
	var interior = createProp(WORLD.GROUNDS.staticforeground, WORLD.WIDTH * 0.5, "therapistinterior", WORLD.HEIGHT * 1.2);
	interior.setY(WORLD.HEIGHT);
	interior.stage.item.width = WORLD.WIDTH;
	interior.interact = function() {
		loadMainstreet(onScreenObjects, "therapist");
	};
	onScreenObjects.push(interior);
	WORLD.AGENT.setX(interior.getStageX());
}


function emptyScreenObjects(onScreenObjects) {
	for(i in onScreenObjects)
		removeObjectFromScene(onScreenObjects[i]);
	onScreenObjects.length = 0;
}
function removeObjectFromScene(obj) {
	for(j in obj.stage) {
		var sprite = obj.stage[j];
		sprite.parent.removeChild(sprite);
	}
}