import Ember from 'ember';
import layout from '../templates/components/frost-action-link'
import _frostObjectDetails from './frost-object-details'
import _ from 'lodash/lodash'

export default Ember.Component.extend({

  routing: Ember.inject.service('-routing'),

  layout: layout,
  classNames: ['frost-action-link'],
  classNameBindings: ['isSelected'],

  initContext: Ember.on('didInitAttrs', function() {
    this.set('_frostObjectDetails', this.nearestOfType(_frostObjectDetails))
  }),

  isSelected: Ember.computed('actionLinkSelected', 'routing.currentRouteName', function () {
    return this.get('actionLinkSelected.route') === this.get('actionLink.route')
  }),

  onclick: Ember.on('click', function (event) {

    if(!Ember.ViewUtils.isSimpleClick(event)) {
      return true
    }

    if ( _.isFunction(this.get('_frostObjectDetails.on-action-select'))) {
      this.get('_frostObjectDetails.on-action-select')({actionLink: this.get('actionLink')})
    }

  })
});
