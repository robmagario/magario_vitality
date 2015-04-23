/**
 * Created by user on 4/21/2015.
 */
this.App = {};
this.Helpers = {};

Helpers.Veriables = {
    ScrollSpeed: 1000 // Scroll by 1 second
};

// User for show log while testing
Helpers.Log = {
    active: true,
    Show: function(header, message) {
        if(Helpers.Log.active) {
            console.log("[" + header + "]: " + message);
        }
    }
};

Helpers.helloworld = function() {
    return "Hello World";
};

_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
});