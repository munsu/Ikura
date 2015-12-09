// This file is sent directly to Meteor without going through Webpack
// You can initialize anything you need before your app start here

FlowRouter.wait();

// just to disable account creation from accounts-ui
Accounts.config({
  forbidClientAccountCreation: true
});
