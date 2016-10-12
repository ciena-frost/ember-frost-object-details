import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { $hook } from 'ember-hook'

const defaultPack = 'app'
const defaultSelectedIcon = 'close'

const iconSelector = 'use'
const iconAttributeName = 'xlink:href'

const detailTabsHookName = '-object-details-tabs'
const detailTabHookName = '-object-details-tab'
const selectedDetailTabHookName = '-object-details-tab-selected'
const relatedObjectTabHookName = '-object-details-related-object-tab'
const selectedRelatedObjectTabHookName = '-object-details-related-object-tab-selected'
const bodyContentHookName = '-object-details-body-content'

describeComponent(
  'frost-object-details',
  'Integration: FrostObjectDetailsComponent',
  {
    integration: true
  },
  function () {
    it('Set hook name', function () {
      const hookName = 'my-hook'
      this.setProperties({
        hook: hookName
      })
      this.render(hbs`
        {{frost-object-details
          hook=hook
          detailTabs=(array
              (hash
                name='profile'
                text='Profile View'
                content=(component 'object-details-content' color='skyblue' name='profile')
              )
            )
        }}
      `)

      expect($hook(`${hookName}${detailTabsHookName}`)).to.have.length(1)
    })

    it('Select tab by default', function () {
      const selectedTabName = 'profile2'
      const selectedTabText = 'Profile View 2'
      const contentText = 'profile 2'
      this.setProperties({
        selectedTabName: selectedTabName,
        selectedTabText: selectedTabText,
        contentText: contentText
      })
      this.render(hbs`
        {{frost-object-details
          selectedTabName=selectedTabName
          detailTabs=(array
              (hash
                name='profile'
                text='Profile View'
                content=(component 'object-details-content' color='skyblue' name='profile')
              )
              (hash
                name=selectedTabName
                text=selectedTabText
                content=(component 'object-details-content' color='skyblue' name=contentText)
              )
            )
        }}
      `)

      expect($hook(detailTabHookName)).to.have.length(1)
      expect($hook(selectedDetailTabHookName).text().trim()).to.be.equal(selectedTabText)
      expect($hook(selectedDetailTabHookName).find('a.active')).to.have.length(1)
      expect($hook(selectedDetailTabHookName).find('.tab-selection.active')).to.have.length(1)
      expect($hook(bodyContentHookName).text().trim()).to.be.equal(`This is ${contentText} template`)
    })

    it('Select related object tab by default', function () {
      const selectedTabName = 'device'
      const selectedTabText = 'Device'
      const contentText = 'related devices'
      this.setProperties({
        selectedTabName: selectedTabName,
        selectedTabText: selectedTabText,
        contentText: contentText
      })
      this.render(hbs`
        {{frost-object-details
          selectedTabName=selectedTabName
          detailTabs=(array
              (hash
                name='profile'
                text='Profile View'
                content=(component 'object-details-content' color='skyblue' name='profile')
              )
            )
          relatedObjectTabs=(array
            (hash
              name=selectedTabName
              icon=(hash
                name='network-element'
              )
              text=selectedTabText
              content=(component 'object-details-content' color='coral' name=contentText)
            )
          )
        }}
      `)

      expect($hook(detailTabHookName)).to.have.length(1)

      expect($hook(selectedRelatedObjectTabHookName)).to.have.length(1)
      expect($hook(selectedRelatedObjectTabHookName).text().trim()).to.be.equal(selectedTabText)
      expect($hook(selectedRelatedObjectTabHookName).find('a.is-selected')).to.have.length(1)
      expect($hook(selectedRelatedObjectTabHookName).find(iconSelector).attr(iconAttributeName)
            .indexOf(`/${defaultPack}.svg#${defaultSelectedIcon}`)).to.exist

      expect($hook(relatedObjectTabHookName)).to.have.length(0)

      expect($hook(detailTabHookName).find('.tab-selection')).to.have.length(1)
      expect($hook(detailTabHookName).find('.tab-selection.active')).to.have.length(0)

      expect($hook(bodyContentHookName).text().trim()).to.be.equal(`This is ${contentText} template`)
    })

    it('Only a detail tab', function () {
      this.render(hbs`
        {{frost-object-details
          detailTabs=(array
            (hash
              name='profile'
              text='Profile View'
              content=(component 'object-details-content' color='skyblue' name='profile')
            )
          )
        }}
      `)

      expect($hook(selectedDetailTabHookName)).to.have.length(1)
      expect($hook(detailTabHookName)).to.have.length(0)
      expect($hook(relatedObjectTabHookName)).to.have.length(0)
    })

    it('Detail tab and related object tab', function () {
      const tabText = 'Profile View'
      const relatedObjectTabText = 'Devices'
      const iconName = 'network-element'
      this.setProperties({
        tabText: tabText,
        relatedObjectTabText: relatedObjectTabText,
        iconName: iconName
      })
      this.render(hbs`
        {{frost-object-details
          detailTabs=(array
            (hash
              name='profile'
              text=tabText
              content=(component 'object-details-content' color='skyblue' name='profile')
            )
          )
          relatedObjectTabs=(array
            (hash
              name='devices'
              icon=(hash
                name=iconName
              )
              text=relatedObjectTabText
              content=(component 'object-details-content' color='coral' name='related devices')
            )
          )
        }}
      `)

      expect($hook(selectedDetailTabHookName)).to.have.length(1)
      expect($hook(selectedDetailTabHookName).text().trim()).to.be.equal(tabText)

      expect($hook(relatedObjectTabHookName)).to.have.length(1)
      expect($hook(relatedObjectTabHookName).find(iconSelector).attr(iconAttributeName)
            .indexOf(`/${defaultPack}.svg#${iconName}`)).to.exist
      expect($hook(relatedObjectTabHookName).text().trim()).to.be.equal(relatedObjectTabText)

      expect($hook(detailTabHookName)).to.have.length(0)
    })

    it('Set content', function () {
      this.render(hbs`
        {{#frost-object-details
            detailTabs=(array
              (hash
                name='profile'
                text='Profile View'
                content=(component 'object-details-content' color='skyblue' name='profile')
              )
            )
        }}
        test
        {{/frost-object-details}}
      `)

      expect($hook(selectedDetailTabHookName)).to.have.length(1)
      expect($hook('-object-details-content').text().trim()).to.be.equal('test')
    })
  }
)
