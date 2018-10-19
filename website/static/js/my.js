(function($) {

$('body').on('click', '.js-toolbar-action', function(event) {
    console.log('clicked')
        var $img = $('.book');
        if (!$img.hasClass('with-summary')) {
            $img.addClass('with-summary');
        } else {
            $img.removeClass('with-summary');
        }
    });

});
