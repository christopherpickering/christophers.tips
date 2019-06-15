(function($){
    $(document).ready(function(e) {
        var $page_body = $('.page-inner').html();              
        var a = 0;
        var array = [];
        var links = $('.chapter a');

        $(links).each(function( index ) {
            var url = $(this).attr('href');
            var title = $(this).text().trim();
            $.get(
                $(this).attr('href'),
                function(data){
                    array.push({'title':title,'url':url,'data':$(data).find('.page-inner').text().replace(/\s+/g, " ")})
                }
            ).done(function(data){a++; callback(a)});

        });

        // place holder in case we ever want to do something with pages after they are loaded.
        function callback(a){if(a == links.length){}};

        $('#search').keyup(function(){
            
            if($(this).val() === '') {
               $('.page-inner').html($page_body);
                return;
            };               
            
            var searchField = "(\\w+\\W+?|\\W+?\\w+?){0,5}"+$(this).val()+"(\\w+?\\W+?|\\W+?\\w+?){0,5}";
            var searchValue = $(this).val();

            var regex = new RegExp(searchField, "gmi");
            var regexTwo = new RegExp(searchValue,'i');

            var output = '<section class="normal markdown-section">';
            output += '<h1>Search Results</h1>';
            var count = 1;

            $.each(array, function(key, val){
                var search = val.data.match(regex);
                if ((search)) {    
                    output += '<h2><a href="' + val.url + '">' + val.title + '</a></h2><ul>';   
                    for (var i=0; i < search.length; i++) {
                        output += '<li>' + search[i].replace(regexTwo, '<strong>'+searchValue+'</strong>') + '</li>';
                    }
                    output += '</ul>';
                    count++;
                }
               
            });
             if (count == 1){

                    output += '<h2>Nothing found.</h2>'
                    
                } ;
            output += '</section>';
            $('.page-inner').html(output);
        });
    });
})(jQuery);
