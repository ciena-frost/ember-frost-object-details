import Ember from 'ember'
import layout from '../templates/components/frost-object-details'
import _ from 'lodash'
import { PropTypes } from 'ember-prop-types'

const {
  Component,
  computed,
  assert
} = Ember

export default Component.extend({
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-object-details'],

  // == State properties ======================================================

  propTypes: {
    hook: PropTypes.string,
    selectedTabName: PropTypes.string,
    detailTabs: PropTypes.array.isRequired,
    relatedObjectTabs: PropTypes.array
  },

  // == Computed properties ===================================================

  /**
   * Get the default tab. The default tab is the first tab defined in 'detailTabs' attribute.
   * @returns {object} the default tab
   */
  defaultTab: computed('detailTabs', function () {
    const detailTabs = this.get('detailTabs')
    if (_.isEmpty(detailTabs)) {
      assert('Must be at least one item in detailTabs')
    }

    return detailTabs[0]
  }),

  /**
   * Get the current tab.
   * @returns {object} the current tab
   */
  currentTab: computed('selectedTabName', 'detailTabs', function () {
    // TODO
    // validate empty currentTabName
    // validate empty detailTabs
    // validate empty detailTabs + currentTabName empty

    const selectedTabName = this.get('selectedTabName')
    const detailTabs = this.get('detailTabs')

    let currentTab = _.find(detailTabs, (obj) => {
      return obj.name === selectedTabName
    })

    if (_.isEmpty(currentTab)) {
      currentTab = this.get('defaultTab')
    }

    return currentTab
  }),

  /**
   * Get the current related object tab.
   * @returns {object} the current related object tab
   */
  currentRelatedObjectTab: computed('selectedTabName', 'relatedObjectTabs', function () {
    // TODO
    // validate empty currentTabName
    // validate empty relatedObjectTabs
    // validate empty relatedObjectTabs + currentTabName empty

    const selectedTabName = this.get('selectedTabName')
    const relatedObjectTabs = this.get('relatedObjectTabs')

    return _.find(relatedObjectTabs, (obj) => {
      return obj.name === selectedTabName
    })
  })
})

// TODO
// X keep track of the current selected tab in the url
// X select the current tab (underline the title or X on bubble)
// X Change link to button to avoid switching pages (might not be necessary)
// X Click link set query params

// X Bring to first tab if we select any of the related tab
// X Click on the related tab when selected will close that related tab and show the first tab

// Show frost icons (issue with relative path)

// X Remove blue underline if selecting right tabs

// X add hooks
// X clean object-detail template

// add tests (frost-object-details)
// improve demo
// add transition
// make sure all tools are working
// add visual acceptance tests

