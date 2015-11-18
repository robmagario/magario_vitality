/**
 * Created by user on 4/21/2015.
 */
this.App = {};
this.Helpers = {};
Helpers.Veriables = {
    ScrollSpeed: 1000 // Scroll by 1 second
};

Helpers.Video = {
    Load: function () {
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
    Show: function (header, message) {
        if (Helpers.Log.active) {
            console.log("[" + header + "]: " + message);
        }
    }
};

Helpers.ChangeLanguage = function (_language) {
    if (_language == 'en') {
        //location.href('/');
        window.location.pathname = '';
    } else {
        //location.href(_language);
        window.location.pathname = _language;
    }
    // TAPi18n.setLanguage(_language);
}

Helpers.ChangeNavbarBackground = function () {
    console.log(window.pageYOffset);
}

Helpers.UploadImage = function (_image) {
    var _api = new imgur.Api("34ca6c098f1fe8ea400fea3a8b987ef6a220bd03");
    _api.uploadUrl(_image, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            console.log("image uploaded. ID " + response.get('id'));
        }
    });
}

_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
});

