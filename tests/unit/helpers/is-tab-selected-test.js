import { expect } from 'chai'
import {
  describe,
  it
} from 'mocha'
import {
  isTabSelected
} from 'ember-frost-object-details/helpers/is-tab-selected'

describe('IsTabSelectedHelper', function () {
  // Replace this with your real tests.
  it('works', function () {
    let result = isTabSelected(42)
    expect(result).to.be.not.ok
  })
})
