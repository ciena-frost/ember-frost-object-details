import objectDetailTransitions from 'ember-frost-object-details/transitions'

export function initialize(appInstance ) {

  const transitionService = appInstance.lookup('service:liquid-fire-transitions');
  transitionService.map(objectDetailTransitions);
}

export default {
  name: 'detail-transition',
  initialize: initialize
};
