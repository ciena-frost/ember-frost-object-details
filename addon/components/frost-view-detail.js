import Ember from 'ember'
import frostLink from 'ember-frost-core/components/frost-link'
import layout from '../templates/components/frost-view-detail'

const {
  assert
  } = Ember

const FrostViewDetail = frostLink.extend({
  classNames: ['frost-view-detail'],
  layout,

  didReceiveAttrs () {
    if (this.get('detailsRouteIndex')) {
      const { getOwner } = Ember
      let route = this.get('params')[0]
      let lookupRoute = getOwner(this).lookup(`route:${route}`)
      assert(`There is no route named ${route}`, lookupRoute)
      lookupRoute.set('detailsRouteIndex', this.get('detailsRouteIndex'))
    }
  }
})

export default FrostViewDetail
