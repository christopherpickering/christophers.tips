(function($){
    $(document).ready(function(e) {
        
        // find links in page that we want to search     
        var a = 0
        var array = []
        var links = $('.chapter a')
        $(links).each(function( index ) {
            var url = $(this).attr('href')
            $.get(
                $(this).attr('href'),
                function(data){
                    array.push({'url':url,'data':$(data).find('.page-inner').text().replace(/\s+/g, " ")})
                }
            ).done(function(data){a++; callback(a)})


            });

            function callback(a){
                if(a == links.length){
                    console.log('ready')
                    console.log(array)
                }
            }
    });
})(jQuery);
