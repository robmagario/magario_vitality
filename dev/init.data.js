Meteor.startup(function () {
    if (typeof Meteor.users.findOne({
            username: "robmagario"
        }) === 'undefined') {
        Accounts.createUser({
            username: "robmagario",
            email: "robson@magario.com",
            password: "Blah124@",
            profile: {
                //publicly visible fields like firstname goes here
            }
        });
        var userrob = Meteor.users.findOne({username: 'robmagario'});
        Roles.addUsersToRoles(userrob._id, ['admin']);
    }

    if (typeof Meteor.users.findOne({
            username: "abbeythorley"
        }) === 'undefined') {
        Accounts.createUser({
            username: "abbeythorley",
            email: "abbey.thorley@magario.com",
            password: "fongquiet",
            profile: {
                //publicly visible fields like firstname goes here
            }
        });
        var userabbey = Meteor.users.findOne({username: 'abbeythorley'});
        Roles.addUsersToRoles(userabbey._id, ['admin']);
    }

    if (typeof Meteor.users.findOne({
            username: "Dranithix"
        }) === 'undefined') {
        Accounts.createUser({
            username: "Dranithix",
            email: "dranithix@gmail.com",
            password: "asdfghjkl",
            profile: {
                //publicly visible fields like firstname goes here
            }
        });
        var user_kenta = Meteor.users.findOne({username: 'Dranithix'});
        Roles.addUsersToRoles(user_kenta._id, ['admin']);
    }
});/**
 * Created by abbeythorley on 29/4/15.
 */
