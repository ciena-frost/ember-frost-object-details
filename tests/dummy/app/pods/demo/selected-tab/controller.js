import Ember from 'ember'

// BEGIN-SNIPPET selected-tab-controller
export default Ember.Controller.extend({
  selectedTabId: 'devices',
  selectedTabType: 'relatedObjectTab',
  actions: {
    onChange (id, type) {
      this.set('selectedTabId', id)
      this.set('selectedTabType', type)
    }
  }
})
// END-SNIPPET
