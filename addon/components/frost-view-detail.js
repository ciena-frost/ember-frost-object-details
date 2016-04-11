import Ember from 'ember'
import frostLink from 'ember-frost-core/components/frost-link'

const FrostViewDetail = frostLink.extend({

  didReceiveAttrs() {
    if(this.get('detailsRouteIndex')) {
      const { getOwner } = Ember
      let route = this.get('params')[0]
      let lookupRoute = getOwner(this).lookup(`route:${route}`)
      lookupRoute.set('detailsRouteIndex', this.get('detailsRouteIndex'))
    }
  }
})

export default FrostViewDetail
