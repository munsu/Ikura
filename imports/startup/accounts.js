// Methods for optimistic updates
// import 'Ikura/methods';
// import 'Ikura/helpers';

// import './routes';

import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
