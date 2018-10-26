 $(document).ready(function(e) {
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


(function($) {
    var $window = $(window),
        $img = $('.book');

    function resize() {
        if ($window.width() > 1200) {
            return $img.addClass('with-summary');
        }

        $img.removeClass('with-summary');
    }

    $window
        .resize(resize)
        .trigger('resize');
})(jQuery);