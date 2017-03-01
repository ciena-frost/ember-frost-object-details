import Ember from 'ember'
import layout from '../templates/components/frost-related-object-tab'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

const {
  Component,
  computed
} = Ember

export default Component.extend(PropTypesMixin, {
  // == Component properties ==================================================

  layout,
  classNames: ['frost-related-object-tab'],

  // == State properties ======================================================
  type: 'relatedObjectTab',

  propTypes: {
    id: PropTypes.string.isRequired,
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
    // Set by the parent component
    selectedTabId: PropTypes.string.isRequired,
    selectedTabType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    parentHook: PropTypes.string,
    targetOutlet: PropTypes.string
  },

  // == Computed properties ===================================================

  isSelected: computed('selectedTabId', function () {
    return this.get('id') === this.get('selectedTabId')
  }),

  hook: computed('parentHook', 'id', function () {
    return `${this.parentHook}-${this.id}`
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
