import Ember from 'ember'

// BEGIN-SNIPPET content-controller
export default Ember.Controller.extend({
  actions: {
    onChange (id, type) {
      this.set('selectedTabId', id)
      this.set('selectedTabType', type)
    }
  }
})
// END-SNIPPET
