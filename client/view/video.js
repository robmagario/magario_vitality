/**
 * Created by user on 4/22/2015.
 */
Template.Video.rendered = function() {
    /*TEMPLATE_RENDERED_CODE*/
    // Nideo Settings
    $("header.video").wallpaper({
        source: {
            poster: "/img/bg-mobile-fallback.jpg",
            mp4: "/mp4/camera.mp4"
        }
    });

    // Owl Carousel Settings
    $(".about-carousel").owlCarousel({
        items: 3,
        navigation: true,
        pagination: false,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ]
    });

    $(".portfolio-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: false,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        autoHeight: true,
        mouseDrag: false,
        touchDrag: false,
        transitionStyle: "fadeUp"
    });

    $(".testimonials-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: true,
        autoHeight: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        transitionStyle: "backSlide"
    });

    $(".portfolio-gallery").owlCarousel({
        items: 3,
    });

    // Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Magnific Popup jQuery Lightbox Gallery Settings
    $('.gallery-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: 'title'
        }
    });

    // Formstone Wallpaper - Video Background Settings
    $("header.video").wallpaper({
        source: {
            poster: "assets/img/bg-mobile-fallback.jpg",
            mp4: "assets/mp4/camera.mp4"
        }
    });

    // Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Activates floating label headings for the contact form.
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    // Portfolio Filtering Scripts & Hover Effect
    var filterList = {
        init: function() {

            // MixItUp plugin
            // http://mixitup.io
            $('#portfoliolist').mixitup({
                targetSelector: '.portfolio',
                filterSelector: '.filter',
                effects: ['fade'],
                easing: 'snap',
                // call the hover effect
                onMixEnd: filterList.hoverEffect()
            });

        },
        hoverEffect: function() {

            // Simple parallax effect
            $('#portfoliolist .portfolio').hover(
                function() {
                    $(this).find('.caption').stop().animate({
                        bottom: 0
                    }, 200, 'easeOutQuad');
                    $(this).find('img').stop().animate({
                        top: -20
                    }, 300, 'easeOutQuad');
                },
                function() {
                    $(this).find('.caption').stop().animate({
                        bottom: -75
                    }, 200, 'easeInQuad');
                    $(this).find('img').stop().animate({
                        top: 0
                    }, 300, 'easeOutQuad');
                }
            );

        }

    };

    filterList.init();


    TAPi18n.setLanguage('en');
};

function ActiveNavbarHeaderBackground(_index) {
    var _length = $('.navbar-collapse').find('.navbar-nav').find('li').length;
    for(var i=0; i<_length; i++) {
        if(i != _index) {
            $('.navbar-collapse').find('.navbar-nav').find('li').eq(i).removeClass('active');
        } else {
            $('.navbar-collapse').find('.navbar-nav').find('li').eq(_index).addClass('active');
        }
    }
}

function ChangeLanguage(_language) {
    if(_language == 'en') {
        //location.href('/');
    } else {
        //location.href(_language);
    }
    TAPi18n.setLanguage(_language);
}

Template.Video.events({
    'click a.page-scroll': function(event) {
        Helpers.Log.Show("Click", "a.page-scroll");
        var tagname = event.target.innerText.toLowerCase();
        var targetY = 0;
        if(tagname != null && tagname != "") {
            targetY = $('#'+tagname).offset().top;
        } else if(event.target.localName == "i") {
            targetY = $('#about').offset().top;
        }
        $('body').animate({scrollTop:targetY}, Helpers.Veriables.ScrollSpeed);
    },

    'click .click-page-top': function() {
        ActiveNavbarHeaderBackground(0);
    },
    'click .click-about': function() {
        ActiveNavbarHeaderBackground(1);
    },
    'click .click-services': function() {
        ActiveNavbarHeaderBackground(2);
    },
    'click .click-clients': function() {
        ActiveNavbarHeaderBackground(3);
    },
    'click .click-pricing': function() {
        ActiveNavbarHeaderBackground(4);
    },
    'click .click-blog': function() {
    },
    'click .click-contact': function() {
        ActiveNavbarHeaderBackground(6);
    },

    'click .submit-contact-us': function() {
        var _name = $('#contact_name').val();
        var _email = $('#contact_email').val();
        var _phone = $('#contact_phone').val();
        var _message = $('#contact_message').val();
        $('#contact_name').val("");
        $('#contact_email').val("");
        $('#contact_phone').val("");
        $('#contact_message').val("");
    },

    'click .language_en': function() {
        ChangeLanguage('en');
    },
    'click .language_jp': function() {
        ChangeLanguage('jp');
    },
    'click .language_zh': function() {
        ChangeLanguage('zh');
    },
    'click .language_br': function() {
        ChangeLanguage('br');
    }
/*
    'mouseenter header': function() {
        $('.navbar-inverse').addClass('navbar-expanded');
    },
    'mouseleave header': function() {
        $('.navbar-inverse').removeClass('navbar-expanded');
    },
    'mouseenter #about': function() {
        $('.focus-about').addClass('active');
    },
    'mouseleave #about': function() {
        $('.focus-about').removeClass('active');
    },
    'mouseenter #process': function() {
        $('.focus-process').addClass('active');
    },
    'mouseleave #process': function() {
        $('.focus-process').removeClass('active');
    },
    'mouseenter #work': function() {
        $('.focus-work').addClass('active');
    },
    'mouseleave #work': function() {
        $('.focus-work').removeClass('active');
    },
    'mouseenter #pricing': function() {
        $('.focus-pricing').addClass('active');
    },
    'mouseleave #pricing': function() {
        $('.focus-pricing').removeClass('active');
    },
    'mouseenter #contact': function() {
        $('.focus-contact').addClass('active');
    },
    'mouseleave #contact': function() {
        $('.focus-contact').removeClass('active');
    }*/
});

Template.Video.helpers({

});