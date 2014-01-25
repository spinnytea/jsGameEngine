function loadMainstreet(background, foreground, onScreenObjects) {
	emptyScreenObjects(background, foreground, onScreenObjects);

	var house = createProp(foreground, 270, "house", 250, 0.3);
	house.interact = function() {
		dialog("Go home?",
				[
				 { 'text': "Yes.", 'response': "Welcome home.", 'action': function() { loadHouse(background, foreground, onScreenObjects); } },
				 { 'text': "No.", 'response': "Let's do something first.", 'action': function() { } },
				 ]);
	};
	onScreenObjects.push(house);

	var library = createProp(foreground, 1200, "library", 300, 0.63);
	library.interact = function() {
		useItem("book", 0.15, 0.5);
		dialog("[the book has been returned]");
	};
	onScreenObjects.push(library);
	
	var talker = createActor(foreground, 470);
	talker.interact = function() {
		dialog("How are you feeling today?",
				[
				 { 'text': "Kind of grey.", 'response': "We all feel that way sometimes.", 'action': function() { increaseMood(0.05, 0.3); } },
				 { 'text': "Okay, I guess.", 'response': "We all feel that way sometimes.", 'action': function() { increaseMood(0.05, 0.3); } },
				 { 'text': "...", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05, 1); } },
				 ]);
	};
	onScreenObjects.push(talker);
	
	var libquest = createActor(foreground, 100);
	libquest.interact = function() {
		dialog("Hey, Square, you're heading towards the library, right? Can you return this book for me?",
				[
				 { 'text': "Sure.", 'response': "Thanks! [Hands Square the book]", 'action': function() { increaseMood(0.05, 0.3); aquireProp(createProp(foreground, 0, "book")); } },
				 { 'text': "Okay, I guess.", 'response': "Oh, okay then.", 'action': function() { increaseMood(-0.05, 0.3); } },
				 ]);
	};
	onScreenObjects.push(libquest);
}

function loadHouse(background, foreground, onScreenObjects) {
	emptyScreenObjects(background, foreground, onScreenObjects);
}


function emptyScreenObjects(background, foreground, onScreenObjects) {
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