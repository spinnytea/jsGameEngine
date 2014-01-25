function loadMainstreet(background, foreground, onScreenObjects) {
	emptyScreenObjects(background, foreground, onScreenObjects);

	var house = createProp(foreground, 270, "house", 250, 0.3);
	house.interact = function() {
		dialog("Go home?",
				[
				 { 'text': "Yes.", 'response': "Welcome home.", 'action': function() { loadHouse(background, foreground, onScreenObjects); } },
				 { 'text': "No.", 'response': "Let's do something first.", 'action': function() { } },
				 ]);
	}
	onScreenObjects.push(house);

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
}

function loadHouse(background, foreground, onScreenObjects) {
	emptyScreenObjects(background, foreground, onScreenObjects);
}


function emptyScreenObjects(background, foreground, onScreenObjects) {
	for(i in onScreenObjects)
		for(j in onScreenObjects[i].stage) {
			var sprite = onScreenObjects[i].stage[j];
			sprite.parent.removeChild(sprite);
		}
	onScreenObjects.length = 0;
}