import Ember from 'ember'

export default Ember.Route.extend({

  model: function (params) {
    Ember.Logger.debug('model hook: ', params)
    this.store.unloadAll('user')
    var userId = params.user_id
    return this.store.findRecord('user', userId)
  },

  actions: {
    routeHandler (attrs) {
      this.get('controller').set('persistRouteName', attrs)
    }
  }
})
