import Ember from 'ember'
import layout from '../templates/components/frost-object-details'
import { PropTypes } from 'ember-prop-types'

const {
  Component
} = Ember

export default Component.extend({
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-object-details'],

  // == State properties ======================================================

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
  }
})

// TODO
// X keep track of the current selected tab in the url
// X select the current tab (underline the title or X on bubble)
// X Change link to button to avoid switching pages (might not be necessary)
// X Click link set query params
// X Bring to first tab if we select any of the related tab
// X Click on the related tab when selected will close that related tab and show the first tab
// X Show frost icons (issue with relative path)
// X Remove blue underline if selecting right tabs
// X add hooks
// X clean object-detail template
// X add tests (frost-object-details)


// add tests for tab-link
// fix tests
// linting
// add transition
// improve demo
// make sure all tools are working
//  - move liquid fire +++
//  - blanket => code coverage
//  - visual acceptance
//  - test on chrome
// add visual acceptance tests
// add array helper to core

