import Ember from 'ember'
import layout from '../templates/components/frost-object-details'

export default Ember.Component.extend({

  routing: Ember.inject.service('-routing'),

  layout: layout,
  classNames: ['frost-object-details'],



  actionLinkSelected: Ember.computed('actionLinks', 'routing.currentRouteName', function () {
    let actionLinks = this.get('actionLinks')
    return actionLinks.filter((route) => {
      return route.route === this.get('routing.currentRouteName')
    }).objectAt(0)
  })


})
