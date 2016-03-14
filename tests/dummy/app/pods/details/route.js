import Ember from 'ember'

export default Ember.Route.extend({

  model: function (params) {
    Ember.Logger.debug('model hook: ', params)
    this.store.unloadAll('user')
    var userId = params.user_id
    return  this.store.findRecord('user', userId)
  },

  actions: {
    routeHandler(attrs) {
      console.log('This is route handler function')
      console.log(attrs)

      this.controller.set('persistRouteName', attrs)

    }
  }
})
