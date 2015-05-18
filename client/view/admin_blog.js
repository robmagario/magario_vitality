Template.myBlogAdminTemplate.rendered = function() {
    $('.reactive-table').addClass('table-bordered');
};
Template.myBlogAdminTemplate.helpers({
    posts: function() {
        var results = Post.all({sort: {updatedAt: -1}}).toArray();
        /*if(_.size && Session.get('filters')) {
            console.log("123");
            results = _(results).Session.get('filters');
        }*/
        return results;
    },
    table: {
        rowsPerPage: 20,
        showFilter: false,
        showNavigation: 'auto',
        useFontAwesome: true,
        fields: [
            { key: 'title', label: 'Title', tmpl: Template.blogAdminTitleColumn },
            { key: 'userId', label: 'Author', tmpl: Template.blogAdminAuthorColumn },
            { key: 'updatedAt', label: 'Updated At', tmpl: Template.blogAdminUpdatedColumn, sort: 'descending', sortByValue: true },
            { key: 'publishedAt', label: 'Published At', tmpl: Template.blogAdminPublishedColumn, sortByValue: true },
            { key: 'published', label: 'Status', tmpl: Template.blogAdminStatusColumn },
            { key: 'id', label: 'Edit', tmpl: Template.blogAdminEditColumn },
            { key: 'id', label: 'Delete', tmpl: Template.blogAdminDeleteColumn }
        ]
    }
});

Template.myBlogAdminTemplate.events({
    'click .for-new-blog': function(e, tpl) {
        e.preventDefault();

        Router.go('blogAdminEdit', {id:Random.id()});
    },
    'click .for-image': function(e, tpl) {
        e.preventDefault();
        Router.go('/admin/image');
    },
    'change .for-filtering': function(e) {
        e.preventDefault();

        var filters = {};
        if($(e.currentTarget).val() == 'mine') {
            filters.userId = Meteor.userId();
        }
        Session.set('filters', filters);
    },

    // Admin Logout
    'click .for-admin-logout': function() {
        Meteor.logout();
        window.location.reload();
    }
});

var getPost, readImageDimensions, save, setEditMode, substringMatcher;

getPost = function(id) {
    return (Post.first({
            _id: id
        })) || {};
};

readImageDimensions = function(file, cb) {
    var image, reader;
    reader = new FileReader;
    image = new Image;
    reader.readAsDataURL(file);
    return reader.onload = function(_file) {
        image.src = _file.target.result;
        image.onload = function() {
            var h, n, w;
            w = this.width;
            h = this.height;
            n = file.name;
            cb(w, h, n);
        };
        return image.onerror = function() {
            return alert('Invalid file type: ' + file.type);
        };
    };
};

substringMatcher = function(strs) {
    return function(q, cb) {
        var matches, pattern;
        matches = [];
        pattern = new RegExp(q, 'i');
        _.each(strs, function(ele) {
            if (pattern.test(ele)) {
                return matches.push({
                    val: ele
                });
            }
        });
        return cb(matches);
    };
};

setEditMode = function(tpl, mode) {
    tpl.$('.editable').toggle();
    tpl.$('.html-editor').toggle();
    tpl.$('.edit-mode a').removeClass('selected');
    return tpl.$("." + mode + "-toggle").addClass('selected');
};

save = function(tpl, cb) {
    var $editable, $form, attrs, body, description, editor, i, post, slug;
    $form = tpl.$('form');
    $editable = $('.editable', $form);
    editor = BlogEditor.make(tpl);
    $editable.find('p[data-section-id]').each(function() {
        var sec_id;
        sec_id = $(this).attr('data-section-id');
        if ($editable.find("p[data-section-id=" + sec_id + "]").length > 1) {
            return $editable.find("p[data-section-id=" + sec_id + "]:gt(0)").removeAttr('data-section-id');
        }
    });
    i = $editable.find('p[data-section-id]').length + 1;
    $editable.find('p:not([data-section-id])').each(function() {
        $(this).addClass('commentable-section').attr('data-section-id', i);
        return i++;
    });
    editor.highlightSyntax();
    if ($editable.is(':visible')) {
        body = editor.contents();
    } else {
        body = $('.html-editor', $form).val().trim();
    }
    if (!body) {
        return cb(null, new Error('Blog body is required'));
    }
    slug = $('[name=slug]', $form).val();
    description = $('[name=description]', $form).val();
    attrs = {
        title: $('[name=title]', $form).val(),
        tags: $('[name=tags]', $form).val(),
        slug: slug,
        description: description,
        body: body,
        updatedAt: new Date()
    };
    if (getPost(Session.get('postId')).id) {
        post = getPost(Session.get('postId')).update(attrs);
        if (post.errors) {
            return cb(null, new Error(_(post.errors[0]).values()[0]));
        }
        return cb(null);
    } else {
        return Meteor.call('doesBlogExist', slug, function(err, exists) {
            if (!exists) {
                attrs.userId = Meteor.userId();
                post = Post.create(attrs);
                if (post.errors) {
                    return cb(null, new Error(_(post.errors[0]).values()[0]));
                }
                return cb(post.id);
            } else {
                return cb(null, new Error('Blog with this slug already exists'));
            }
        });
    }
};

Template.myBlogAdminEdit.rendered = function() {
    var ranOnce;
    ranOnce = false;
    return this.autorun((function(_this) {
        return function() {
            var $tags, post, sub;
            sub = Meteor.subscribe('singlePostById', Session.get('postId'));
            if (sub.ready() && !ranOnce) {
                ranOnce = true;
                post = getPost(Session.get('postId'));
                if (post != null ? post.body : void 0) {
                    _this.$('.editable').html(post.body);
                    _this.$('.html-editor').html(post.body);
                }
                $tags = _this.$('[data-role=tagsinput]');
                $tags.tagsinput({
                    confirmKeys: [13, 44, 9]
                });
                $tags.tagsinput('input').typeahead({
                    highlight: true,
                    hint: false
                }, {
                    name: 'tags',
                    displayKey: 'val',
                    source: substringMatcher(Tag.first().tags)
                }).bind('typeahead:selected', function(obj, datum) {
                    $tags.tagsinput('add', datum.val);
                    return $tags.tagsinput('input').typeahead('val', '');
                });
                return BlogEditor.make(_this);
            }
        };
    })(this));
};

Template.myBlogAdminEdit.helpers({
    post: function() {
        return getPost(Session.get('postId'));
    }
});

Template.myBlogAdminEdit.events({
    'click .visual-toggle': function(e, tpl) {
        if (tpl.$('.editable').is(':visible')) {
            return;
        }
        BlogEditor.make(tpl).highlightSyntax();
        return setEditMode(tpl, 'visual');
    },
    'click .html-toggle': function(e, tpl) {
        var $editable, $html;
        $editable = tpl.$('.editable');
        $html = tpl.$('.html-editor');
        if ($html.is(':visible')) {
            return;
        }
        $html.val(BlogEditor.make(tpl).pretty());
        setEditMode(tpl, 'html');
        return $html.height($editable.height());
    },
    'keyup .html-editor': function(e, tpl) {
        var $editable, $html, ref;
        $editable = tpl.$('.editable');
        $html = tpl.$('.html-editor');
        $editable.html((ref = $html.val()) != null ? ref.trim() : void 0);
        return $html.height($editable.height());
    },
    'input .editable, keydown .editable, keydown .html-editor': _.debounce(function(e, tpl) {
        return save(tpl, function(id, err) {
            var path;
            if (err) {
                return Notifications.error('', err.message);
            }
            if (id) {
                Session.set('postId', id);
                path = Router.path('blogAdminEdit', {
                    id: id
                });
                Iron.Location.go(path, {
                    replaceState: true,
                    skipReactive: true
                });
            }
            return Notifications.success('', 'Saved');
        });
    }, 8000),
    'blur [name=title]': function(e, tpl) {
        var slug, title;
        slug = tpl.$('[name=slug]');
        title = $(e.currentTarget).val();
        return slug.val(Post.slugify(title));
    },
    'change [name=featured-image]': function(e, tpl) {
        var formdata, id, post, ref, ref1, ref2, the_file;
        the_file = $(e.currentTarget)[0].files[0];
        post = getPost(Session.get('postId'));
        readImageDimensions(the_file, function(width, height, name) {
            return post.update({
                featuredImageWidth: width,
                featuredImageHeight: height,
                featuredImageName: name
            });
        });
        if ((ref = Meteor.settings) != null ? (ref1 = ref["public"]) != null ? (ref2 = ref1.blog) != null ? ref2.useS3 : void 0 : void 0 : void 0) {
            return S3Files.insert(the_file, function(err, fileObj) {
                return Tracker.autorun(function(c) {
                    var theFile;
                    theFile = S3Files.find({
                        _id: fileObj._id
                    }).fetch()[0];
                    if (theFile.isUploaded() && (typeof theFile.url === "function" ? theFile.url() : void 0)) {
                        if (post.id != null) {
                            post.update({
                                featuredImage: theFile.url()
                            });
                            return c.stop();
                        }
                    }
                });
            });
        } else {
            id = FilesLocal.insert({
                _id: Random.id(),
                contentType: 'image/jpeg'
            });
            formdata = new FormData();
            formdata.append('file', the_file);
            return $.ajax({
                type: "post",
                url: "/fs/" + id,
                xhr: function() {
                    var xhr;
                    xhr = new XMLHttpRequest();
                    xhr.upload.onprogress = function(data) {};
                    return xhr;
                },
                cache: false,
                contentType: false,
                processData: false,
                data: formdata,
                complete: function(jqxhr) {
                    if (post.id != null) {
                        post.update({
                            featuredImage: "/fs/" + id
                        });
                        return Notifications.success('', 'Featured image saved!');
                    }
                }
            });
        }
    },
    'change [name=background-title]': function(e, tpl) {
        var $checkbox;
        $checkbox = $(e.currentTarget);
        return getPost(Session.get("postId")).update({
            titleBackground: $checkbox.is(':checked')
        });
    },
    'submit form': function(e, tpl) {
        e.preventDefault();
        return save(tpl, function(id, err) {
            if (err) {
                return Notifications.error('', err.message);
            }
            return Router.go('blogAdmin');
        });
    }
});

// ---
// generated by coffee-script 1.9.2

Template.blogAdminEdit.rendered = function() {
    console.log('123');
}
Template.blogAdminEdit.events({
    'blur [name=title]': function() {
        var _title = $('[name=title]').val();
        var _tempSplit = _title.split(" ");
        var _slug = "";
        for(var i=0; i<_tempSplit.length; i++) {
            if(i != 0) {
                _slug += "-";
            }
            _slug += _tempSplit[i];
        }
        $('[name=slug]').val(_slug);
    }
});