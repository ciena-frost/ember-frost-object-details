import Ember from 'ember'
import layout from '../templates/components/frost-object-details'

export default Ember.Component.extend({

  routing: Ember.inject.service('-routing'),

  layout: layout,
  classNames: ['frost-object-details'],

  subRouteSelected: Ember.computed('subRoutes', 'routing.currentRouteName', function() {
    let subRoutes = this.get('subRoutes')
    let result = _.find(subRoutes, (route) => {
        return route.route === this.get('routing.currentRouteName')
    })

    if(result === undefined) {

    }else {
      return result
    }

    //return subRoutes.filter((route) => {
    //  return route.route === this.get('routing.currentRouteName')
    //}).objectAt(0)
  }),

  actionLinkSelected: Ember.computed('actionLinks', 'routing.currentRouteName', function () {
    let actionLinks = this.get('actionLinks')
    return actionLinks.filter((route) => {
      return route.route === this.get('routing.currentRouteName')
    }).objectAt(0)
  })





  //mappedActionLinks: Ember.computed('actionLinks.[]', 'actionLinkSelected', function () {
  //
  //  let actionLinks = this.get('actionLinks')
  //  let isSelected = this.get('actionLinkSelected')
  //  return actionLinks.map( (entry) => {
  //    if (entry.name === isSelected) {
  //     // entry.isSelected = true
  //    } else {
  //     // entry.isSelected = false
  //    }
  //    return entry
  //  })
  //})

})
