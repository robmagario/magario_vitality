Template.myBlogShowBody.rendered = function () {
    var SideComments, avatar, chosen_name, commentUser, existingComments, possible_names, post, ref, ref1, ref2, ref3, ref4, settings, sideComments, the_user;
    Meteor.call('isBlogAuthorized', this.id, (function (_this) {
        return function (err, authorized) {
            if (authorized) {
                return Session.set('canEditPost', authorized);
            }
        };
    })(this));
    settings = Blog.settings.comments;
    if (settings.useSideComments) {
        SideComments = require('side-comments');
        if (settings.allowAnonymous && !Meteor.user()) {
            commentUser = {
                name: 'Anonymous',
                avatarUrl: settings.defaultImg,
                id: 0
            };
        } else if (Meteor.user()) {
            the_user = Meteor.user();
            possible_names = [the_user.username, (ref = the_user.services) != null ? (ref1 = ref.google) != null ? ref1.name : void 0 : void 0, (ref2 = the_user.profile) != null ? ref2.name : void 0, (ref3 = the_user.emails) != null ? ref3[0].address : void 0];
            chosen_name = null;
            possible_names.every(function (name) {
                if (name != null) {
                    if (typeof name === "string" && name.length > 0) {
                        chosen_name = name;
                        return false;
                    }
                } else {
                    return true;
                }
            });
            if ((ref4 = Meteor.user().profile) != null ? ref4[settings.userImg] : void 0) {
                avatar = Meteor.user().profile[settings.userImg];
            } else {
                avatar = settings.defaultImg;
            }
            commentUser = {
                name: chosen_name,
                avatarUrl: avatar,
                id: Meteor.userId()
            };
        } else {
            commentUser = {
                name: 'Login to Comment',
                avatarUrl: settings.defaultImg,
                id: 0
            };
        }
        existingComments = [];
        Comment.where({
            slug: Session.get('slug')
        }).forEach(function (comment) {
            var sec;
            comment.comment.id = comment._id;
            sec = _(existingComments).findWhere({
                sectionId: comment.sectionId.toString()
            });
            if (sec) {
                return sec.comments.push(comment.comment);
            } else {
                return existingComments.push({
                    sectionId: comment.sectionId.toString(),
                    comments: [comment.comment]
                });
            }
        });
        sideComments = new SideComments('#commentable-area', commentUser, existingComments);
        sideComments.on('commentPosted', function (comment) {
            var attrs, commentId;
            if (settings.allowAnonymous || Meteor.user()) {
                attrs = {
                    slug: Session.get('slug'),
                    sectionId: comment.sectionId,
                    comment: {
                        authorAvatarUrl: comment.authorAvatarUrl,
                        authorName: comment.authorName,
                        authorId: comment.authorId,
                        comment: comment.comment
                    }
                };
                commentId = Comment.create(attrs);
                comment.id = commentId;
                return sideComments.insertComment(comment);
            } else {
                comment.id = -1;
                return sideComments.insertComment({
                    sectionId: comment.sectionId,
                    authorName: comment.authorName,
                    comment: 'Please login to post comments'
                });
            }
        });
        sideComments.on('commentDeleted', function (comment) {
            if (Meteor.user()) {
                Comment.destroyAll(comment.id);
                return sideComments.removeComment(comment.sectionId, comment.id);
            }
        });
    }
    document.title = "" + this.data.title;
    if (Blog.settings.title) {
        document.title += " | " + Blog.settings.title;
    }
    if (!this.data.published) {
        $('<meta>', {
            name: 'robots',
            content: 'noindex,nofollow'
        }).appendTo('head');
    }
    if (Session.get("postHasFeaturedImage")) {
        post = Post.first({
            slug: Router.current().params.slug
        });
        $(window).resize(function () {
            return Session.set("fullWidthFeaturedImage", $(window).width() < post.featuredImageWidth);
        });
        return $(window).trigger("resize");
    }
};

Template.myBlogShowBody.events({
    'click a#edit-post': function (event, template) {
        var postId;
        event.preventDefault();
        postId = Post.first({
            slug: Router.current().params.slug
        })._id;
        return Router.go('blogAdminEdit', {
            id: postId
        });
    }
});

Template.myBlogShowBody.helpers({
    isAdmin: function () {
        return Session.get("canEditPost");
    }
});

// ---
// generated by coffee-script 1.9.2