if (Meteor.isClient) {
    var publicRoutes = ["index"];
    /*
    Router.route('/index', function() { this.render('Index'); });
    Router.route('/agency', function() { this.render('Agency'); });
    Router.route('/creative', function() { this.render('Creative'); });
    Router.route('/culinary', function() { this.render('Culinary'); });
    Router.route('/fashion', function() { this.render('Fashion'); });
    Router.route('/legal', function() { this.render('Legal'); });

    Router.onBeforeAction(function() {
        if (! Meteor.userId()) {
            console.log(this.path);
            this.render('Index');
        } else {
            this.next();
        }
    });*/
    Router.route("video", {path: "/", controller: "VideoController"});
    Router.route("agency", {path: "/agency", controller: "AgencyController"});
    Router.route("creative", {path: "/creative", controller: "CreativeController"});
    Router.route("culinary", {path: "/culinary", controller: "CulinaryController"});
    Router.route("index", {path: "/index", controller: "IndexController"});
    Router.route("fashion", {path: "/fashion", controller: "FashionController"});
    Router.route("legal", {path: "/legal", controller: "LegalController"});
}

Router.map(function () {
    //this.route("index", {path: "/", controller: "IndexController"});
});

