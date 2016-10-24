import Ember from 'ember'
import layout from '../templates/components/frost-object-details'
import PropTypesMixin, { PropTypes } from 'ember-prop-types'
import uuid from 'ember-simple-uuid'

const {
  Component,
  computed
} = Ember

export default Component.extend(PropTypesMixin, {
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-object-details'],

  // == State properties ======================================================
  orderedTabIds: [],

  propTypes: {
    selectedTabId: PropTypes.string.isRequired,
    selectedTabType: PropTypes.string.isRequired,
    defaultTabId: PropTypes.string.isRequired,
    detailTabs: PropTypes.array.isRequired,
    relatedObjectTabs: PropTypes.array,
    hook: PropTypes.string,
    targetOutlet: PropTypes.string,
    onChange: PropTypes.func
  },

  getDefaultProps () {
    return {
      targetOutlet: `tab-content-${uuid()}`
    }
  },

  // == Computed properties ===================================================

  /**
   * Register a tab in the ordered tab list.
   * @return {array} a list of the ordered tabs
   */
  registerTab: computed(function () {
    return (function () {
      return (id) => {
        this.get('orderedTabIds').push(id)
      }
    }.call(this))
  }),

  // == Actions ===============================================================

  actions: {
    change (id, type) {
      if (type === 'relatedObjectTab' && this.get('selectedTabId') === id) {
        id = this.defaultTabId
        type = 'tab'
      }

      if (this.onChange) {
        this.set('selectedTabId', id)
        this.set('selectedTabType', type)
        this.onChange(id, type)
      }
    }
  },

  // == Functions ==============================================================

  animations () {
    const detailTabType = 'tab'
    this.transition(
      this.toValue(function (toValue, fromValue) {
        const tabIds = toValue.orderedTabIds
        const tabType = toValue.tab.type

        return tabIds &&
          tabType === detailTabType &&
          tabIds.indexOf(fromValue.tab.id) > tabIds.indexOf(toValue.tab.id)
      }),
      this.use('to-left')
    )
    this.transition(
      this.toValue(function (toValue, fromValue) {
        const tabIds = toValue.orderedTabIds
        const tabType = toValue.tab.type

        return tabIds &&
          tabType === detailTabType &&
          tabIds.indexOf(fromValue.tab.id) < tabIds.indexOf(toValue.tab.id)
      }),
      this.use('to-right')
    )
    this.transition(
      this.toValue(function (toValue, fromValue) {
        return toValue.tab.type !== detailTabType && fromValue.tab.id !== toValue.tab.id
      }),
      this.use('to-up')
    )
    this.transition(
      this.toValue(function (toValue, fromValue) {
        return fromValue.tab.type !== detailTabType &&
          fromValue.tab.type !== toValue.tab.type &&
          fromValue.tab.id !== toValue.tab.id
      }),
      this.use('to-down')
    )
  }
})
