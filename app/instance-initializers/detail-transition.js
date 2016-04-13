//export { default, initialize } from 'ember-frost-object-details/instance-initializers/detail-transition';


export function initialize(appInstance ) {

  debugger;

  const transitionService = appInstance.lookup('service:liquid-fire-transitions');
}

export default {
  name: 'detail-transition',
  initialize: initialize
};
