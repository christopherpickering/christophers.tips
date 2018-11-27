(function($){
    $(document).ready(function(e) {
        $("body").on("click", ".js-toolbar-action", function(event) {
            event.preventDefault();
            var $img = $(".book");
            if (!$img.hasClass("with-summary")) {
                $img.addClass("with-summary");
            } else {
                $img.removeClass("with-summary");
            }
        });
    });

    var $window = $(window),
        $img = $(".book");

    function resize() {
        if ($window.width() > 1200) {
            return $img.addClass("with-summary");
        }

        $img.removeClass("with-summary");
    }

    $window.resize(resize).trigger("resize");

    /*accordion*/

    $(document).ready(function($) {
        $("#accordion")
            .find(".accordion-toggle")
            .click(function() {
                //Expand or collapse this panel
                $(this)
                    .next()
                    .slideToggle("fast");
                //Hide the other panels
                $(".accordion-content")
                    .not($(this).next())
                    .slideUp("fast");
            });
    });
})(jQuery);
