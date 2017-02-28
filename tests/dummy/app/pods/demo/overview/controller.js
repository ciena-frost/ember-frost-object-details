import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  actions: {
    onChange (id, type) {
      this.set('selectedTabId', id)
      this.set('selectedTabType', type)
    }
  }
})
