import Ember from 'ember'
import layout from '../templates/components/frost-object-tab'
import _ from 'lodash'
import { PropTypes } from 'ember-prop-types'

const {
  computed
} = Ember

export default Ember.Component.extend({
  // == Component properties ==================================================

  layout,
  classNames: ['frost-object-tab'],

  // == State properties ======================================================
  type: 'tab',

  propTypes: {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]).isRequired,
    hook: PropTypes.string,
    // Set by the object details component
    register: PropTypes.function,
    selectedTabName: PropTypes.string,
    selectedTabType: PropTypes.string,
    targetOutlet: PropTypes.string,
    defaultTabName: PropTypes.string
  },

  // == Computed properties ===================================================

  isSelected: computed('selectedTabName', 'defaultTabName', 'selectedTabType', function () {
    const tabName = this.get('name')

    const selectedTabName = this.get('selectedTabName')
    const selectedTabType = this.get('selectedTabType')

    const defaultTabName = this.get('defaultTabName')

    return tabName === selectedTabName ||
          ((_.isEmpty(selectedTabName) || _.isEmpty(selectedTabType)) && tabName === defaultTabName)
  }),

  // == Events ================================================================
  /**
   * Register the name of the tab during init.
   */
  _register: Ember.on('init', function () {
    if (typeof this.register === 'function') {
      this.register(this.name)
    }
  })
})
