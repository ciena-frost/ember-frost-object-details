import Ember from 'ember'

export default Ember.Route.extend({
  model: function (params) {
    var userId = params.user_id
    return this.store.findRecord('user', userId)
  }
})
