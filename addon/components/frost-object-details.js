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






//
//viewRoutes: Ember.computed('_routing', 'parentRouteName', function () {
//  let availableRoutes = Object.keys(this.get('_routing.router').router.recognizer.names)
//  return extraRoutes(availableRoutes, '.views.', this)
//}),
//
//relatedRoutes: Ember.computed('_routing', 'parentRouteName', function () {
//  let availableRoutes = Object.keys(this.get('_routing.router').router.recognizer.names)
//  return extraRoutes(availableRoutes, '.related.', this)
//}),

//function extraRoutes (availableRoutes, key, context) {
//  return _.chain(availableRoutes)
//    .filter((route) => {
//      return _.includes(route, `${context.get('parentRouteName')}${key}`) && !(_.includes(route, 'loading') ||
//        _.includes(route, 'error') ||
//        _.includes(route, 'index'))
//    })
//    .map((subRoute) => {
//      const { getOwner } = Ember
//      let label = ''
//      let lookupRoute = getOwner(context).lookup(`route:${subRoute}`)
//      if (lookupRoute) {
//        label = lookupRoute.get('detailsLabel')
//      }
//
//      if (key === '.related.') {
//        let labelSvgPath = ''
//        if (lookupRoute) {
//          label = lookupRoute.get('detailsLabel')
//          labelSvgPath = lookupRoute.get('detailsSvg')
//        }
//        return {
//          alias: label || subRoute.substring(`${context.get('parentRouteName')}${key}`.length),
//          route: subRoute,
//          svgPath: labelSvgPath || 'frost/dialog-error'
//        }
//      }
//      return {
//        alias: label || subRoute.substring(`${context.get('parentRouteName')}${key}`.length),
//        route: subRoute
//      }
//    })
//    .value()
//}
