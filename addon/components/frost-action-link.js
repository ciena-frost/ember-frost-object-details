import Ember from 'ember'
import layout from '../templates/components/frost-action-link'
import _ from 'lodash/lodash'

export default Ember.Component.extend({
  _routing: Ember.inject.service('-routing'),

  layout: layout,
  classNames: ['frost-action-link'],

  /**
   @property classNameBindings
   @type Array
   @default ['isSelected']
   */
  classNameBindings: ['isSelected'],

  /**
   The recently visited primary view route from top tabs.
   The targetRouteName of a `frost-link` wrapped by `frost-action-link` would
   be set to `persistedRouteName` if `isSelected` is true and `persistedRouteName`
   is presented.
   @property persistedRouteName
   @type {String}
   */
  persistedRouteName: '',

  /**
   The default route entry for object detail view.
   The targetRouteName of a `frost-link` wrapped by `frost-action-link` would
   be set to `baseRoute` if `isSelected` is true and `baseRoute` is NOT presented.
   is presented.
   @property baseRoute
   @type {String}
   */
  baseRoute: '',

  /**
   A `frost-action-link` is considered active/isSelected when the application's
   current route is the route the `frost-link` wrapped by `frost-action-link`
   would trigger transitions into.
   @property isSelected
   */
  isSelected: Ember.computed('actionLink', '_routing.currentRouteName', function () {
    return this.get('actionLink.route') === this.get('_routing.currentRouteName')
  }),

  /**
   The event triggered when `frost-action-link` is clicked
   @property onclick
   */
  onclick: Ember.on('click', function (event) {
    if (!Ember.ViewUtils.isSimpleClick(event)) {
      return true
    }
    if (_.isFunction(this.get('on-click'))) {
      this.get('on-click')({actionLink: this.get('actionLink')})
    }
  })
})
