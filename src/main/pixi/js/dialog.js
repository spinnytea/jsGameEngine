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
    var panel = $("<div class='panel panel-default'>");
	panel.append($("<div class='panel-heading'>").text(response));
    
    var response_body = $("<div class='panel-body btn-group-vertical'>");
	for(i in choices)
		response_body.append(createChoiceButton(choices[i]));
    panel.append(response_body)
    
    $('#response_div').empty().append(panel);
}

function createChoiceButton(choice) {
	return $('<button class="btn btn-primary"/>').text(choice.text).click(function() {
		$('#response_div .panel-heading').text(choice.response);
        $('#response_div .panel-body').remove();
		choice.action();
	});
}
