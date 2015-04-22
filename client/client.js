/**
 * Created by user on 4/21/2015.
 */
this.App = {};
this.Helpers = {};

Helpers.helloworld = function() {
    return "Hello World";
};

_.each(Helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
});