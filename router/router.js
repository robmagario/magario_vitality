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
    Router.route("admin_login", {path: "/admin", controller: "LoginController"});

    Router.route("video_en", {path: "/", controller: "VideoController"});
    Router.route("video_jp", {path: "/ja-JP", controller: "VideoController"});
    Router.route("video_zh", {path: "/zh-CN", controller: "VideoController"});
    Router.route("video_hk", {path: "/zh-HK", controller: "VideoController"});
    Router.route("video_br", {path: "/pt-BR", controller: "VideoController"});

    Router.route("blog_en", {path: "/blog", controller: "BlogController"});
    Router.route("blog_jp", {path: "/ja-JP/blog", controller: "BlogController"});
    Router.route("blog_zh", {path: "/zh-CN/blog", controller: "BlogController"});
    Router.route("blog_hk", {path: "/zh-HK/blog", controller: "BlogController"});
    Router.route("blog_br", {path: "/pt-BR/blog", controller: "BlogController"});

}

Router.map(function () {
    //this.route("index", {path: "/", controller: "IndexController"});
});