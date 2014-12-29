// When somebody submits, update the hash
$( '.do-submitBioSig' ).on( 'click', function( event ) {
	event.preventDefault();
	window.location.hash = $( 'form' ).serialize();
} );

// When the hash gets changed, show some content
// Make sure the hash is in the correct format for use later on
$( window ).on( 'hashchange', function() {
  var formData = window.location.hash.substring(1).replace(new RegExp("=", "g"), '').split( '&' );
  getContent( formData );
} );

var getContent = function( givenAnswers ) {

	console.log( givenAnswers );

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
			var possibleAnswer = window.bioSigData.content[ window.bioSigData.answers[ $this ].content ];
			// And we haven't said it already
			if ( answers.indexOf( possibleAnswer ) == -1 ) {
				// Save it to the answers
				answers.push( possibleAnswer + '<br>' );
			}
		}

		// If we have pairs on the current answer
		if ( window.bioSigData.answers[ $this ].pairs ) {
			console.log( $this + ' has a pair' )
			var groupedPairs = window.bioSigData.answers[ $this ].pairs
			// Loop over all pair groups possible
			for ( var pairs in groupedPairs ) {
				// loop over the inner pairs
				$.each( window.bioSigData.answers[ $this ].pairs[ pairs ], function( key, value ) {
					// Get the content for this pair
					var pairedContent = window.bioSigData.content[ pairs ];

					// Make sure we've had the other pair before
					// And that we've not put this content in already
					if ( previousQuestions[value] && answers.indexOf( pairedContent ) == -1 ) {
						// Save it to the answers
						answers.push( pairedContent );
					}
				} );
			}
		};

	}
	console.log( answers );
}