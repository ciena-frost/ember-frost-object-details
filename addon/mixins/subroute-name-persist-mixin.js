import Ember from 'ember'

export default Ember.Mixin.create({

  /**
   Used to catch the route name for primary view route(detail, maps) which has been recently visited.
   */
  actions: {
    didTransition: function () {
      this.send('routeNameHandler', this.get('routeName'))
    }
  }

})
