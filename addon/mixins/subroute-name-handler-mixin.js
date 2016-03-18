import Ember from 'ember'

export default Ember.Mixin.create({
  /**
   Used to persist the route name for primary view route(detail, maps) which has been recently visited.
   This is setting the `persistedRouteName` in the controller which will be passed to `ember-object-detail`
   component as attrs.

   @param {String} routeName - the routeName to be persisted
   */
  actions: {
    routeNameHandler (routeName) {
      this.get('controller').set('persistedRouteName', routeName)
    }
  }
})
