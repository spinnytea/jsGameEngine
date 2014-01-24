
var realtimeGameLoop_previousCall = -1;

/**
 * This will calculate the amount of time that has passed since the last invocation,
 * and call the updateStep as many times as needed.
 * 
 * @param updateStep - update the world state by one step
 * @param drawStep - draw the world
 * @param stepDuration - how many millis does each step last
 */
function realtimeGameLoop(updateStep, drawStep, stepDuration) {
	// get the current time
	var currTime = new Date().getTime();
	var updated = false;
	
	if(realtimeGameLoop_previousCall < 0) {
		// this is the first time we called, so we only need to update once
		updateStep();
		updated = true;
	} else {
		// calculate the ellapsed time
		var ellapsed = currTime - realtimeGameLoop_previousCall;
		
		// run the update step as many times as needed
		while(ellapsed >= stepDuration) {
			updateStep();
			updated = true;
			ellapsed -= stepDuration;
		}
	}
	
	if(updated) {
		// update the latest invocation time
		realtimeGameLoop_previousCall = currTime;
		
		// draw the game
		drawStep();
	}
	
	// how much time do we need to sleep
	var sleep = stepDuration - (new Date().getTime()-currTime);
	if(sleep < 0)
		sleep = 0;
	
	// run this method again after we sleep for a bit
	setTimeout(function(){realtimeGameLoop(updateStep, drawStep, stepDuration)}, sleep);
}

/**
 * This will update and draw the game. It will set a timer to match the sleep duration (minus the time spent updating and drawing) and call this cycle again
 * 
 * @param updateStep - update the world state by one step
 * @param drawStep - draw the world
 * @param sleepDuration - how many millis do we sleep before doing this again (sleeps less time to account for time spent updating/drawing)
 */
function framerateGameLoop(updateStep, drawStep, sleepDuration) {
	// what time did we start the step
	var startTime = new Date().getTime();
	
	// perform the update/draw
	updateStep();
	drawStep();
	
	// what time did we end the tep
	var endTime = new Date().getTime();
	
	// how much time do we need to sleep
	var sleep = sleepDuration - (endTime-startTime);
	if(sleep < 0)
		sleep = 0;
	
	// run this method again after we sleep for a bit
	setTimeout(function(){framerateGameLoop(updateStep, drawStep, sleepDuration)}, sleep);
}
