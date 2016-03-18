import Ember from 'ember'

export default Ember.Controller.extend({

  headerComponent: 'fre-details',
  baseRoute: 'details.maps',

  subRoutes: [
    {
      alias: 'Maps',
      route: 'details.maps'
    },
    {
      alias: 'Details',
      route: 'details.details'
    }
  ],

  actionLinks: [
    {
      alias: 'Service',
      svgPath: 'frost/service',
      route: 'details.service'
    },
    {
      alias: 'Network',
      svgPath: 'app/nav-network',
      route: 'details.network'
    }, {
      alias: 'Tenant',
      svgPath: 'frost/tenant',
      route: 'details.tenant'
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
