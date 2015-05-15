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
    Router.route("video_jp", {path: "/jp", controller: "VideoController"});
    Router.route("video_zh", {path: "/cn", controller: "VideoController"});
    Router.route("video_hk", {path: "/hk", controller: "VideoController"});
    Router.route("video_br", {path: "/br", controller: "VideoController"});

    Router.route("blog_en", {path: "/en/blog", controller: "BlogController"});
    Router.route("blog_jp", {path: "/jp/blog", controller: "BlogController"});
    Router.route("blog_zh", {path: "/cn/blog", controller: "BlogController"});
    Router.route("blog_hk", {path: "/hk/blog", controller: "BlogController"});
    Router.route("blog_br", {path: "/br/blog", controller: "BlogController"});

    Router.route("admin_image", {path: "/admin/image", controller: "ImageController"});
}

Router.map(function () {
    //this.route("index", {path: "/", controller: "IndexController"});
});