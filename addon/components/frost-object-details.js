import Ember from 'ember'
import layout from '../templates/components/frost-object-details'
import _ from 'lodash'

export default Ember.Component.extend({

  _routing: Ember.inject.service('-routing'),

  layout: layout,

  classNames: ['frost-object-details'],

  didReceiveAttrs() {
    if(!this.get('viewRouteDirName')) {
      this.set('viewRouteDirName', 'views')
    }
    if(!this.get('relatedRouteDirName')) {
      this.set('relatedRouteDirName', 'related')
    }
  },

  parentRouteName: Ember.computed('_routing.currentRouteName', function () {
    let currentRouteName = this.get('_routing.currentRouteName')
    if (_.includes(currentRouteName, `.${this.get('viewRouteDirName')}.`)) {
      return currentRouteName.substring(0, currentRouteName.indexOf(`.${this.get('viewRouteDirName')}.`))
    } else if (_.includes(currentRouteName, `.${this.get('relatedRouteDirName')}.`)) {
      return currentRouteName.substring(0, currentRouteName.indexOf(`.${this.get('relatedRouteDirName')}.`))
    }
  }),

  routeChangeObserver: Ember.on('init', Ember.observer('_routing.currentRouteName', function () {
    let currentRouteName = this.get('_routing.currentRouteName')
    if (currentRouteName.startsWith(this.get('parentRouteName') + `.${this.get('viewRouteDirName')}`)) {
      this.set('persistedRouteName', currentRouteName)
    }
  }))
})
