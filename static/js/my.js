(function($) {


    $('.js-toolbar-action').on('click', function(){
        var $img = $('.book');
        if (!$img.hasClass('with-summary')) {
            $img.addClass('with-summary');
        } else {
            $img.removeClass('with-summary');
        }
    });

});
