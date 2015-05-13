Template.AdminLogin.events({
        'click .btn_login': function() {
            var _email = $('.val_email').val();
            var _password = $('.val_pw').val();
            if(_email != "" && _email != null && _password != "" && _password != null) {
                Meteor.loginWithPassword(_email, _password, function(err) {
                    //submit_button.button("reset");
                    if (err) {
                        pageSession.set("errorMessage", err.message);
                        return false;
                    } else {
                        window.location.pathname = "/admin/blog";
                    }
                });
                return false;
            } else {
                window.alert("Missing Somethine! Please fill all column!");
            }
        }
});

Template.AdminLogin.helpers({
    errorMessage: function() {
        return pageSession.get("errorMessage");
    }
});