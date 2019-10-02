import { click } from '@ember/test-helpers';
import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const defaultPack = 'app'
const defaultSelectedPack = 'frost'
const defaultSelectedIcon = 'close'

const iconSelector = 'use'
const iconAttributeName = 'xlink:href'

const id = 'my-tab'
const text = 'my tab text'
const defaultSelectedTabId = 'my-tab'
const defaultSelectedTabType = 'tab'
const defaultHook = ''
const icon = {
  name: 'my-icon',
  pack: 'my-pack'
}
const iconWithNameOnly = {
  name: 'my-icon'
}

const relatedObjectTabHookName = '-related-object-tab'

const template = hbs`{{frost-related-object-tab
    hook=hook
    id=id
    text=text
    targetOutlet='outlet'
    content=(component 'object-details-content' color='skyblue' name=name)
    selectedTabId=selectedTabId
    selectedTabType=selectedTabType
    targetOutlet=targetOutlet
    icon=icon
    onChange=onChange
  }}`

const test = integration('frost-related-object-tab')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
    this.setProperties({
      id: id,
      text: text,
      selectedTabId: defaultSelectedTabId,
      selectedTabType: defaultSelectedTabType,
      icon: iconWithNameOnly,
      hook: defaultHook
    })
  })

  it('should set hook', function () {
    const hookName = 'my-hook'
    this.setProperties({
      hook: hookName
    })
    this.render(template)
    expect($hook(`undefined-${id}${relatedObjectTabHookName}`, {selected: true})).to.have.length(1)
  })

  it('should set parent hook', function () {
    const hookName = 'my-hook'
    this.setProperties({
      parentHook: hookName,
      id: id,
      text: text
    })
    this.render(hbs`{{frost-related-object-tab
      parentHook=parentHook
      id=id
      text=text
      content=(component 'object-details-content' color='skyblue' name=name)
    }}`)
    expect($hook(`${hookName}-${id}`)).to.have.length(1)
    expect($hook(`${hookName}-${id}${relatedObjectTabHookName}`, {selected: false})).to.have.length(1)
  })

  it('should set text', function () {
    const text = 'bla bla bla'
    this.setProperties({
      text: text
    })
    this.render(template)
    expect($hook(`undefined-${id}${relatedObjectTabHookName}`, {selected: true}).text().trim()).to.be.equal(text)
  })

  it('should set icon name', function () {
    this.setProperties({
      selectedTabId: 'abc'
    })
    this.render(template)
    expect($hook(`undefined-${id}${relatedObjectTabHookName}`, {selected: false}).find(iconSelector)
      .attr(iconAttributeName).indexOf(`/${defaultPack}.svg#${iconWithNameOnly.name}`)).to.be.gt(-1)
  })

  it('should set icon name and pack', function () {
    this.setProperties({
      selectedTabId: 'abc',
      icon: icon
    })
    this.render(template)
    expect($hook(`undefined-${id}${relatedObjectTabHookName}`, {selected: false}).find(iconSelector)
      .attr(iconAttributeName).indexOf(`/${icon.pack}.svg#${icon.name}`)).to.be.gt(-1)
  })

  it('should  have tab is selected', function () {
    this.render(template)
    expect(
      $hook(`undefined-${id}${relatedObjectTabHookName}`, {selected: true}).find('button.active')
    ).to.have.length(1)
    expect($hook(`undefined-${id}${relatedObjectTabHookName}`, {selected: true}).find(iconSelector)
      .attr(iconAttributeName).indexOf(`/${defaultSelectedPack}.svg#${defaultSelectedIcon}`)).to.be.gt(-1)
  })

  it('should set onChange', async function() {
    const defaultTabId = id
    const props = {
      defaultTabId: defaultTabId,
      selectedTabId: 'abc',
      onChange: sinon.spy()
    }

    this.setProperties(props)
    this.render(template)

    await click('button')

    expect(props.onChange.called).to.equal(true)
    props.onChange.reset()
  })
})
