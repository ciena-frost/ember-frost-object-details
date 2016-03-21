import Ember from 'ember'

export default Ember.Controller.extend({

  headerComponent: 'fre-details',
  baseRoute: 'details.views.maps',

  subRoutes: [
    {
      alias: 'Maps',
      route: 'details.views.maps'
    },
    {
      alias: 'Details',
      route: 'details.views.lines'
    }
  ],

  actionLinks: [
    {
      alias: 'Service',
      svgPath: 'frost/service',
      route: 'details.related.service'
    },
    {
      alias: 'Network',
      svgPath: 'app/nav-network',
      route: 'details.related.network'
    }, {
      alias: 'Tenant',
      svgPath: 'frost/tenant',
      route: 'details.related.tenant'
    }
  ],

  actions: {
    selected (attrs) {
      this.notifications.addNotification({
        type: 'success',
        message: 'action triggered by ' + attrs.actionLink.alias,
        autoClear: true,
        clearDuration: 1500
      })
    }

  }
})
