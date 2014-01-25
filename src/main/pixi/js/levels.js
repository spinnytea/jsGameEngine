function loadMainstreet(background, foreground, onScreenObjects) {
	emptyScreenObjects(background, foreground, onScreenObjects);

	onScreenObjects.push(createActor(background, 250));

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

	onScreenObjects.push(createProp(foreground, 200));
    var house = createProp(foreground, 270, "house", 250);

    house.interact = function() {
    	dialog("Go home?",
				[
				 { 'text': "Yes.", 'response': "Welcome home.", 'action': function() { increaseMood(-0.05, 0.3); } },
				 { 'text': "No.", 'response': "Let's do something first.", 'action': function() { increaseMood(0.05, 0.3); } },
				 { 'text': "...", 'response': "I'm not going to force you to talk, but it does help.", 'action': function() { increaseMood(-0.05, 1); } },
				]);
    }

	onScreenObjects.push(house);
}

function loadHouse() {
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