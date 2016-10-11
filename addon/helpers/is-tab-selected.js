import Ember from 'ember'

const {
  Helper: {
    helper
  }
} = Ember

/**
 * Returns true if the tab is selected and false otherwise.
 * @param {object} params the paramaters passed to the helper method
 *                0 the name the of tab
 *                1 the name of the selected tab
 *                2 the name the default tab
 * @returns {object} true if the tab is selected and false otherwise
 */
export function isTabSelected (params) {
  const tabName = params[0]
  const selectedTabName = params[1]
  const defaultTabName = params[2]

  if (tabName === selectedTabName || (selectedTabName === null && tabName === defaultTabName)) {
    return true
  }

  return false
}

export default helper(isTabSelected)
