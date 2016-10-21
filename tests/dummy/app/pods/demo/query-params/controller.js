import Ember from 'ember'

// BEGIN-SNIPPET query-params-controller
export default Ember.Controller.extend({
  queryParams: ['selectedTabId', 'selectedTabType'],
  selectedTabId: 'profile',
  selectedTabType: 'tab',
  actions: {
    onChange (id, type) {
      console.log(`Tab id (${id}) and type (${type})`)
    }
  }
})
// END-SNIPPET
