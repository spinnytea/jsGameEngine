function loadMainstreet(background, foreground, onScreenObjects) {
	emptyScreenObjects(background, foreground, onScreenObjects);
	onScreenObjects.push(createActor(background, 250));
	onScreenObjects.push(createActor(foreground, 270));
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