$(document).ready(function(){
    
    search_text_input();
    
});



/**
    * SEARCH TEXT INPUT
    * On focus gets rid of "value" attr, and replaces if off focus
    * ----
*/
function search_text_input() {
    // set the default text
    $('input.keywords').focus(function(){
	    var value = this.value;
		var title = this.title;
		if (value == title) {
			$(this).val("");
		};
	});

	// if it's blank then reset back the title attribute
	$('input.keywords').blur(function(){
		if(!$(this).val().length){
		    $(this).val(this.title);
		}
	});
}