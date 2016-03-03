import Ember from 'ember'
import layout from '../templates/components/frost-object-details-subroute'
import _frostObjectDetails from './frost-object-details'
import _ from 'lodash/lodash'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-object-details-subroute'],

  initContext: Ember.on('didInitAttrs', function() {
    this.set('_frostObjectDetails', this.nearestOfType(_frostObjectDetails))
  }),

  onclick: Ember.on('click', function (event) {

    if(!Ember.ViewUtils.isSimpleClick(event)) {
      return true
    }

    if ( _.isFunction(this.get('_frostObjectDetails.on-route-select'))) {
      this.get('_frostObjectDetails.on-route-select')({subRoute: this.get('subRoute')})
    }

  })

})
