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
    Router.route("video_en", {path: "/", controller: "VideoController"});
    Router.route("video_jp", {path: "/ja-JP", controller: "VideoController"});
    Router.route("video_zh", {path: "/zh-CN", controller: "VideoController"});
    Router.route("video_hk", {path: "/zh-HK", controller: "VideoController"});
    Router.route("video_br", {path: "/pt-BR", controller: "VideoController"});
}

Router.map(function () {
    //this.route("index", {path: "/", controller: "IndexController"});
});


// JavaScript
if (Meteor.isServer) {
    Blog.config({
        adminRole: 'blogAdmin',
        authorRole: 'blogAuthor'
    });
}

