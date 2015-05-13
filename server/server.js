Meteor.startup(function() {
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

    // Info for Mandrill
    // https://mandrillapp.com/login/?referrer=%2F
    // Email:       davengfortesting@gmail.com
    // Password:    mytestforjob830
	process.env.MAIL_URL = 'smtp://davengfortesting%40meteorize.gmail.com:u3aHyUuelGV6tthci9P0dQ@smtp.mandrillapp.com:587';


	// Set Roles for admin
	var user_dave = Meteor.users.findOne({username: 'robmagario'});
	if(user_dave != null) {
		Roles.addUsersToRoles(user_dave._id, ['admin']);
		Roles.addUsersToRoles(user_dave._id, ['blogAdmin']);
	}var user_dave = Meteor.users.findOne({username: 'abbeythorley'});
	if(user_dave != null) {
		Roles.addUsersToRoles(user_dave._id, ['admin']);
		Roles.addUsersToRoles(user_dave._id, ['blogAdmin']);
	}var user_dave = Meteor.users.findOne({username: 'Dranithix'});
	if(user_dave != null) {
		Roles.addUsersToRoles(user_dave._id, ['admin']);
		Roles.addUsersToRoles(user_dave._id, ['blogAdmin']);
	}
	var user_dave = Meteor.users.findOne({username: 'DaveNg'});
	if(user_dave != null) {
		Roles.addUsersToRoles(user_dave._id, ['admin']);
		Roles.addUsersToRoles(user_dave._id, ['blogAdmin']);
	}
});

Meteor.methods({
	sendEmail: function (to, from, subject, text) {
		check([to, from, subject, text], [String]);

		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();

		Email.send({
			to: 	 to,
			from: 	 from,
			subject: subject,
			text: 	 text
		});
	}
});