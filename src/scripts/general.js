var sitePrefix = "/frontlinefit"

$( '.do-submitBioSig' ).on( 'click', function( event ) {

	event.preventDefault();

	var $self = $( this );

	// The button will know what question to get, get it from that.
	$.getJSON( sitePrefix + "/js/biosig/" + $( this ).data( 'questions' ) + ".json?" + Date.now(), function( data ) {
		var bioSigData = data;
		// We have to play with all of the checked inputs
		var $checkedRadios = $( 'input:checked' );

		// We are going to fill these in later
		// Push the answers in, so we don't duplicate & to print at the end
		var answers = [];
		// Push the previous questions in, so that we check for pairs
		var previousQuestions = {};

		// Loop over all of our radio buttons
		$checkedRadios.each( function() {
			// We use this a lot, store it till later
			var $this = $( this );
			// Save the question so we can check for pairs
			previousQuestions[ $this.val() ] = true;

			var standardContent = bioSigData.content[ bioSigData.answers[ $this.val() ][ $this.attr( 'name' ) ] ] + '<br/>'
			// Sometimes, we have multiple contents
			if ( Array.isArray( standardContent ) ) {
				// If we do loop them
				for ( var singularContent in standardContent ) {
					// Make sure we've not said it before
					if ( answers.indexOf( standardContent ) == -1 ) {
						// Save it to the answers
						answers.push( standardContent );
					}
				}
			} else {
				// Otherwise, make sure we've not said it before
				if ( answers.indexOf( standardContent ) == -1 ) {
					// Save it to the answers
					answers.push( standardContent );
				}
			}

			// If we have pairs on the current answer
			if ( bioSigData.answers[ $this.val() ].pairs ) {
				var pairs = bioSigData.answers[ $this.val() ].pairs
				// Loop over all pairs available
				for ( var pair in pairs ) {
					var pairedContent = bioSigData.content[ pairs[pair] ] + '<br/>';
					// Make sure we've had the pair before
					// And that we've not put this content in already
					if ( previousQuestions[pair] && answers.indexOf( pairedContent ) == -1 ) {
						// Save it to the answers
						answers.push( pairedContent );
					}
				}
			};

		} );

		// Append the answers onto the page
		$( '#bioSigOutput' ).append( answers );

		var $tableHeader = $( '#tableHeader' );

		var $table = $( 'table' );

		$table.empty();

		$tableHeader.appendTo( $table );

		for ( var nextQuestion in bioSigData.nextQuestions ) {

			var outterQuestion = $('<tr/>');

			$('<td/>', {
				'html': bioSigData.nextQuestions[nextQuestion]
			} ).appendTo( outterQuestion );
			$( '<td/>', {
				html: $('<input/>', {
					'class': 'radio',
					'type': 'radio',
					'name': 'a',
					'value': nextQuestion
				} )
			} ).appendTo( outterQuestion );

			$( '<td/>', {
				html: $('<input/>', {
					'class': 'radio',
					'type': 'radio',
					'name': 'b',
					'value': nextQuestion
				} )
			} ).appendTo( outterQuestion );

			$( '<td/>', {
				html: $('<input/>', {
					'class': 'radio',
					'type': 'radio',
					'name': 'c',
					'value': nextQuestion
				} )
			} ).appendTo( outterQuestion );

			outterQuestion.appendTo( $table );

		}

		// then something like
		// $( 'table' ).append( data.nextQuestion )

		// Up the questions for the next one
		$self.data( 'questions', $self.data( 'questions' ) + 1 );


	} );

} );