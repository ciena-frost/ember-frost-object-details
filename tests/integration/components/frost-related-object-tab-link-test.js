import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import { $hook } from 'ember-hook'
import hbs from 'htmlbars-inline-precompile'

const defaultPack = 'app'
const defaultSelectedIcon = 'close'

const iconSelector = 'use'
const iconAttributeName = 'xlink:href'

const relatedObjectTabLinkTextHookName = '-related-object-tab-link-text'
const relatedObjectTabLinkTextHookIcon = '-related-object-tab-link-icon'

describeComponent(
  'frost-related-object-tab-link',
  'Integration: FrostRelatedDetailComponent',
  {
    integration: true
  },
  function () {
    it('Link with some text', function () {
      this.render(hbs`
        {{#frost-related-object-tab-link}}
          some text
        {{/frost-related-object-tab-link}}
      `)
      expect($hook(relatedObjectTabLinkTextHookName).text().trim()).to.be.equal('some text')
      expect($hook(relatedObjectTabLinkTextHookIcon)).to.have.length(0)
    })

    it('Set a hook', function () {
      const hookName = 'hook1'
      this.setProperties({
        hook: hookName
      })
      this.render(hbs`
        {{#frost-related-object-tab-link hook=hook}}
          some text
        {{/frost-related-object-tab-link}}
      `)
      expect($hook(`${hookName}${relatedObjectTabLinkTextHookName}`).text().trim()).to.be.equal('some text')
      expect($hook(`${hookName}${relatedObjectTabLinkTextHookIcon}`)).to.have.length(0)
    })

    it('Set an icon', function () {
      const iconName = 'test'
      this.setProperties({
        icon: iconName
      })
      this.render(hbs`
        {{#frost-related-object-tab-link icon=icon}}
          some text
        {{/frost-related-object-tab-link}}
      `)
      expect($hook(relatedObjectTabLinkTextHookIcon).find(iconSelector).attr(iconAttributeName)
            .indexOf(`/${defaultPack}.svg#${iconName}`)).to.exist
    })

    it('Set pack and icon', function () {
      const packName = 'my-pack'
      const iconName = 'test'
      this.setProperties({
        pack: packName,
        icon: iconName
      })
      this.render(hbs`
        {{#frost-related-object-tab-link icon=icon pack=pack}}
          some text
        {{/frost-related-object-tab-link}}
      `)
      expect($hook(relatedObjectTabLinkTextHookIcon).find(iconSelector).attr(iconAttributeName)
            .indexOf(`/${packName}.svg#${iconName}`)).to.exist
    })

    it('Set isSelected to true', function () {
      const isSelected = true
      const iconName = 'test'
      this.setProperties({
        isSelected: isSelected,
        icon: iconName
      })
      this.render(hbs`
        {{#frost-related-object-tab-link icon=icon isSelected=isSelected}}
          some text
        {{/frost-related-object-tab-link}}
      `)
      expect($hook(relatedObjectTabLinkTextHookIcon).find(iconSelector).attr(iconAttributeName)
            .indexOf(`/${defaultPack}.svg#${defaultSelectedIcon}`)).to.exist
    })
  }
)
