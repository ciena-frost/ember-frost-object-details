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

const defaultHook = ''
const text = 'test text'
const isSelected = false
const isDefault = false

const template = hbs`{{#frost-tab-link
  (query-params selectedTabName='test' selectedTabType='my-type')
  hook=hook
  isSelected=isSelected
  isDefault=isDefault
}}
  test text
{{/frost-tab-link}}
`

const tabLinkHookName = '-object-tab-link'

describeComponent(
  'frost-tab-link',
  'Integration: FrostTabLinkComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
      this.setProperties({
        text: text,
        isSelected: isSelected,
        isDefault: isDefault,
        hook: defaultHook
      })
    })

    it('Set hook', function () {
      const hookName = 'my-hook'
      this.setProperties({
        hook: hookName
      })
      this.render(template)
      expect($hook(`${hookName}${tabLinkHookName}`)).to.have.length(1)
    })

    it('Set text', function () {
      this.render(template)
      expect($hook(`${tabLinkHookName}`).text().trim()).to.be.equal(text)
    })

    it('Is default', function () {
      this.setProperties({
        isDefault: true
      })
      this.render(template)
      expect($hook(`${tabLinkHookName}`).find('.tab-selection.active')).to.have.length(0)
      expect($hook(`${tabLinkHookName}`).find('.tab-selection')).to.have.length(1)
    })

    it('Is selected', function () {
      this.setProperties({
        isSelected: true
      })
      this.render(template)
      expect($hook(`${tabLinkHookName}`).find('.tab-selection.active')).to.have.length(1)
    })
  }
)
