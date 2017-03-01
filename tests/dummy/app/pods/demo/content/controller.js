import Ember from 'ember'
const {Controller} = Ember

// BEGIN-SNIPPET content-controller
export default Controller.extend({
  queryParams: ['filter'],

  filter: '',
  filterA: '',
  filterB: '',

  actions: {
    onChange (id, type) {
      this.set('selectedTabId', id)
      this.set('selectedTabType', type)
    },

    onFilterChange (event) {
      this.set('filter', event.value)
    },

    onFilterChangeA (event) {
      this.set('filterA', event.value)
    },

    onFilterChangeB (event) {
      this.set('filterB', event.value)
    }
  }
})
// END-SNIPPET
