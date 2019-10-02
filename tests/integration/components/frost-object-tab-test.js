import { click } from '@ember/test-helpers';
import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const id = 'my-tab'
const text = 'my tab text'
const defaultSelectedTabId = 'my-tab'
const defaultSelectedTabType = 'tab'
const defaultTabId = 'my-tab'
const defaultHook = ''

const detailTabHookName = '-object-tab'

const template = hbs`
  {{frost-object-tab
    hook=hook
    id=id
    text=text
    targetOutlet='outlet'
    content=(component 'object-details-content' color='skyblue' name=name)
    selectedTabId=selectedTabId
    selectedTabType=selectedTabType
    targetOutlet=targetOutlet
    defaultTabId=defaultTabId
    onChange=onChange
  }}`

const test = integration('frost-object-tab')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
    this.setProperties({
      id: id,
      text: text,
      selectedTabId: defaultSelectedTabId,
      selectedTabType: defaultSelectedTabType,
      defaultTabId: defaultTabId,
      hook: defaultHook
    })
  })

  it('should set hook', function () {
    const hookName = 'my-hook'
    this.setProperties({
      hook: hookName
    })
    this.render(template)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: true})).to.have.length(1)
  })

  it('should set parent hook', function () {
    const hookName = 'my-hook'
    this.setProperties({
      parentHook: hookName,
      id: id,
      text: text,
      defaultTabId: defaultTabId
    })
    this.render(hbs`
      {{frost-object-tab
        parentHook=parentHook
        id=id
        text=text
        defaultTabId=defaultTabId
        content=(component 'object-details-content' color='skyblue' name=name)
      }}`)
    expect($hook(`${hookName}-${id}`)).to.have.length(1)
    expect($hook(`${hookName}-${id}${detailTabHookName}`, {selected: true})).to.have.length(1)
  })

  it('should set text', function () {
    const text = 'bla bla bla'
    this.setProperties({
      text: text
    })
    this.render(template)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: true}).text().trim()).to.be.equal(text)
  })

  it('should have no tab selected', function () {
    this.setProperties({
      selectedTabId: null
    })
    this.render(template)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: true})).to.have.length(1)
  })

  it('should have no type selected', function () {
    this.setProperties({
      selectedTabType: null
    })
    this.render(template)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: true})).to.have.length(1)
  })

  it('should have default tab and different tab selected', function () {
    this.setProperties({
      defaultTabId: id,
      selectedTabId: 'abc',
      selectedTabType: 'abc'
    })
    this.render(template)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: false}).find('button.active')).to.have.length(0)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: true})).to.have.length(0)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: false})).to.have.length(1)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: false}).find('button.default')).to.have.length(1)
  })

  it('should have default tab and is selected', function () {
    this.setProperties({
      defaultTabId: id,
      selectedTabId: id
    })
    this.render(template)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: true}).find('button.active')).to.have.length(1)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: true})).to.have.length(1)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: false})).to.have.length(0)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: false}).find('button.default')).to.have.length(0)
  })

  it('should have selected', function () {
    this.setProperties({
      defaultTabId: 'abc',
      selectedTabId: id
    })
    this.render(template)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: true}).find('button.active')).to.have.length(1)
    expect($hook(`undefined-${id}${detailTabHookName}`, {selected: true})).to.have.length(1)
  })

  it('should set onChange', async function() {
    const defaultTabId = id
    const props = {
      defaultTabId: defaultTabId,
      onChange: sinon.spy()
    }
    this.setProperties(props)
    this.render(template)

    await click('button')

    expect(props.onChange.called).to.equal(true)
    props.onChange.reset()
  })
})
