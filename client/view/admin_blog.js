Template.myBlogAdminTemplate.rendered = function() {
    console.log("!!!!!");
};

Template.myBlogAdminTemplate.events({
    'onCgange .abc': function() {

    }
});

Template.blogAdminEdit.rendered = function() {
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