import frostLink from 'ember-frost-core/components/frost-link'
import layout from '../templates/components/frost-tab-link'
import { PropTypes } from 'ember-prop-types'

const FrostTabLink = frostLink.extend({
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-tab-link'],
  classNameBindings: ['isSelected:active'],

  // == State properties ======================================================

  propTypes: {
    hook: PropTypes.string,
    isSelected: PropTypes.bool,
    isDefault: PropTypes.bool
  }
})

export default FrostTabLink
