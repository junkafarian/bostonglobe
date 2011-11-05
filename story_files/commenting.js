$(document).ready(function() {

    $(".article-body p").append(' <a href="#comment" class="comment-trigger">+</a>');
    
    $(".comment-trigger").click(function() {
        $(".article").css('float', 'left')
        $("#section-nav").animate({
            opacity: 0,
            width: 0
        }, 500, function() {
            $("#comment-slider").animate({
                margin: "0"
            });
            $("#comment-slider section").each(function () {
                var section = $(this);
                section.animate({
                    top: $(".article-body p:nth-child(" + section.attr('rel') + ")").position().top
                })
            });
        });
    });

    $("#comment-slider section").click(function(event) {
        $("#comment-slider section").removeClass('highlighted');
        $(this).addClass('highlighted');
    });

    
});