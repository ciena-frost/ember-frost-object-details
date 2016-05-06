import Ember from 'ember'
import layout from '../templates/components/frost-object-details'
import _ from 'lodash'

const {
  Component,
  computed,
  inject,
  observer,
  on
  } = Ember

export default Component.extend({

  _routing: inject.service('-routing'),

  layout: layout,

  classNames: ['frost-object-details'],

  didReceiveAttrs () {
    this.set('viewRouteDirName', 'views')
    this.set('relatedRouteDirName', 'related')
  },

  parentRouteName: computed('_routing.currentRouteName', function () {
    let currentRouteName = this.get('_routing.currentRouteName')
    if (_.includes(currentRouteName, `.${this.get('viewRouteDirName')}.`)) {
      return currentRouteName.substring(0, currentRouteName.indexOf(`.${this.get('viewRouteDirName')}.`))
    } else if (_.includes(currentRouteName, `.${this.get('relatedRouteDirName')}.`)) {
      return currentRouteName.substring(0, currentRouteName.indexOf(`.${this.get('relatedRouteDirName')}.`))
    }
  }),

  routeChangeObserver: on('init', observer('_routing.currentRouteName', function () {
    let currentRouteName = this.get('_routing.currentRouteName')
    if (currentRouteName.startsWith(this.get('parentRouteName') + `.${this.get('viewRouteDirName')}`)) {
      this.set('persistedRouteName', currentRouteName)
    }
  }))
})
