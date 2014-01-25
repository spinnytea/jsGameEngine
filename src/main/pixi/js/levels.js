function loadMainstreet(background, foreground, onScreenObjects) {
	emptyScreenObjects(background, foreground, onScreenObjects);
	onScreenObjects.push(createActor(background, 250));
	var talker = createActor(foreground, 270);
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

function loadHouse() {
	emptyScreenObjects(background, foreground, onScreenObjects);
	onScreenObjects.push(createActor(background, 200));
	onScreenObjects.push(createActor(foreground, 100));
}


function emptyScreenObjects(background, foreground, onScreenObjects) {
	for(i in onScreenObjects)
		for(j in onScreenObjects[i].stage) {
			var sprite = onScreenObjects[i].stage[j];
			sprite.parent.removeChild(sprite);
		}
	onScreenObjects.length = 0;
}