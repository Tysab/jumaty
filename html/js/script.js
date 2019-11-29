$(document).ready(function () {

    //  Maakte de sidenav kleiner voor mobielen (met een breedte van maximaal 768)
    if ($(window).width() < 768) {
        $("#toggle").trigger("click");
    }

});