/**
 * Created by user on 4/21/2015.
 */
this.App = {};
this.Helpers = {};
Helpers.Veriables = {
    ScrollSpeed: 1000 // Scroll by 1 second
};

Helpers.Video = {
    Load: function() {
        $("header.video").wallpaper({
            source: {
                poster: "/img/bg-mobile-fallback.jpg",
                mp4: "/mp4/camera.mp4"
            }
        });
    }
};

// User for show log while testing
Helpers.Log = {
    active: false,
    Show: function(header, message) {
        if(Helpers.Log.active) {
            console.log("[" + header + "]: " + message);
        }
    }
};

Helpers.ChangeLanguage = function(_language) {
    TAPi18n.setLanguage(_language);
}

Helpers.helloworld = function() {
    return "Hello World";
};

_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
});

