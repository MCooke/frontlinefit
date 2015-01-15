// When somebody submits, update the hash
$( '.do-submitBioSig' ).on( 'click', function( event ) {
	event.preventDefault();
	getContent();
} );

$( '.do-sendForm' ).on( 'click', function( event ) {
	event.preventDefault();
	sendEmail();
} );

var getContent = function( ) {

	var givenAnswers = $( 'input' ).val().replace(new RegExp("=", "g"), '').split( '&' );

	// We are going to fill these in later
	// Push the answers in, so we don't duplicate & to print at the end
	var answers = [];
	// Push the previous questions in, so that we check for pairs
	var previousQuestions = {};

	// Loop over all of our radio buttons
	for (var i = 0; i < givenAnswers.length; i++) {
		// We use this a lot, store it till later
		var $this = givenAnswers[i];
		// Save the question so we can check for pairs
		previousQuestions[ $this ] = true;

		// If the current question has some content attached
		if ( window.bioSigData.answers[ $this ].content ) {
			var possibleAnswer = window.bioSigData.content[ window.bioSigData.answers[ $this ].content ] + '<br>';
			// And we haven't said it already
			if ( answers.indexOf( possibleAnswer ) == -1 && possibleAnswer != "" ) {
				// Save it to the answers
				answers.push( possibleAnswer );
			}
		}

		// If we have pairs on the current answer
		if ( window.bioSigData.answers[ $this ].pairs ) {
			var groupedPairs = window.bioSigData.answers[ $this ].pairs
			// Loop over all pair groups possible
			for ( var pairs in groupedPairs ) {
				// loop over the inner pairs
				$.each( window.bioSigData.answers[ $this ].pairs[ pairs ], function( key, value ) {
					// Get the content for this pair
					var pairedContent = window.bioSigData.content[ pairs ] + '<br>';

					// Make sure we've had the other pair before
					// And that we've not put this content in already
					if ( previousQuestions[value] && answers.indexOf( pairedContent ) == -1 && possibleAnswer != "" ) {
						// Save it to the answers
						answers.push( pairedContent );
					}
				} );
			}
		};

	}

	$( 'form' ).hide();
	$( '#bioSigOutput' ).html( answers );

}

function sendEmail(){
	var submitToJames = document.createElement('a');
	var name = $( 'input[name="name"]' ).val();
	submitToJames.target = '_blank';
	submitToJames.href = 'mailto:info@frontlinefit.com?subject=Biosig results from ' + name + '&body=My results where ' + $( 'form' ).serialize();
	submitToJames.click();
};