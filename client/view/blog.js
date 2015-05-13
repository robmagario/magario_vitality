/**
 * Created by Dave on 5/13/2015.
 */

Template.Blog.rendered = function() {
    api = new imgur.Api("secretkey");
    api.getImageInformation('imagehash', onInfo);
    api.uploadUrl("http://foo.bar/funny.gif", onUpload);
}

Template.Blog.events({

});

Template.Video.helpers({

});