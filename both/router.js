FlowRouter.route('/', {
    action: function () {
        BlazeLayout.render('rootLayout', {
            navbar: 'Navbar',
            main: 'Video'

        });
    },

});

FlowRouter.route('/services', {
    action: function () {
        BlazeLayout.render('rootLayout', {
            navbar: 'Navbar',
            main: 'services'

        });
    },

});

FlowRouter.route('/process', {
    action: function () {
        BlazeLayout.render('rootLayout', {
            navbar: 'Navbar',
            main: 'process'

        });
    },

});

FlowRouter.route('/jp', {
    action: function () {
        BlazeLayout.render('rootLayout', {
            navbar: 'Navbar',
            main: 'Video'

        });
    },

});
FlowRouter.route('/cn', {
    action: function () {
        BlazeLayout.render('rootLayout', {
            navbar: 'Navbar',
            main: 'Video'

        });
    },

});
FlowRouter.route('/hk', {
    action: function () {
        BlazeLayout.render('rootLayout', {
            navbar: 'Navbar',
            main: 'Video'

        });
    },

});
FlowRouter.route('/br', {
    action: function () {
        BlazeLayout.render('rootLayout', {
            navbar: 'Navbar',
            main: 'Video'

        });
    },

});

// send 404 if route not defined
if (Meteor.isServer) {
    WebApp.connectHandlers.use("/", function(req, res, next) {
        var isValidRoute = false;
        for(var i=0; i<FlowRouter._routes.length; i++){
            if (req.url == FlowRouter._routes[i].path) {
                isValidRoute = true;
                break;
            }
        }
        if(isValidRoute) {
            next();
        } else {
            res.writeHead(404);
            res.end("Sorry, that page doesn't exist.");
        }
    });
}