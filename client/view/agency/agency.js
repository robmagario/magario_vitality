/**
 * Created by user on 4/22/2015.
 */
Template.Agency.rendered = function () {
    /*TEMPLATE_RENDERED_CODE*/
};

Template.Agency.events({
    'click a.page-scroll': function (event) {
        Helpers.Log.Show("Click", "a.page-scroll");
        var tagname = event.target.innerText.toLowerCase();
        var targetY = 0;
        if (tagname != null && tagname != "") {
            targetY = $('#' + tagname).offset().top;
        } else if (event.target.localName == "i") {
            targetY = $('#about').offset().top;
        }
        $('body').animate({scrollTop: targetY}, Helpers.Veriables.ScrollSpeed);
    },

    'mouseenter header': function () {
        $('.navbar-inverse').addClass('navbar-expanded');
    },
    'mouseleave header': function () {
        $('.navbar-inverse').removeClass('navbar-expanded');
    },
    'mouseenter #about': function () {
        $('.focus-about').addClass('active');
    },
    'mouseleave #about': function () {
        $('.focus-about').removeClass('active');
    },
    'mouseenter #process': function () {
        $('.focus-process').addClass('active');
    },
    'mouseleave #process': function () {
        $('.focus-process').removeClass('active');
    },
    'mouseenter #work': function () {
        $('.focus-work').addClass('active');
    },
    'mouseleave #work': function () {
        $('.focus-work').removeClass('active');
    },
    'mouseenter #pricing': function () {
        $('.focus-pricing').addClass('active');
    },
    'mouseleave #pricing': function () {
        $('.focus-pricing').removeClass('active');
    },
    'mouseenter #contact': function () {
        $('.focus-contact').addClass('active');
    },
    'mouseleave #contact': function () {
        $('.focus-contact').removeClass('active');
    }
});

Template.Agency.helpers({});