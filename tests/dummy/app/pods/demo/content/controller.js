import Ember from 'ember'

// BEGIN-SNIPPET content-controller
export default Ember.Controller.extend({
  actions: {
    onChange (id, type) {
      console.log(`Tab id (${id}) and type (${type})`)
    }
  }
})
// END-SNIPPET
