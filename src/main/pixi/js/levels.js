function loadMainstreet(onScreenObjects, from) {
	emptyScreenObjects(onScreenObjects);
	WORLD.AGENT.setX(WORLD.WIDTH / 2);
	WORLD.MOVEMENT = "world";
	WORLD.MAP_MIN = -2400;
	WORLD.MAP_MAX = 2400;

	var therapist = createProp(WORLD.GROUNDS.foreground, -300, "therapist", 400, 0.7);
	therapist.interact = function() { loadTherapist(onScreenObjects); };
	onScreenObjects.push(therapist);
	if(from && from == "therapist")
		WORLD.GROUNDS.foreground.position.x = WORLD.WIDTH / 2 - therapist.getX();

	onScreenObjects.push(createProp(WORLD.GROUNDS.foreground, 0, "tree", 300));
	
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
		
		var libtalker = createActor(WORLD.GROUNDS.foreground, 1400);
		libtalker.interact = function() {
			dialog("What are you thinking about the future?",
					[
					 { 'text': "How can I possibly think about a future?", 'response': "Just take it one day at a time. Let's talk about tomorrow.", 'action': function() { increaseMood(-0.05); } },
					 { 'text': "Hmm. I think I'd like to pick up my hobbies again sometime.", 'response': "That sounds like a great idea. Let's make a plan for that.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("What are you thinking about the future?");
					 } },
					 { 'text': "(silence)", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(libtalker);
	};
	if(WORLD.PROGRESS.show_library || WORLD.SHOW_ALL)
		show_library();
	
	var talker_feeling = createActor(WORLD.GROUNDS.foreground, -100);
	talker_feeling.interact = function() {
		dialog("How are you feeling today?",
				[
				 { 'text': "Kind of grey.", 'response': "We all feel that way sometimes.", 'action': function() {
					 increaseMood(0.05);
					 WORLD.PROGRESS.questions.push("How are you feeling today?");
				 } },
				 { 'text': "Okay, I guess.", 'response': "We all feel that way sometimes.", 'action': function() {
					 increaseMood(0.05);
					 WORLD.PROGRESS.questions.push("How are you feeling today?");
				 } },
				 { 'text': "...", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
				 ]);
	};
	onScreenObjects.push(talker_feeling);
	
	if(WORLD.AGENT.state.mood > 0.3 || WORLD.SHOW_ALL) {
		var talker_blame = createActor(WORLD.GROUNDS.foreground, 470);
		talker_blame.interact = function() {
			dialog("Do you blame yourself?",
					[
					 { 'text': "It was all my fault, of course I do.", 'response': "Blaming yourself won't help. You did all you could.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("Do you blame yourself?");
					 } },
					 { 'text': "Sometimes.", 'response': "Blaming yourself won't help. You did all you could.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("Do you blame yourself?");
					 } },
					 { 'text': "(silence)", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_blame);
		
		var talker_dreams = createActor(WORLD.GROUNDS.foreground, 800);
		talker_dreams.interact = function() {
			dialog("How are your dreams?",
					[
					 { 'text': "Better. Less frequent, at least.", 'response': "And why do you think that's happening?", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("How are your dreams?");
					 } },
					 { 'text': "Worse...I feel so helpless.", 'response': "And why do you think that's happening?", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("How are your dreams?");
					 } },
					 { 'text': "(silence)", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_dreams);
		
		var talker_gossip = createActor(WORLD.GROUNDS.foreground, 850);
		talker_gossip.interact = function() {
			dialog("Heard about what happened, Square. IÕm so sorry.",
					[
					 { 'text': "I donÕt really want to talk about it.", 'response': null, 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("Heard about what happened, Square. IÕm so sorry.");
					 } },
					 { 'text': "Thanks.", 'response': null, 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("Heard about what happened, Square. IÕm so sorry.");
					 } },
					 { 'text': "(silence)", 'response': null, 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_gossip);
		
		var talker_goverit = createActor(WORLD.GROUNDS.foreground, 750);
		talker_goverit.interact = function() {
			dialog("I know youÕre upset, Square, but you have to get over it. You canÕt let it keep you down forever!",
					[
					 { 'text': "Screw you.", 'response': null, 'action': function() { increaseMood(-0.1); } },
					 { 'text': "IÕm trying, okay?", 'response': null, 'action': function() {
						 increaseMood(0.1);
						 WORLD.PROGRESS.questions.push("goverit");
					 } },
					 { 'text': "(silence)", 'response': null, 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_goverit);
		
		var talker_weekend = createActor(WORLD.GROUNDS.foreground, 700);
		talker_goverit.interact = function() {
			dialog("Hey, Square! Got any plans for this weekend?",
					[
					 { 'text': "Not really.", 'response': null, 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("goverit");
					 } },
					 { 'text': "(silence)", 'response': null, 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_goverit);
	}
	
	if(WORLD.AGENT.state.mood > 0.5 || WORLD.SHOW_ALL) {
		var talker_loved = createActor(WORLD.GROUNDS.foreground, 900);
		talker_loved.interact = function() {
			dialog("Have you been making any efforts to stay in touch with your loved ones?",
					[
					 { 'text': "Not really. It's hard to see the point these days.", 'response': "Don't you notice the difference when you put forth the effort?", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("Have you been making any efforts to stay in touch with your loved ones?");
					 } },
					 { 'text': "Yes, even though it's hard.", 'response': "Don't you notice the difference when you put forth the effort?", 'action': function() {
						 increaseMood(0.1);
						 WORLD.PROGRESS.questions.push("Have you been making any efforts to stay in touch with your loved ones?");
					 } },
					 { 'text': "(silence)", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_loved);
	}
	
	var libquest = createActor(WORLD.GROUNDS.foreground, 100, "pentagon");
	// only allow the quest if you haven't started
	if(!WORLD.PROGRESS.show_library)
	libquest.interact = function() {
		dialog("Hey, Square, you're heading towards the library, right? Can you return this book for me?",
				[
				 { 'text': "Sure.", 'response': "Thanks! [Hands Square the book]", 'action': function() {
					 increaseMood(0.05);
					 aquireProp(createProp(WORLD.GROUNDS.foreground, 0, "book"));
					if(!WORLD.PROGRESS.show_library) {
						WORLD.PROGRESS.show_library = true;
						show_library();
					}
					libquest.interact = null;
				 } },
				 { 'text': "I don't think I have the time, sorry.", 'response': "Oh, okay then.", 'action': function() { increaseMood(-0.05); } },
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
	WORLD.MAP_MIN = 330;
	WORLD.MAP_MAX = 670;
	
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
	WORLD.MAP_MIN = 0;
	WORLD.MAP_MAX = WORLD.WIDTH;
	
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