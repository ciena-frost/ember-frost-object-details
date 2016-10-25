import Ember from 'ember'

// BEGIN-SNIPPET query-params-controller
export default Ember.Controller.extend({
  queryParams: ['selectedTabId', 'selectedTabType'],
  selectedTabId: 'profile',
  selectedTabType: 'tab',
  actions: {
    onChange (id, type) {
      this.set('selectedTabId', id)
      this.set('selectedTabType', type)
    }
  }
})
// END-SNIPPET
