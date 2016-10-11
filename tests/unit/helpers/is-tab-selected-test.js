import { expect } from 'chai'
import {
  describe,
  it
} from 'mocha'
import {
  isTabSelected
} from 'ember-frost-object-details/helpers/is-tab-selected'

const TAB_NAME = 'test'
const OTHER_TAB_NAME = 'test1'

describe('IsTabSelectedHelper', function () {
  it('Missing first argument', function () {
    let result = isTabSelected([])
    expect(result).to.be.not.ok
  })

  it('Missing second argument', function () {
    let result = isTabSelected([TAB_NAME])
    expect(result).to.be.not.ok
  })

  it('Tab name not set', function () {
    const tabName = null
    const selectedTabName = TAB_NAME
    let result = isTabSelected([tabName, selectedTabName])
    expect(result).to.be.not.ok
  })

  it('Selected tab name not set', function () {
    const tabName = TAB_NAME
    const selectedTabName = null
    let result = isTabSelected([tabName, selectedTabName])
    expect(result).to.be.not.ok
  })

  it('Tab selected', function () {
    const tabName = TAB_NAME
    const selectedTabName = TAB_NAME
    let result = isTabSelected([tabName, selectedTabName])
    expect(result).to.be.ok
  })

  it('Tab not selected and default tab not set', function () {
    const tabName = TAB_NAME
    const selectedTabName = OTHER_TAB_NAME
    let result = isTabSelected([tabName, selectedTabName])
    expect(result).to.be.not.ok
  })

  it('Tab not selected and tab is not default', function () {
    const tabName = TAB_NAME
    const selectedTabName = null
    const defaultTabName = OTHER_TAB_NAME
    let result = isTabSelected([tabName, selectedTabName, defaultTabName])
    expect(result).to.be.not.ok
  })

  it('Tab not selected and tab is default', function () {
    const tabName = TAB_NAME
    const selectedTabName = null
    const defaultTabName = TAB_NAME
    let result = isTabSelected([tabName, selectedTabName, defaultTabName])
    expect(result).to.be.ok
  })
})
