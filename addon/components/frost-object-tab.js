import Ember from 'ember'
import layout from '../templates/components/frost-object-tab'
import PropTypesMixin, { PropTypes } from 'ember-prop-types'

const {
  Component,
  computed,
  isEmpty
} = Ember

export default Component.extend(PropTypesMixin, {
  // == Component properties ==================================================

  layout,
  classNames: ['frost-object-tab'],

  // == State properties ======================================================
  type: 'tab',

  propTypes: {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]).isRequired,
    hook: PropTypes.string,
    // Set by the parent component
    selectedTabId: PropTypes.string.isRequired,
    selectedTabType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    parentHook: PropTypes.string,
    register: PropTypes.function,
    targetOutlet: PropTypes.string,
    defaultTabId: PropTypes.string
  },

  // == Computed properties ===================================================

  isSelected: computed('selectedTabId', 'defaultTabId', 'selectedTabType', function () {
    const tabId = this.get('id')
    const selectedTabId = this.get('selectedTabId')

    return tabId === selectedTabId ||
          ((isEmpty(selectedTabId) ||
            isEmpty(this.get('selectedTabType'))) &&
            tabId === this.get('defaultTabId'))
  }),

  isDefault: computed('isSelected', 'selectedTabType', 'type', 'id', 'defaultTabId', function () {
    return !this.get('isSelected') &&
      this.get('selectedTabType') !== this.get('type') &&
      this.get('id') === this.get('defaultTabId')
  }),

  hook: computed('parentHook', 'id', function () {
    return `${this.parentHook}-${this.id}`
  }),

  // == Events ================================================================

  /**
   * Register the id and type of the tab during init.
   */
  _register: Ember.on('init', function () {
    if (typeof this.register === 'function') {
      this.register(this.id, this.type)
    }
  }),

  // == Actions ===============================================================

  actions: {
    change () {
      if (this.onChange) {
        this.onChange(this.id, this.type)
      }
    }
  }
})
