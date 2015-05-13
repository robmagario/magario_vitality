/**
 * Created by Kenta Iwasaki on 4/2/2015.
 */

if (Meteor.isClient) {
    Meteor.subscribe("user_data");
    Meteor.subscribe("post_data");


    Blog.config({
        comments: {
            disqusShortname: 'myshortname',
            useSideComments: true,
            allowAnonymous: true
        },
        blogIndexTemplate: 'myBlogIndexTemplate',
        blogShowTemplate: 'myShowBlogTemplate',
        blogNotFoundTemplate: 'myNotFoundTemplate',
        syntaxHighlighting: true,
        syntaxHighlightingTheme: 'atelier-dune.dark',
        excerptFunction: function(body) {
            return body.split('.')[0] + '.';
        },
        pageSize: 5
    });
}

if (Meteor.isServer) {
    Meteor.publish("user_data", function () {
        return Meteor.users.find({});
    });
    Meteor.publish("post_data", function () {
        //return Meteor.posts.find({});
    });

    Blog.config({
        adminRole: 'blogAdmin',
        authorRole: 'blogAuthor',
        rss: {
            title: 'My blog title',
            description: 'My blog description'
        }
    });
}