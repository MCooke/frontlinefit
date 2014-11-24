var sitePrefix = "/frontlinefit"

$( '.do-submitBioSig' ).on( 'click', function( event ) {

	event.preventDefault();

	console.log('sup');

	$.getJSON( sitePrefix + "/js/biosig.json?" + Date.now(), function( data ) {
		var bioSigData = data;
		var $checkedRadios = $( 'input:checked' );

		//console.log( $checkedRadios );

		var loopedValues = {};

		$checkedRadios.each( function() {
			var $this = $( this );
			loopedValues[ $this.val() ] = $this.val();

			//console.log( bioSigData.content[ bioSigData.answers[ $this.val() ][ $this.attr( 'name' ) ] ] );

			// If we have to have any pairs, make sure we've not had a pair previously
			console.log( bioSigData.answers[ $this.val() ] );

			//console.log( loopedValues );

		} );


	} );

} );