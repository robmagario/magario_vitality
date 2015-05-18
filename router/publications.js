/**
 * Created by Kenta Iwasaki on 4/2/2015.
 */

if (Meteor.isClient) {
    Meteor.subscribe("user_data");
    Meteor.subscribe("post_data");
    Meteor.subscribe("comment_data");
    Meteor.subscribe("config_data");
    Meteor.subscribe("magario_post_data");
    Meteor.subscribe("tag_data");


    Blog.config({
        comments: {
            disqusShortname: 'myshortname',
            useSideComments: false,
            allowAnonymous: false
        },
        blogAdminTemplate: 'myBlogAdminTemplate',
        blogAdminEditTemplate: 'myBlogAdminEdit',
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
    /*Meteor.publish("comment_data", function () {
        return Blog_comments.find();
    });
    Meteor.publish("config_data", function () {
        return Blog_config.find();
    });
    Meteor.publish("magario_post_data", function () {
        return Blog_posts.find();
    });
    Meteor.publish("tag_data", function () {
        return Blog_tags.find();
    });*/

    Blog.config({
        adminRole: 'blogAdmin',
        authorRole: 'blogAuthor',
        rss: {
            title: 'My blog title',
            description: 'My blog description'
        }
    });
}