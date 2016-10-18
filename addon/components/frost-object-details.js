import Ember from 'ember'
import layout from '../templates/components/frost-object-details'
import { PropTypes } from 'ember-prop-types'

const {
  Component,
  computed
} = Ember

export default Component.extend({
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-object-details'],

  // == State properties ======================================================
  orderedTabNames: [],

  propTypes: {
    selectedTabName: PropTypes.string.isRequired,
    selectedTabType: PropTypes.string.isRequired,
    defaultTabName: PropTypes.string.isRequired,
    detailTabs: PropTypes.array.isRequired,
    relatedObjectTabs: PropTypes.array,
    hook: PropTypes.string,
    targetOutlet: PropTypes.string
  },

  getDefaultProps () {
    return {
      targetOutlet: 'tab-content'
    }
  },

  // == Computed properties ===================================================

  /**
   * Register a tab in the ordered tab list.
   * @return {array} a list of the ordered tabs
   */
  registerTab: computed(function () {
    return (function () {
      return (name) => {
        this.get('orderedTabNames').push(name)
      }
    }.call(this))
  }),

  // == Functions ==============================================================

  animations () {
    const detailTabType = 'tab'
    this.transition(
      this.toValue(function (toValue, fromValue) {
        const tabNames = toValue.orderedTabNames
        const tabType = toValue.tab.type

        return tabNames &&
          tabType === detailTabType &&
          tabNames.indexOf(fromValue.tab.name) > tabNames.indexOf(toValue.tab.name)
      }),
      this.use('to-left')
    )
    this.transition(
      this.toValue(function (toValue, fromValue) {
        const tabNames = toValue.orderedTabNames
        const tabType = toValue.tab.type

        return tabNames &&
          tabType === detailTabType &&
          tabNames.indexOf(fromValue.tab.name) < tabNames.indexOf(toValue.tab.name)
      }),
      this.use('to-right')
    )
    this.transition(
      this.toValue(function (toValue, fromValue) {
        return toValue.tab.type !== detailTabType && fromValue.tab.name !== toValue.tab.name
      }),
      this.use('to-up')
    )
    this.transition(
      this.toValue(function (toValue, fromValue) {
        return fromValue.tab.type !== detailTabType &&
          fromValue.tab.type !== toValue.tab.type &&
          fromValue.tab.name !== toValue.tab.name
      }),
      this.use('to-down')
    )
  }
})
