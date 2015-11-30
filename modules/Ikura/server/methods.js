Meteor.methods({
  addAgent: function (username) {
    Accounts.createUser({username: username});
  }
});