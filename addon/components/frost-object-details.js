import Ember from 'ember'
import layout from '../templates/components/frost-object-details'

export default Ember.Component.extend({

  _routing: Ember.inject.service('-routing'),

  layout: layout,
  classNames: ['frost-object-details'],

  init() {
    this._super(...arguments)
    this.get('_routing.currentRouteName')
  },

  //persistedRouteName: Ember.computed('routeChangeObserver', function () {
  //  debugger;
  //    return this.get('routeChangeObserver')
  //  }
  //}),

  routeChangeObserver: Ember.observer('_routing.currentRouteName', function() {
    let currentRouteName = this.get('_routing.currentRouteName')

    if(currentRouteName.startsWith(this.get('parentRoute') + '.views')) {
      console.log('success ')
      this.set('persistedRouteName', currentRouteName)
    }else {
      console.log('failed')
    }
  })




})
