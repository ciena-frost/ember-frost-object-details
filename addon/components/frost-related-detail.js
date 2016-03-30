import Ember from 'ember'
import layout from '../templates/components/frost-related-detail'

export default Ember.Component.extend({
  _routing: Ember.inject.service('-routing'),

  layout: layout,
  classNames: ['frost-related-detail'],

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
   be set to `defaultRoute` if `isSelected` is true and `defaultRoute` is NOT presented.
   @property defaultRoute
   @type {String}
   */
  defaultRoute: '',

  /**
   A `frost-action-link` is considered active/isSelected when the application's
   current route is the route the `frost-link` wrapped by `frost-action-link`
   would trigger transitions into.
   @property isSelected
   */
  isSelected: Ember.computed('relatedRoute', '_routing.currentRouteName', function () {
    return this.get('relatedRoute.route') === this.get('_routing.currentRouteName')
  })
})
