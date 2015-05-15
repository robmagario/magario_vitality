/**
 * Created by Dave on 5/13/2015.
 */

Template.myBlogIndexTemplate.rendered = function() {
    if(Meteor.user() != null) {
        $('.admin_logout').show();
    } else {
        $('.admin_logout').hide();
    }

    api = new imgur.Api("secretkey");
    api.getImageInformation('imagehash', onInfo);
    api.uploadUrl("http://foo.bar/funny.gif", onUpload);
}

Template.myBlogIndexTemplate.events({
    // Admin Logout
    'click .admin_logout': function() {
        Meteor.logout();
        window.location.reload();
    }
});

Template.myBlogIndexTemplate.helpers({
    UploadCallback: function() {
        return {
            finished: function(index, fileInfo, context) {
                console.log(index);
                console.log(fileInfo);
                console.log(context);
            }
        }
    }
});

Template.myShowBlogTemplate.rendered = function() {
    $('#meteor-blog').css({'padding-top':'40px'});
};