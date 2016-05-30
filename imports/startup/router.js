import App from './App';
import Main from './Main';

FlowRouter.route('/', {
  action() {
    ReactLayout.render(App, {
      children: <Main />
    });
  }
});
