import Ember from 'ember'
import subrouteNameHandlerMixin from 'ember-frost-object-details/mixins/subroute-name-handler-mixin'

export default Ember.Route.extend(subrouteNameHandlerMixin, {

  model: function (params) {
    var userId = params.user_id
    return this.store.findRecord('user', userId)
  }
})
