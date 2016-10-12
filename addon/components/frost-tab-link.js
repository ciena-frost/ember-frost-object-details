import frostLink from 'ember-frost-core/components/frost-link'
import layout from '../templates/components/frost-tab-link'
import { PropTypes } from 'ember-prop-types'

const FrostTabLink = frostLink.extend({
  // == Component properties ==================================================
  classNames: ['frost-tab-link'],
  classNameBindings: ['isSelected:active'],
  layout: layout,

  // == State properties ======================================================

  propTypes: {
    hook: PropTypes.string,
    isSelected: PropTypes.bool,
    isCurrent: PropTypes.bool
  }
})

export default FrostTabLink
