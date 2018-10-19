(function($) {
console.log('started script')
$('body').on('click', '.js-toolbar-action', function(event) {
    event.preventDefault();
    console.log('clicked')
        var $img = $('.book');
        if (!$img.hasClass('with-summary')) {
            $img.addClass('with-summary');
        } else {
            $img.removeClass('with-summary');
        }
    });

});
