if (Meteor.isClient) {
  Meteor.subscribe("user_data");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
      for(var variableName in Meteor.settings.env) {
        process.env[variableName] = Meteor.settings.env[variableName];
      }
    }

    Meteor.publish("user_data", function () {
      return Meteor.users.find({});
    });
  });
}