import Ember from 'ember'
import layout from '../templates/components/frost-object-details'
import _ from 'lodash'

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
    return _.chain(availableRoutes)
      .filter((route) => {
        return _.includes(route, `${this.get('parentRouteName')}.views.`) && !(_.includes(route, 'loading') ||
          _.includes(route, 'error') ||
          _.includes(route, 'index'))
      })
      .map((viewRoute) => {
        const { getOwner } = Ember
        let label = ''
        if (getOwner(this).lookup(`route:${viewRoute}`)) {
          label = getOwner(this).lookup(`route:${viewRoute}`).get('detailsLabel')
        }
        return {
          alias: label || viewRoute.substring(`${this.get('parentRouteName')}.views.`.length),
          route: viewRoute
        }
      })
      .value()
  }),

  relatedRoutes: Ember.computed('_routing', 'parentRouteName', function () {
    let availableRoutes = Object.keys(this.get('_routing.router').router.recognizer.names)
    return _.chain(availableRoutes)
      .filter((route) => {
        return _.includes(route, `${this.get('parentRouteName')}.related.`) && !(_.includes(route, 'loading') ||
          _.includes(route, 'error') ||
          _.includes(route, 'index'))
      })
      .map((relatedRoute) => {
        const { getOwner } = Ember
        let label = ''
        let labelSvgPath = ''
        if (getOwner(this).lookup(`route:${relatedRoute}`)) {
          label = getOwner(this).lookup(`route:${relatedRoute}`).get('detailsLabel')
          labelSvgPath = getOwner(this).lookup(`route:${relatedRoute}`).get('detailsSvg')
        }
        return {
          alias: label || relatedRoute.substring(`${this.get('parentRouteName')}.related.`.length),
          route: relatedRoute,
          svgPath: labelSvgPath || 'frost/tenant'
        }
      })
      .value()
  }),

  routeChangeObserver: Ember.on('init', Ember.observer('_routing.currentRouteName', function () {
    let currentRouteName = this.get('_routing.currentRouteName')

    if (currentRouteName.startsWith(this.get('parentRouteName') + '.views')) {
      this.set('persistedRouteName', currentRouteName)
    } else {
    }
  }))
})
