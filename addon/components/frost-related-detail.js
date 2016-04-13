import Ember from 'ember'
import frostLink from 'ember-frost-core/components/frost-link'
import layout from '../templates/components/frost-related-detail'

const FrostRelatedDetails =  frostLink.extend({
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

  isSelected: Ember.computed('route', '_routing.currentRouteName', function () {
    return this.get('route') === this.get('_routing.currentRouteName')
  }),

  init() {
    this._super(...arguments);
    let params = this.params.slice();
    this.set('route', params[0])
  },

  myTargetRouteName: Ember.computed('isSelected', 'persistedRouteName', 'defaultRoute', function () {
    if(this.get('isSelected')) {
      if(this.get('persistedRouteName')) {
        return this.get('persistedRouteName')
      } else {
        return this.get('defaultRoute')
      }
    } else {
      return this.get('route')
    }
  }),

  qualifiedRouteName: Ember.computed('myTargetRouteName', '_routing.currentState', function computeLinkToComponentQualifiedRouteName() {
    let params = this.get('params').slice();
    let lastParam = params[params.length - 1];
    if (lastParam && lastParam.isQueryParams) {
      params.pop();
    }


    //let onlyQueryParamsSupplied = (this[HAS_BLOCK] ? params.length === 0 : params.length === 1);
    //if (onlyQueryParamsSupplied) {
    //  return this.get('_routing.currentRouteName');
    //}
    return this.get('myTargetRouteName');
  }),

  willRender() {
    this._super(...arguments);


  },

  didReceiveAttrs() {
    //if(!this.get('alias')) {
    //  let relatedRouteDirName = this.get('relatedRouteDirName') ? this.get('relatedRouteDirName') : 'related'
    //  this.set('alias', this.get('route').substring(`${this.get('parentRouteName')}.${relatedRouteDirName}.`.length))
    //}
    if(!this.get('svgPath')) {
      this.set('svgPath', 'frost/dialog-error')
    }
  }
})

export default FrostRelatedDetails
