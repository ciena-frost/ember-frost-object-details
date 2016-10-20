import Ember from 'ember'

export default Ember.Controller.extend({
  actions: {
    onChange (id, type) {
      this.set('selectedTabId', id)
      this.set('selectedTabType', type)
    }
  }
})
