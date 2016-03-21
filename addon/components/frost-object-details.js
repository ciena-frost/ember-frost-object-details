import Ember from 'ember'
import layout from '../templates/components/frost-object-details'

export default Ember.Component.extend({

  _routing: Ember.inject.service('-routing'),


  layout: layout,
  classNames: ['frost-object-details'],

//  persistedRouteName: Ember.computed('_routing.currentRouteName', function () {
//    debugger;
//
//
//  return this.get('actionLink.route') === this.get('_routing.currentRouteName')
//})

  persistedRouteName: null,

  routeChangeObserver: Ember.observer('_routing.currentRouteName', function() {
    let currentRouteName = this.get('_routing.currentRouteName')

    debugger;
    if(currentRouteName.startsWith(this.get('parentRoute') + '.primary')) {
      console.log('succussse ')
    }else {
      console.log('failed')
    }
  })



})
