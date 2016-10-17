import Ember from 'ember'
const {
  Helper: {
    helper
  }
} = Ember

// TODO Move to ember-frost-core
export function array (params) {
  let array = Ember.A()
  array.pushObjects(params)
  return array
}

export default helper(array)
