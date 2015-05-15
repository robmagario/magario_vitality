Images = new Mongo.Collection("blog_images");

if (Meteor.isClient) {
    Template.body.helpers({
        blog_images: function () {
            return Images.find({});
        }
    })
}

Images.allow({
    'insert': function(userId, doc) {
        return Users.isAdmin(userId);
    }, 'update': function(userId, doc) {
        return Users.isAdmin(userId);
    }
});