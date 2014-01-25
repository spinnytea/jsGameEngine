function loadMainstreet(background, foreground, onScreenObjects) {
	onScreenObjects.length = 0;
	onScreenObjects.push(createActor(background, 250));
	onScreenObjects.push(createActor(foreground, 270));
}
