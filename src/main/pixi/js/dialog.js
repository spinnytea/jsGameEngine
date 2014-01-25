//
// each dialog has a text prompt, and a list of choices, each choice has an action
//

function clearDialog() {
	$('#response_div').empty();
}

/**
 * @param response - the text that will be displayed
 * @param choices[] - { "text", "response", action() }
 */
function dialog(response, choices) {
	$('#response_div').text(response);
	
	for(i in choices)
		$('#response_div').append($('<div/>').append(createChoiceButton(choices[i])));
}

function createChoiceButton(choice) {
	
	return $('<button/>').text(choice.text).click(function() {
		$('#response_div').text(choice.response);
		choice.action();
	});
}
