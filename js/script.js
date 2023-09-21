;(function($){
    'use strict';

    // preoader
    $(window).on('load', function() { // makes sure the whole site is loaded 
        $('#status').fadeOut(); // will first fade out the loading animation 
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
        $('body').delay(350).css({'overflow':'visible'});
    })
    
    //owl-carousel
    var $loop = $('.loop')
    if($loop.length > 0){
        $loop.owlCarousel({
        center: true,
        loop:true,
        autoplay:true,
        autoplayTimeout:2000,
        margin:5,
        responsive:{
            300:{
                items:2
            },
            768:{
                items:3
            },
            1170:{
                items:5
            }
        }
    });
    }

    //owl-carousel testimonial
    window.flAfterEventFunction = () => {
        var $loopTesti = $('.loop-testi')
        if ($loopTesti.length > 0) {
            $loopTesti.owlCarousel({
                center: true,
                loop: true,
                smartSpeed: 600,
                responsive: {
                    300: {
                        items: 1
                    },
                    1170: {
                        items: 3
                    }
                }
            });
        }
    };

    // swiper
    var $swiper = $('.swiper-container');
    if($swiper.length > 0){
        var swiper = new Swiper($swiper, {
            effect: 'coverflow',
            loop: true,
            centeredSlides: true,
            autoplay: 2000,
            speed: 2000,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 0,
                stretch: 80,
                depth: 200,
                modifier: 1,
                slideShadows : false,
            }
        });
    }

    //wow
    new WOW().init();

    function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);

    // Google map initialize
      var $mapholder = $('.map-holder');
      if ($mapholder.length > 0) {
        var map = new GMaps({
          div: '#gmap',
          lat: -12.043333,
          lng: -77.028333
        });

        $mapholder.on('click', function () {
          $(this).children().css("pointer-events", "auto");
        });

        $mapholder.on('mouseleave', function() {
          $(this).children().css("pointer-events", "none");
        });
    }

    //contact form
    var $contactForm = $('#contact-form');
    $contactForm.validator();


    // when the form is submitted
    $contactForm.on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $contactForm.find('.messages').html(alertBox);
                        // empty the form
                        $contactForm[0].reset();
                    }
                }
            });
            return false;
        }
    })



})(jQuery); 

(function () {
       $(document).on("scroll", onScroll);
 
        $('.menu li a[href^="#"], .demo a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");
 
            $('a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');
 
            var target = this.hash;
            $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top+2
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
 
    function onScroll(event){
        var scrollPosition = $(document).scrollTop();
        $('.menu a').each(function () {
            var currentLink = $(this);
            var refElement = $(currentLink.attr("href"));
            if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
                $('.menu li a').removeClass("active");
                currentLink.addClass("active");
            }
            else{
                currentLink.removeClass("active");
            }
        });
    } 
}());