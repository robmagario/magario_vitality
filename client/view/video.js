/**
 * Created by user on 4/22/2015.
 */
var MyBrowser = "Web";

Template.Video.rendered = function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        MyBrowser = "Mobile";
    } else {
        MyBrowser = "Web";
    }
    //window.alert('You are using ' + MyBrowser);
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

    /*// Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })*/

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

    /*// Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })*/

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
    var path_check = window.location.pathname;
    if(window.location.pathname == "/ja-JP") {
        TAPi18n.setLanguage('jp');
    } else if(window.location.pathname == "/zh-CN") {
        TAPi18n.setLanguage('zh');
    } else if(window.location.pathname == "/zh-HK") {
        TAPi18n.setLanguage('hk');
    } else if(window.location.pathname == "/pt-BR") {
        TAPi18n.setLanguage('br');
    } else {
        TAPi18n.setLanguage('en');
    }

    window.setTimeout(mytesting, 500);
};

function mytesting() {
    if(window.pageYOffset < (window.innerHeight-150)) {
        $('.navbar').addClass('navbar-expanded');
    } else {
        $('.navbar').removeClass('navbar-expanded');
    }
    window.setTimeout(mytesting, 500);
}

+function ($) {
    'use strict';
    // Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })
}(jQuery);

function ChangeLanguage(_language) {
    if(_language == 'en') {
        //location.href('/');
        window.location.pathname = '';
    } else {
        //location.href(_language);
        window.location.pathname = _language;
    }
    //TAPi18n.setLanguage(_language);
}

Template.Video.events({
    'click .contact_send_button': function() {
        console.log("Start");
        var _name = $('.contact_send_name').val();
        var _email = $('.contact_send_email').val();
        var _phone = $('.contact_send_phone').val();
        var _message = $('.contact_send_message').val();
        if(_name != "" && _email != "" && _phone != "" && _message != "") {
            console.log("To Send");
            var _body =
                "Name:\t" + _name + "\n" +
                "Email:\t" + _email + "\n" +
                "Phone:\t" + _phone + "\n\n" +
                "Message:\n" + _message;
            var _subject = "Contact Form from magario.com by " + _name;
            Meteor.call(
                'sendEmail',
                'robson@magario.com',       // to
                _email,                     // from
                _subject,                   // subject
                _body                       // message
            );
            $('.contact_send_name').val("");
            $('.contact_send_email').val("");
            $('.contact_send_phone').val("");
            $('.contact_send_message').val("");
            var _success = "Contact Form is Successfully to Send. \nThank you for your contact.";
            window.alert(_success);
        } else {
            console.log("To Error");
            var _error = "";
            if(_name == "") {_error += "Name is missing\n";}
            if(_email == "") {_error += "Email is missing\n";}
            if(_phone == "") {_error += "Phone is missing\n";}
            if(_message == "") {_error += "Message is missing\n";}
            window.alert(_error);
        }
    },

    'click a.page-scroll': function(event) {
        Helpers.Log.Show("Click", "a.page-scroll");
        var _tag = event.target.hash.split('#');
        if(_tag.length > 1) {
            var tagname = _tag[1].toLowerCase();
            var targetY = 0;
            if (tagname != null && tagname != "") {
                targetY = $('#' + tagname).offset().top;
            } else if (event.target.localName == "i") {
                targetY = $('#about').offset().top;
            }
            $('body').animate({scrollTop: targetY}, Helpers.Veriables.ScrollSpeed);
        }
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
});

Template.Video.helpers({

});