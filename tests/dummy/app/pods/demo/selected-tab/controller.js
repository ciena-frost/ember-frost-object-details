import Ember from 'ember'

// BEGIN-SNIPPET selected-tab-controller
export default Ember.Controller.extend({
  queryParams: ['selectedTabName', 'selectedTabType'],
  selectedTabName: 'devices',
  selectedTabType: 'relatedObjectTab'
})
// END-SNIPPET
