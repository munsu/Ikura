import IkuraApp from './IkuraApp';
import IkuraMain from './IkuraMain';

FlowRouter.route('/', {
  action() {
    ReactLayout.render(IkuraApp, {
      children: <IkuraMain />
    });
  }
});
