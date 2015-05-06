Meteor.startup(function() {
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}
	//process.env.MAIL_URL = 'smtp://davengfortesting%40meteorize.gmail.com:u3aHyUuelGV6tthci9P0dQ@smtp.mandrillapp.com:587';

	//i18n.setDefaultLanguage('en');
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