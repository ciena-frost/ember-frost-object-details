import Ember from 'ember'
import layout from '../templates/components/frost-related-object-tab'
import { PropTypes } from 'ember-prop-types'

const {
  computed
} = Ember

export default Ember.Component.extend({
  // == Component properties ==================================================

  layout,
  classNames: ['frost-related-object-tab'],

  // == State properties ======================================================
  type: 'relatedObjectTab',

  propTypes: {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]).isRequired,
    icon: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),
    hook: PropTypes.string,
    // Set by the object details component
    selectedTabName: PropTypes.string,
    selectedTabType: PropTypes.string,
    targetOutlet: PropTypes.string
  },

  // == Computed properties ===================================================

  isSelected: computed('selectedTabName', function () {
    const tabName = this.get('name')
    const selectedTabName = this.get('selectedTabName')

    return tabName === selectedTabName
  })
})
