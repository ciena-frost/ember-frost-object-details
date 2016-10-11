import Ember from 'ember'

export function isTabSelected (params) {
  const tabName = params[0]
  const selectedTabName = params[1]
  const defaultTabName = params[2]

  if (tabName === selectedTabName || (selectedTabName === null && tabName === defaultTabName)) {
    return true
  }

  return false
}

export default Ember.Helper.helper(isTabSelected)
