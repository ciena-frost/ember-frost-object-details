import Ember from 'ember'
import layout from '../templates/components/frost-object-tab'
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

const {
  Component,
  isEmpty,
  on
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
    // Set by the parent component
    selectedTabId: PropTypes.string.isRequired,
    selectedTabType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    parentHook: PropTypes.string,
    register: PropTypes.func,
    targetOutlet: PropTypes.string,
    defaultTabId: PropTypes.string
  },

  init () {
    // This needs to be setup outside of ember-prop-types getDefaultProps() because it does not work
    // within the timing of tests
    this.set('hook', `${this.parentHook}-${this.id}`)
    this._super(...arguments)
  },

  // == Computed properties ===================================================

  @readOnly
  @computed('selectedTabId', 'defaultTabId', 'selectedTabType')
  isSelected (selectedTabId, defaultTabId, selectedTabType) {
    const tabId = this.id

    return tabId === selectedTabId ||
      ((isEmpty(selectedTabId) ||
        isEmpty(selectedTabType)) &&
        tabId === defaultTabId)
  },

  @readOnly
  @computed('isSelected', 'selectedTabType', 'type', 'id', 'defaultTabId')
  isDefault (isSelected, selectedTabType, type, id, defaultTabId) {
    return !isSelected &&
      selectedTabType !== type &&
      id === defaultTabId
  },

  // == Events ================================================================

  /**
   * Register the id and type of the tab during init.
   */
  _register: on('init', function () {
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
