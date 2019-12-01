$(document).ready(function () {

    $("#toggle").on("click", function () {
        $("#hey_user").toggleClass("hidden");
    });

    //  Maakte de sidenav kleiner voor mobielen (met een breedte van maximaal 768)
    if ($(window).width() < 768) {
        $("#toggle").trigger("click");
    }

    //if ($('#slide-out').hasClass('slim')) {

    new WOW().init();

    // MDB Lightbox Init
    $(function () {
        $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
    });

    // SideNav Button Initialization
    $(".button-collapse").sideNav();
    // SideNav Scrollbar Initialization
    var sideNavScrollbar = document.querySelector('.custom-scrollbar');
    Ps.initialize(sideNavScrollbar);

});