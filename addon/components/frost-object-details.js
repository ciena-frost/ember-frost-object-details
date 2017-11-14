import Ember from 'ember'
const {Component, computed, get, guidFor, set} = Ember
import layout from '../templates/components/frost-object-details'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypesMixin, {
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-object-details'],

  // == State properties ======================================================
  orderedTabIds: [],
  tabTypeMap: {},

  propTypes: {
    selectedTabId: PropTypes.string.isRequired,
    selectedTabType: PropTypes.string.isRequired,
    defaultTabId: PropTypes.string.isRequired,
    detailTabs: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    hook: PropTypes.string.isRequired,
    relatedObjectTabs: PropTypes.array,
    targetOutlet: PropTypes.string
  },

  getDefaultProps () {
    return {
      targetOutlet: `tab-content-${guidFor({})}`
    }
  },

  // == Computed properties ===================================================

  /**
   * Register a tab in the ordered tab list.
   * @return {array} a list of the ordered tabs
   */
  registerTab: computed(function () {
    return (function () {
      return (id, type) => {
        this.get('orderedTabIds').push(id)
        set(this.get('tabTypeMap'), id, type)
      }
    }.call(this))
  }),

  animations: computed(function () {
    const orderedTabIds = this.get('orderedTabIds')
    const tabTypeMap = this.get('tabTypeMap')
    const detailTabType = 'tab'

    return function () {
      this.transition(
        this.toValue(function (toValue, fromValue) {
          const tabType = get(tabTypeMap, toValue)

          return orderedTabIds &&
            tabType === detailTabType &&
            orderedTabIds.indexOf(fromValue) > orderedTabIds.indexOf(toValue)
        }),
        this.use('to-left')
      )

      this.transition(
        this.toValue(function (toValue, fromValue) {
          const tabType = get(tabTypeMap, toValue)

          return orderedTabIds &&
            tabType === detailTabType &&
            orderedTabIds.indexOf(fromValue) < orderedTabIds.indexOf(toValue)
        }),
        this.use('to-right')
      )

      this.transition(
        this.toValue(function (toValue, fromValue) {
          return get(tabTypeMap, toValue) !== detailTabType && fromValue !== toValue
        }),
        this.use('to-up')
      )

      this.transition(
        this.toValue(function (toValue, fromValue) {
          return get(tabTypeMap, fromValue) !== detailTabType &&
            get(tabTypeMap, fromValue) !== get(tabTypeMap, toValue) &&
            fromValue !== toValue
        }),
        this.use('to-down')
      )
    }
  }),

  // == Actions ===============================================================

  actions: {
    change (id, type) {
      if (type === 'relatedObjectTab' && this.get('selectedTabId') === id) {
        id = this.defaultTabId
        type = 'tab'
      }

      if (this.onChange) {
        this.onChange(id, type)
      }
    }
  }

  // == Functions ==============================================================

})
