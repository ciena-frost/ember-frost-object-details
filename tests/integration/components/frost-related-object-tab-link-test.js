import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import { beforeEach } from 'mocha'
import {
  $hook,
  initialize
} from 'ember-hook'
import hbs from 'htmlbars-inline-precompile'

const defaultPack = 'app'
const defaultSelectedPack = 'frost'
const defaultSelectedIcon = 'close'

const iconSelector = 'use'
const iconAttributeName = 'xlink:href'

const relatedObjectTabLinkTextHookName = '-related-object-tab-link-text'
const relatedObjectTabLinkTextHookIcon = '-related-object-tab-link-icon'

const defaultHook = ''
const text = 'some text'
const icon = ''
const pack = ''
const isSelected = false

const template = hbs`{{#frost-related-object-tab-link
  (query-params selectedTabName='test' selectedTabType='my-type')
  hook=hook
  icon=icon
  pack=pack
  isSelected=isSelected
}}
  some text
{{/frost-related-object-tab-link}}
`

describeComponent(
  'frost-related-object-tab-link',
  'Integration: FrostRelatedObjectTabLinkComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
      this.setProperties({
        hook: defaultHook,
        icon: icon,
        pack: pack,
        isSelected: isSelected
      })
    })

    it('Link with some text', function () {
      this.render(template)
      expect($hook(relatedObjectTabLinkTextHookName).text().trim()).to.be.equal(text)
      expect($hook(relatedObjectTabLinkTextHookIcon)).to.have.length(0)
    })

    it('Set a hook', function () {
      const hookName = 'hook1'
      this.setProperties({
        hook: hookName
      })
      this.render(template)
      expect($hook(`${hookName}${relatedObjectTabLinkTextHookName}`).text().trim()).to.be.equal(text)
      expect($hook(`${hookName}${relatedObjectTabLinkTextHookIcon}`)).to.have.length(0)
    })

    it('Set an icon', function () {
      const iconName = 'test'
      this.setProperties({
        icon: iconName
      })
      this.render(template)
      expect($hook(relatedObjectTabLinkTextHookIcon).find(iconSelector).attr(iconAttributeName)
            .indexOf(`/${defaultPack}.svg#${iconName}`)).to.be.gt(-1)
    })

    it('Set pack and icon', function () {
      const packName = 'my-pack'
      const iconName = 'test'
      this.setProperties({
        pack: packName,
        icon: iconName
      })
      this.render(template)
      expect($hook(relatedObjectTabLinkTextHookIcon).find(iconSelector).attr(iconAttributeName)
            .indexOf(`/${packName}.svg#${iconName}`)).to.be.gt(-1)
    })

    it('Set isSelected to true', function () {
      this.setProperties({
        isSelected: true,
        icon: 'test'
      })
      this.render(template)
      expect($hook(relatedObjectTabLinkTextHookIcon).find(iconSelector).attr(iconAttributeName)
            .indexOf(`/${defaultSelectedPack}.svg#${defaultSelectedIcon}`)).to.be.gt(-1)
    })
  }
)
