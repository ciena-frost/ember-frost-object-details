import Ember from 'ember'
import layout from '../templates/components/frost-object-details'
import _ from 'lodash'
import TabFollower from '../mixins/tab-follower'

const {
  Component,
  computed,
  inject,
  observer,
  assert,
  on
  } = Ember

export default Component.extend(TabFollower, {

  _routing: inject.service('-routing'),

  layout: layout,

  classNames: ['frost-object-details'],

  didReceiveAttrs () {
    this.set('viewRouteDirName', 'views')
    this.set('relatedRouteDirName', 'related')
    assert('There is no default route provided.', this.get('defaultRoute'))
  },

  isViewRouteActivated: computed('_routing.currentRouteName', function () {
    let currentRouteName = this.get('_routing.currentRouteName')
    return currentRouteName.startsWith(this.get('parentRouteName') + `.${this.get('viewRouteDirName')}`)
  }),

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
    if (this.get('isViewRouteActivated')) {
      this.set('persistedRouteName', currentRouteName)
    }
    if (_.isFunction(this.updateFollower)) {
      this.updateFollower()
    }
  }))
})
