$(document).ready(function () {

    $("#toggle").on("click", function () {
        $("#hey_user").toggleClass("hidden");
    });

    //  Maakte de sidenav kleiner voor mobielen (met een breedte van maximaal 768)
    if ($(window).width() < 768) {
        $("#toggle").trigger("click");
    }

    //if ($('#slide-out').hasClass('slim')) {

});