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
import sinon from 'sinon'

const id = 'my-tab'
const text = 'my tab text'
const defaultSelectedTabId = 'my-tab'
const defaultSelectedTabType = 'tab'
const defaultTabId = 'my-tab'
const defaultHook = ''

const detailTabHookName = '-object-tab'
const selectedDetailTabHookName = '-object-tab-selected'

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
        id: id,
        text: text,
        selectedTabId: defaultSelectedTabId,
        selectedTabType: defaultSelectedTabType,
        defaultTabId: defaultTabId,
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
        selectedTabId: null
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
        defaultTabId: id,
        selectedTabId: 'abc',
        selectedTabType: 'abc'
      })
      this.render(template)
      expect($hook(`${detailTabHookName}`).find('button.active')).to.have.length(0)
      expect($hook(`${selectedDetailTabHookName}`)).to.have.length(0)
      expect($hook(`${detailTabHookName}`)).to.have.length(1)
      expect($hook(`${detailTabHookName}`).find('button.default')).to.have.length(1)
    })

    it('Is default tab and is selected', function () {
      this.setProperties({
        defaultTabId: id,
        selectedTabId: id
      })
      this.render(template)
      expect($hook(`${selectedDetailTabHookName}`).find('button.active')).to.have.length(1)
      expect($hook(`${selectedDetailTabHookName}`)).to.have.length(1)
      expect($hook(`${detailTabHookName}`)).to.have.length(0)
      expect($hook(`${detailTabHookName}`).find('button.default')).to.have.length(0)
    })

    it('Is selected', function () {
      this.setProperties({
        defaultTabId: 'abc',
        selectedTabId: id
      })
      this.render(template)
      expect($hook(`${selectedDetailTabHookName}`).find('button.active')).to.have.length(1)
      expect($hook(`${selectedDetailTabHookName}`)).to.have.length(1)
    })

    it('Set onChange', function () {
      const defaultTabId = id
      const props = {
        defaultTabId: defaultTabId,
        onChange: sinon.spy()
      }
      this.setProperties(props)
      this.render(template)

      this.$('button').click()

      expect(props.onChange.called).to.be.true
      props.onChange.reset()
    })
  }
)
