import Ember from 'ember'
import layout from '../templates/components/frost-object-details'
import _ from 'lodash'

function extraRoutes(availableRoutes, key, context) {
  return _.chain(availableRoutes)
    .filter((route) => {
      return _.includes(route, `${context.get('parentRouteName')}${key}`) && !(_.includes(route, 'loading') ||
        _.includes(route, 'error') ||
        _.includes(route, 'index'))
    })
    .map((subRoute) => {
      const { getOwner } = Ember
      let label = ''
      let lookupRoute = getOwner(context).lookup(`route:${subRoute}`)
      if (lookupRoute) {
        label = lookupRoute.get('detailsLabel')
      }

      if(key === '.related.') {
        let labelSvgPath = ''
        if (lookupRoute) {
          label = lookupRoute.get('detailsLabel')
          labelSvgPath = lookupRoute.get('detailsSvg')
        }
        return {
          alias: label || subRoute.substring(`${context.get('parentRouteName')}${key}`.length),
          route: subRoute,
          svgPath: labelSvgPath || 'frost/tenant'
        }
      }
      return {
        alias: label || subRoute.substring(`${context.get('parentRouteName')}${key}`.length),
        route: subRoute
      }
    })
    .value()
}

export default Ember.Component.extend({

  _routing: Ember.inject.service('-routing'),

  layout: layout,

  classNames: ['frost-object-details'],

  parentRouteName: Ember.computed('_routing.currentRouteName', function () {
    let currentRouteName = this.get('_routing.currentRouteName')
    if (_.includes(currentRouteName, '.views.')) {
      return currentRouteName.substring(0, currentRouteName.indexOf('.views.'))
    } else if (_.includes(currentRouteName, '.related.')) {
      return currentRouteName.substring(0, currentRouteName.indexOf('.related.'))
    }
  }),

  viewRoutes: Ember.computed('_routing', 'parentRouteName', function () {
    let availableRoutes = Object.keys(this.get('_routing.router').router.recognizer.names)
    return extraRoutes(availableRoutes, '.views.', this)
  }),

  relatedRoutes: Ember.computed('_routing', 'parentRouteName', function () {
    let availableRoutes = Object.keys(this.get('_routing.router').router.recognizer.names)
    return extraRoutes(availableRoutes, '.related.', this)
  }),

  routeChangeObserver: Ember.on('init', Ember.observer('_routing.currentRouteName', function () {
    let currentRouteName = this.get('_routing.currentRouteName')

    if (currentRouteName.startsWith(this.get('parentRouteName') + '.views')) {
      this.set('persistedRouteName', currentRouteName)
    }
  }))
})
