import Ember from 'ember'
import layout from '../templates/components/frost-related-object-tab'
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

const {Component} = Ember

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
    // Set by the parent component
    selectedTabId: PropTypes.string.isRequired,
    selectedTabType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    parentHook: PropTypes.string,
    targetOutlet: PropTypes.string
  },

  init () {
    // This needs to be setup outside of ember-prop-types getDefaultProps() because it does not work
    // within the timing of tests
    this.set('hook', `${this.parentHook}-${this.id}`)
    this._super(...arguments)
  },

  // == Computed properties ===================================================

  @readOnly
  @computed('selectedTabId')
  isSelected (selectedTabId) {
    return this.id === selectedTabId
  },

  // == Actions ===============================================================

  actions: {
    change () {
      if (this.onChange) {
        this.onChange(this.id, this.type)
      }
    }
  }
})
