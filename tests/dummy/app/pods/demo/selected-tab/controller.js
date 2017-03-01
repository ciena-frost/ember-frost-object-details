import Ember from 'ember'
const {Controller} = Ember

// BEGIN-SNIPPET selected-tab-controller
export default Controller.extend({
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
