$(document).bind("mobileinit", function () {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultPageTransition = 'none';
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

$(document).on("pagecreate", function () {
    $(".photopopup").on({
        popupbeforeposition: function () {
            var maxHeight = $(window).height() - 60 + "px";
            $(".photopopup img").css("max-height", maxHeight);
        }
    });
});