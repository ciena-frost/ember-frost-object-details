import Ember from 'ember'

export default Ember.Controller.extend({
  actions: {
    onChange (id, type) {
      console.log(`Tab id (${id}) and type (${type})`)
    }
  }
})
