$('#page-home').live('pageinit', function(event){
	
	// show first page as active page
    $('.api-div').hide();
    $('.api-div#api-intro').show();
    
    // home button from header
    $('#intro').click(function() {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);            
    });
    
    
    $('a').click(function(event) {
        event.preventDefault();

        // daca linkul nu este o actiune catre o pagina (id='click-<pagina>') atunci exit
        var attrId = $(this).attr('id');
        if (attrId.indexOf("click") !== 0) {
            return;
        }
        
        // acunde toate paginile, mai putin pagina cu id='api-<pagina>'
        var api = '#api' + attrId.substring(attrId.indexOf('-'));
        $('.api-div').hide();
        $(api).show();
    });
    
});
