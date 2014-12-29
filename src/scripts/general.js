var bioSig = function(){

	if( window.location.hash ) {
	  getContent();
	}

	window.location.hash.on( 'change', function(event) {
		getContent( window.location.hash );
	} );

}

var getContent = function(){
	console.log( 'content' );
}