import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import { beforeEach } from 'mocha'
import hbs from 'htmlbars-inline-precompile'
import {
  $hook,
  initialize
} from 'ember-hook'

const name = 'my-tab'
const text = 'my tab text'
const defaultSelectedTabName = 'my-tab'
const defaultSelectedTabType = 'tab'
const defaultTabName = 'my-tab'
const defaultHook = ''

const detailTabHookName = '-object-tab'
const selectedDetailTabHookName = '-object-tab-selected'

const template = hbs`
  {{frost-object-tab
    hook=hook
    name=name
    text=text
    targetOutlet='outlet'
    content=(component 'object-details-content' color='skyblue' name=name)
    selectedTabName=selectedTabName
    selectedTabType=selectedTabType
    targetOutlet=targetOutlet
    defaultTabName=defaultTabName
  }}`

describeComponent(
  'frost-object-tab',
  'Integration: FrostObjectTabComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
      this.setProperties({
        name: name,
        text: text,
        selectedTabName: defaultSelectedTabName,
        selectedTabType: defaultSelectedTabType,
        defaultTabName: defaultTabName,
        hook: defaultHook
      })
    })

    it('Set hook', function () {
      const hookName = 'my-hook'
      this.setProperties({
        hook: hookName
      })
      this.render(template)
      expect($hook(`${hookName}${selectedDetailTabHookName}`)).to.have.length(1)
    })

    it('Set text', function () {
      const text = 'bla bla bla'
      this.setProperties({
        text: text
      })
      this.render(template)
      expect($hook(`${selectedDetailTabHookName}`).text().trim()).to.be.equal(text)
    })

    it('No tab selected', function () {
      this.setProperties({
        selectedTabName: null
      })
      this.render(template)
      expect($hook(`${selectedDetailTabHookName}`)).to.have.length(1)
    })

    it('No type selected', function () {
      this.setProperties({
        selectedTabType: null
      })
      this.render(template)
      expect($hook(`${selectedDetailTabHookName}`)).to.have.length(1)
    })

    it('Is default tab and different tab selected', function () {
      this.setProperties({
        defaultTabName: name,
        selectedTabName: 'abc',
        selectedTabType: 'abc'
      })
      this.render(template)
      expect($hook(`${detailTabHookName}`).find('.tab-selection.active')).to.have.length(0)
      expect($hook(`${detailTabHookName}`).find('.tab-selection')).to.have.length(1)
    })

    it('Is default tab and is selected', function () {
      this.setProperties({
        defaultTabName: name,
        selectedTabName: name
      })
      this.render(template)
      expect($hook(`${selectedDetailTabHookName}`).find('.tab-selection.active')).to.have.length(1)
    })

    it('Is selected', function () {
      this.setProperties({
        defaultTabName: 'abc',
        selectedTabName: name
      })
      this.render(template)
      expect($hook(`${selectedDetailTabHookName}`).find('.tab-selection.active')).to.have.length(1)
    })
  }
)
