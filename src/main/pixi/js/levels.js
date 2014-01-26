function loadMainstreet(onScreenObjects, from) {
	emptyScreenObjects(onScreenObjects);
	WORLD.AGENT.setX(WORLD.WIDTH / 2);
	WORLD.MOVEMENT = "world";
	WORLD.MAP_MIN = -2400;
	WORLD.MAP_MAX = 2400;

	var therapist = createProp(WORLD.GROUNDS.foreground, -300, "therapist", 400, 0.986, 0.7);
	therapist.interact = function() { loadTherapist(onScreenObjects); };
	onScreenObjects.push(therapist);
	if(from && from == "therapist")
		WORLD.GROUNDS.foreground.position.x = WORLD.WIDTH / 2 - therapist.getX();

	onScreenObjects.push(createProp(WORLD.GROUNDS.foreground, 0, "tree", 0.736, 300));
	
	var house = createProp(WORLD.GROUNDS.foreground, 270, "house", 250, 0.756, 0.3);
	house.interact = function() { loadHouse(onScreenObjects); };
	onScreenObjects.push(house);
	if(from && from == "house")
		WORLD.GROUNDS.foreground.position.x = WORLD.WIDTH / 2 - house.getX();
	
	var linwoodhouse = createProp(WORLD.GROUNDS.foreground, 550, "linwoodhouse", 300, 1.977, 0.275);
	linwoodhouse.setY(linwoodhouse.getY()+10);
	if(WORLD.PROGRESS.unlock_linwood || WORLD.SHOW_ALL)
		linwoodhouse.interact = function() { loadLinwoodHouse(onScreenObjects); };
	onScreenObjects.push(linwoodhouse);
	if(from && from == "linwoodhouse")
		WORLD.GROUNDS.foreground.position.x = WORLD.WIDTH / 2 - linwoodhouse.getX();
	
	// only show the library if we have had the quest at some point
	var show_library = function() {
		var library = createProp(WORLD.GROUNDS.foreground, 1200, "library", 300, 1.396, 0.63);
		library.interact = function() {
			dialog("[the book has been returned]");
			useItem("book", 0.15);
		};
		onScreenObjects.push(library);
		
		var libtalker = createActor(WORLD.GROUNDS.foreground, 1400);
		if(WORLD.PROGRESS.questions.indexOf("libtalker") == -1)
		libtalker.interact = function() {
			dialog("I haven't you seen you in forever! How are you these days?",
					[
					 { 'text': "Oh, I'm doing okay.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("libtalker");
						 libtalker.interact = null;
					 } },
					 { 'text': "Not so good, actually...", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("libtalker");
						 libtalker.interact = null;
					 } },
					 { 'text': "(silence)", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(libtalker);
	};
	if(WORLD.PROGRESS.show_library || WORLD.SHOW_ALL)
		show_library();
	
	var talker_sosadhearhappened = createActor(WORLD.GROUNDS.foreground, 40);
	if(WORLD.PROGRESS.questions.indexOf("sosadhearhappened") == -1)
	talker_sosadhearhappened.interact = function() {
		dialog("I haven't you seen you in forever! How are you these days?",
				[
				 { 'text': "Thanks. That means a lot.", 'action': function() {
					 increaseMood(0.05);
					 WORLD.PROGRESS.questions.push("sosadhearhappened");
					 talker_sosadhearhappened.interact = null;
				 } },
				 { 'text': "I'm okay, actually. I don't really need anything.", 'action': function() {
					 increaseMood(0.05);
					 WORLD.PROGRESS.questions.push("sosadhearhappened");
					 talker_sosadhearhappened.interact = null;
				 } },
				 { 'text': "(silence)", 'action': function() { increaseMood(-0.05); } },
				 ]);
	};
	onScreenObjects.push(talker_sosadhearhappened);
	
	if(WORLD.AGENT.state.mood > 0.3 || WORLD.SHOW_ALL) {
		var talker_sillyquestion = createActor(WORLD.GROUNDS.foreground, 470);
		if(WORLD.PROGRESS.questions.indexOf("sillyquestion") == -1)
		talker_sillyquestion.interact = function() {
			dialog("Oh! H-hi, Square. How you doing? Oh, sorry, that's a stupid question!",
					[
					 { 'text': "You don't have to handle me with kid gloves.", 'action': function() {
						 increaseMood(0.1);
						 WORLD.PROGRESS.questions.push("sillyquestion");
						 talker_sillyquestion.interact = null;
					 } },
					 { 'text': "Yeah, it kind of was.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("sillyquestion");
						 talker_sillyquestion.interact = null;
					 } },
					 { 'text': "(silence)", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_sillyquestion);
		
		var talker_itsyou = createActor(WORLD.GROUNDS.foreground, 140);
		talker_itsyou.interact = function() {
			dialog("Oh, it's you. What do you want?",
					[
					 { 'text': "Nothing. Sorry to bother you.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("itsyou");
						 talker_itsyou.interact = null;
					 } },
					 { 'text': "Stop treating me like this. It wasn't my fault!", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("itsyou");
						 talker_itsyou.interact = null;
					 } },
					 { 'text': "(silence)", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_itsyou);
		
		var talker_gossip = createActor(WORLD.GROUNDS.foreground, -160);
		if(WORLD.PROGRESS.questions.indexOf("gossip") == -1)
		talker_gossip.interact = function() {
			dialog("Heard about what happened, Square. I'm so sorry.",
					[
					 { 'text': "I don't really want to talk about it.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("gossip");
						 talker_gossip.interact = null;
					 } },
					 { 'text': "Thanks.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("gossip");
						 talker_gossip.interact = null;
					 } },
					 { 'text': "(silence)", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_gossip);
		
		var talker_hexstart = createActor(WORLD.GROUNDS.foreground, 950, "pentagon");
		if(!WORLD.PROGRESS.unlock_linwood)
		talker_hexstart.interact = function() {
			dialog("Square! I just hear Hexagon isn't feeling well. You're neighbors, right? Why don't you stop by and see if you can help?",
					[
					 { 'text': "You're right, I should.", 'response': "Here, take this with you.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("hexstart");
						 WORLD.PROGRESS.unlock_linwood = true;
						 aquireProp(createProp(WORLD.GROUNDS.foreground, 0, "fruitbasket"));
						 linwoodhouse.interact = function() { loadLinwoodHouse(onScreenObjects); };
						 talker_hexstart.interact = null;
					 } },
					 { 'text': "I'm not in a good place to be helpful.", 'response': "Well, that's selfish.", 'action': function() { increaseMood(-0.1); } },
					 ]);
		};
		onScreenObjects.push(talker_hexstart);
	}
	
	if(WORLD.AGENT.state.mood > 0.5 || WORLD.SHOW_ALL) {
		var talker_goverit = createActor(WORLD.GROUNDS.foreground, 780);
		if(WORLD.PROGRESS.questions.indexOf("goverit") == -1)
		talker_goverit.interact = function() {
			dialog("I know you're upset, Square, but you have to get over it. You can't let it keep you down forever!",
					[
					 { 'text': "Screw you.", 'action': function() { increaseMood(-0.1); } },
					 { 'text': "I'm trying, okay?", 'action': function() {
						 increaseMood(0.1);
						 WORLD.PROGRESS.questions.push("goverit");
						 talker_goverit.interact = null;
					 } },
					 { 'text': "(silence)", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_goverit);
		
		var talker_weekend = createActor(WORLD.GROUNDS.foreground, 720);
		if(WORLD.PROGRESS.questions.indexOf("weekend") == -1)
		talker_weekend.interact = function() {
			dialog("Hey, Square! Got any plans for this weekend?",
					[
					 { 'text': "Not really.", 'action': function() {
						 increaseMood(0.05);
						 WORLD.PROGRESS.questions.push("weekend");
						 talker_weekend.interact = null;
					 } },
					 { 'text': "(silence)", 'action': function() { increaseMood(-0.05); } },
					 ]);
		};
		onScreenObjects.push(talker_weekend);
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
	
	var bedroom = createProp(WORLD.GROUNDS.staticforeground, WORLD.WIDTH * 0.44, "bedroom", WORLD.HEIGHT * 1.2, 1, 0.44);
	bedroom.setY(WORLD.HEIGHT);
	bedroom.stage.item.width = WORLD.WIDTH;
	bedroom.interact = function() { loadMainstreet(onScreenObjects, "house"); };
	onScreenObjects.push(bedroom);
	WORLD.AGENT.setX(bedroom.getStageX());

	//add go to bed choice
	var bed = createActor(WORLD.GROUNDS.staticforeground, 670, "circle");
	bed.update = null;
	bed.setY(340);
	bed.interact = function() {
		dialog("It's late. What to go to bed?",
		[
		 { 'text': "Sure.", 'response': "Good.", 'action': function() {
			 increaseMood(0.1);
			 //To do:
			 //loadDream();
			 WORLD.SLEEPSTATE.step = 0.1;
		 } },
		 { 'text': "I don't feel like to go to sleep.", 'response': "Ok then.", 'action': function() {
			 increaseMood(-0.1);
		 } },
		 { 'text': "...", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
		 ]);
	};
	bed.stage.circle.visible = false;
	bed.stage.shadow.visible = false;
	onScreenObjects.push(bed);
}

function loadLinwoodHouse(onScreenObjects) {
	emptyScreenObjects(onScreenObjects);
	WORLD.MOVEMENT = "player";
	WORLD.MAP_MIN = 0;
	WORLD.MAP_MAX = WORLD.WIDTH;
	
	var hexint = createProp(WORLD.GROUNDS.staticforeground, WORLD.WIDTH * 0.44, "hexint", WORLD.HEIGHT * 1.2, 1, 0.44);
	hexint.setY(WORLD.HEIGHT);
	hexint.stage.item.width = WORLD.WIDTH;
	hexint.interact = function() { loadMainstreet(onScreenObjects, "linwoodhouse"); };
	onScreenObjects.push(hexint);
	WORLD.AGENT.setX(hexint.getStageX());
	
	var hex = createActor(WORLD.GROUNDS.foreground, 900, "hexagon");
	if(!WORLD.PROGRESS.finished_linwood) {
		hex.interact = function() {
			dialog("Thank you Square! You're showing your true angles.");
			useItem("fruitbasket", 0.15);
			hex.interact = function() { dialog("Thanks Square!"); };
			WORLD.PROGRESS.finished_linwood = true;
		};
	} else {
		hex.interact = function() { dialog("Thanks Square!"); };
	}
	onScreenObjects.push(hex);
}

function loadTherapist(onScreenObjects) {
	emptyScreenObjects(onScreenObjects);
	WORLD.MOVEMENT = "player";
	WORLD.MAP_MIN = 0;
	WORLD.MAP_MAX = WORLD.WIDTH;
	
	var interior = createProp(WORLD.GROUNDS.staticforeground, WORLD.WIDTH * 0.5, "therapistinterior", WORLD.HEIGHT * 1.2, 1);
	interior.setY(WORLD.HEIGHT);
	interior.stage.item.width = WORLD.WIDTH;
	interior.interact = function() {
		loadMainstreet(onScreenObjects, "therapist");
	};
	onScreenObjects.push(interior);
	WORLD.AGENT.setX(interior.getStageX());
	
	var interactions = [
	 function() {
			dialog("How are you feeling today?",
					[
					 { 'text': "Kind of grey.", 'response': "We all feel that way sometimes.", 'action': function() {
						 increaseMood(0.02);
						 WORLD.PROGRESS.therapist_question++;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "Okay, I guess.", 'response': "We all feel that way sometimes.", 'action': function() {
						 increaseMood(0.02);
						 WORLD.PROGRESS.therapist_question++;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "...", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
					 ]);
	 },
	 function() {
			dialog("Do you blame yourself?",
					[
					 { 'text': "It was all my fault, of course I do.", 'response': "Blaming yourself won't help. You did all you could.", 'action': function() {
						 increaseMood(0.02);
						 WORLD.PROGRESS.therapist_question++;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "Sometimes.", 'response': "Blaming yourself won't help. You did all you could.", 'action': function() {
						 increaseMood(0.02);
						 WORLD.PROGRESS.therapist_question++;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "(silence)", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
					 ]);
	 },
	 function() {
			dialog("What are you thinking about the future?",
					[
					 { 'text': "How can I possibly think about a future?", 'response': "Just take it one day at a time. Let's talk about tomorrow.", 'action': function() {
						 increaseMood(-0.05);
						 WORLD.PROGRESS.therapist_question++;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "Hmm. I think I'd like to pick up my hobbies again sometime.", 'response': "That sounds like a great idea. Let's make a plan for that.", 'action': function() {
						 increaseMood(0.02);
						 WORLD.PROGRESS.therapist_question++;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "(silence)", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
					 ]);
	 },
	 function() {
			dialog("How are your dreams?",
					[
					 { 'text': "Better. Less frequent, at least.", 'response': "And why do you think that's happening?", 'action': function() {
						 increaseMood(0.02);
						 WORLD.PROGRESS.therapist_question++;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "Worse...I feel so helpless.", 'response': "And why do you think that's happening?", 'action': function() {
						 increaseMood(0.02);
						 WORLD.PROGRESS.therapist_question++;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "(silence)", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
					 ]);
	 },
	 function() {
			dialog("Have you been making any efforts to stay in touch with your loved ones?",
					[
					 { 'text': "Not really. It's hard to see the point these days.", 'response': "Don't you notice the difference when you put forth the effort?", 'action': function() {
						 increaseMood(0.02);
						 WORLD.PROGRESS.therapist_question = 0;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "Yes, even though it's hard.", 'response': "Don't you notice the difference when you put forth the effort?", 'action': function() {
						 increaseMood(0.03);
						 WORLD.PROGRESS.therapist_question = 0;
						 therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
					 } },
					 { 'text': "(silence)", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05); } },
					 ]);
	 },
	 ];
	
	var therapist = createActor(WORLD.GROUNDS.staticforeground, 270, "circle");
	therapist.movement = null;
	therapist.setY(355);
	therapist.interact = interactions[WORLD.PROGRESS.therapist_question];
	onScreenObjects.push(therapist);
}

function loadStart(onScreenObjects, num) {
	emptyScreenObjects(onScreenObjects);
	WORLD.MOVEMENT = "none";
	WORLD.MAP_MIN = 0;
	WORLD.MAP_MAX = WORLD.WIDTH;
	WORLD.AGENT.state.mood = 0.89;
	
	if(!num)
		num = 1;
	
	var xanchor = 0.2;
	switch(num) {
	case 1: xanchor = 0.325; break;
	case 2: xanchor = 0.435; break;
	case 3:
		xanchor = 0.375;
		WORLD.AGENT.state.mood = 0.5;
		break;
	case 4:
		xanchor = 0.47;
		WORLD.AGENT.state.mood = 0.1;
		break;
	}
	
	var slide = createProp(WORLD.GROUNDS.staticforeground, WORLD.WIDTH * xanchor, "P"+num, WORLD.HEIGHT, 1, xanchor);
	slide.setY(WORLD.HEIGHT);
	slide.stage.item.width = WORLD.WIDTH;
	slide.interact = function() {
		if(num == 4) {
			WORLD.AGENT.stage.circle.visible = true;
			WORLD.AGENT.stage.shadow.visible = true;
			loadHouse(onScreenObjects);
		} else
			loadStart(onScreenObjects, num+1);
	};
	onScreenObjects.push(slide);
	WORLD.AGENT.setX(slide.getStageX());
	WORLD.AGENT.stage.circle.visible = false;
	WORLD.AGENT.stage.shadow.visible = false;
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