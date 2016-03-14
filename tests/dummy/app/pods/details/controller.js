import Ember from 'ember'

export default Ember.Controller.extend({

  headerComponent: 'fre-details',
  baseRoute: 'details',

  subRoutes: [
    {
      name: 'sub-route-1',
      route: 'details.sub1'
    },
    {
      name: 'sub-route-2',
      route: 'details.sub2'
    }
  ],

  actionLinks: [
    {
      name: 'service',
      alias: 'Service',
      path: 'frost/service',
      route: 'details.service'
    },
    {
      name: 'network',
      alias: 'Network',
      path: 'app/nav-network',
      route: 'details.network'
    },{
      name: 'tenant',
      alias: 'Tenant',
      path: 'frost/tenant',
      route: 'details.tenant'
    }
  ],

  actions: {
    selected(attrs) {
      debugger;
      //console.log(attrs.actionLink.name)
      //console.log('persistRouteName: ' + this.get('persistRouteName'))
      this.set('actionLinkSelected', !(this.get('actionLinkSelected') === attrs.actionLink.name) ? attrs.actionLink.name : '')
    }

  }
})
