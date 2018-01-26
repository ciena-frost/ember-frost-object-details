import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const defaultPack = 'app'
const defaultSelectedPack = 'frost'
const defaultSelectedIcon = 'close'

const iconSelector = 'use'
const iconAttributeName = 'xlink:href'

const objectDetailsHookName = '-object-details'
const objectDetailsContentHookName = '-object-details-content'
const detailsObjectTabsHookName = '-object-details-tabs'
const detailsObjectTabHookName = '-object-details-tab'
const detailsRelatedObjectTabsHookName = '-object-details-related-object-tabs'
const detailsRelatedObjectTabHookName = '-object-details-related-object-tab'
const bodyContentHookName = '-object-details-body-content'
const objectTabHookName = '-object-tab'
const relatedObjectTabHookName = '-related-object-tab'

const test = integration('frost-object-details')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
  })

  it('should set hook name', function () {
    const hookName = 'my-hook'
    const tabId = 'profile'
    const relatedTabId = 'devices'
    this.setProperties({
      hook: hookName,
      defaultTabId: tabId,
      relatedTabId: relatedTabId
    })
    this.render(hbs`
      {{frost-object-details
        hook=hook
        defaultTabId=defaultTabId
        detailTabs=(array
            (component 'frost-object-tab'
              id='profile'
              text='Profile View'
              content=(component 'object-details-content' color='skyblue' name='profile')
            )
          )
        relatedObjectTabs=(array
          (component 'frost-related-object-tab'
            id=relatedTabId
            icon=(hash
              name='network-element'
            )
            text='Devices'
            content=(component 'object-details-content' color='coral' name='devices')
          )
        )
      }}
    `)

    return wait()
      .then(() => {
        expect($hook(`${hookName}${objectDetailsHookName}`)).to.have.length(1)
        expect($hook(`${hookName}${objectDetailsContentHookName}`)).to.have.length(1)
        expect($hook(`${hookName}${detailsObjectTabsHookName}`)).to.have.length(1)
        expect($hook(`${hookName}${detailsObjectTabHookName}`, {index: 0})).to.have.length(1)
        expect($hook(`${hookName}-${tabId}`)).to.have.length(1)
        expect($hook(`${hookName}-${tabId}${objectTabHookName}`)).to.have.length(1)
        expect($hook(`${hookName}${bodyContentHookName}`)).to.have.length(1)
        expect($hook(`${hookName}${detailsRelatedObjectTabsHookName}`)).to.have.length(1)
        expect($hook(`${hookName}${detailsRelatedObjectTabHookName}`, {index: 0})).to.have.length(1)
        expect($hook(`${hookName}-${relatedTabId}`)).to.have.length(1)
        expect($hook(`${hookName}-${relatedTabId}${relatedObjectTabHookName}`)).to.have.length(1)
      })
  })

  it('should select tab by default', function () {
    const selectedTabText = 'Profile View 2'
    const contentText = 'profile 2'
    const defaultTabId = 'profile2'
    this.setProperties({
      selectedTabText: selectedTabText,
      defaultTabId: defaultTabId,
      contentText: contentText
    })
    this.render(hbs`
      {{frost-object-details
        defaultTabId=defaultTabId
        detailTabs=(array
            (component 'frost-object-tab'
              id='profile'
              text='Profile View'
              content=(component 'object-details-content' color='skyblue' name='profile')
            )
            (component 'frost-object-tab'
              id=defaultTabId
              text=selectedTabText
              content=(component 'object-details-content' color='skyblue' name=contentText)
            )
          )
      }}
    `)

    return wait()
      .then(() => {
        expect($hook(detailsObjectTabHookName)).to.have.length(2)
        expect($hook(detailsObjectTabHookName, {index: 1}).text().trim()).to.be.equal(selectedTabText)
        expect($hook(detailsObjectTabHookName, {index: 1}).find('button.active')).to.have.length(1)
        expect($hook(detailsObjectTabHookName, {index: 1})).to.have.length(1)
        expect($hook(bodyContentHookName).text().trim()).to.be.equal(`This is ${contentText} template`)
      })
  })

  it('should select related object tab', function () {
    const selectedTabId = 'device'
    const selectedTabType = 'relatedObjectTab'
    const selectedTabText = 'Device'
    const defaultTabId = 'profile'
    const contentText = 'related devices'
    this.setProperties({
      selectedTabId: selectedTabId,
      selectedTabType: selectedTabType,
      selectedTabText: selectedTabText,
      defaultTabId: defaultTabId,
      contentText: contentText
    })
    this.render(hbs`
      {{frost-object-details
        selectedTabId=selectedTabId
        selectedTabType=selectedTabType
        defaultTabId=defaultTabId
        detailTabs=(array
            (component 'frost-object-tab'
              id='profile'
              text='Profile View'
              content=(component 'object-details-content' color='skyblue' name='profile')
            )
          )
        relatedObjectTabs=(array
          (component 'frost-related-object-tab'
            id=selectedTabId
            icon=(hash
              name='network-element'
            )
            text=selectedTabText
            content=(component 'object-details-content' color='coral' name=contentText)
          )
        )
      }}
    `)

    return wait()
      .then(() => {
        expect($hook(detailsRelatedObjectTabHookName)).to.have.length(1)
        expect($hook(detailsRelatedObjectTabHookName, {index: 0}).text().trim()).to.be.equal(selectedTabText)
        expect($hook(detailsRelatedObjectTabHookName, {index: 0}).find('button.active')).to.have.length(1)
        expect($hook(detailsRelatedObjectTabHookName, {index: 0}).find(iconSelector).attr(iconAttributeName)
          .indexOf(`/${defaultSelectedPack}.svg#${defaultSelectedIcon}`)).to.be.gt(-1)

        expect($hook(detailsObjectTabHookName)).to.have.length(1)
        expect($hook(detailsObjectTabHookName).find('.default')).to.have.length(1)

        expect($hook(bodyContentHookName).text().trim()).to.be.equal(`This is ${contentText} template`)
      })
  })

  it('should only a detail tab', function () {
    const selectedTabId = 'profile'
    const defaultTabId = 'profile'
    this.setProperties({
      selectedTabId: selectedTabId,
      defaultTabId: defaultTabId
    })
    this.render(hbs`
      {{frost-object-details
        selectedTabId=selectedTabId
        defaultTabId=defaultTabId
        detailTabs=(array
          (component 'frost-object-tab'
            id=selectedTabId
            text='Profile View'
            content=(component 'object-details-content' color='skyblue' name='profile')
          )
        )
      }}
    `)

    return wait()
      .then(() => {
        expect($hook(detailsObjectTabHookName, {index: 0})).to.have.length(1)
        expect($hook(detailsRelatedObjectTabHookName)).to.have.length(0)
      })
  })

  it('should detail tab and related object tab', function () {
    const selectedTabId = 'profile'
    const defaultTabId = 'profile'
    const tabText = 'Profile View'
    const relatedObjectTabText = 'Devices'
    const iconName = 'network-element'
    this.setProperties({
      selectedTabId: selectedTabId,
      defaultTabId: defaultTabId,
      tabText: tabText,
      relatedObjectTabText: relatedObjectTabText,
      iconName: iconName
    })
    this.render(hbs`
      {{frost-object-details
        selectedTabId=selectedTabId
        defaultTabId=defaultTabId
        detailTabs=(array
          (component 'frost-object-tab'
            id=selectedTabId
            text=tabText
            content=(component 'object-details-content' color='skyblue' name='profile')
          )
        )
        relatedObjectTabs=(array
          (component 'frost-related-object-tab'
            id='devices'
            icon=(hash
              name=iconName
            )
            text=relatedObjectTabText
            content=(component 'object-details-content' color='coral' name='related devices')
          )
        )
      }}
    `)

    return wait()
      .then(() => {
        expect($hook(detailsObjectTabHookName)).to.have.length(1)
        expect($hook(detailsObjectTabHookName, {index: 0}).text().trim()).to.be.equal(tabText)

        expect($hook(detailsRelatedObjectTabHookName, {index: 0})).to.have.length(1)
        expect($hook(detailsRelatedObjectTabHookName, {index: 0}).find(iconSelector).attr(iconAttributeName)
          .indexOf(`/${defaultPack}.svg#${iconName}`)).to.be.gt(-1)
        expect($hook(detailsRelatedObjectTabHookName, {index: 0}).text().trim()).to.be.equal(relatedObjectTabText)
      })
  })

  it('should set content', function () {
    const defaultTabId = 'profile'
    this.setProperties({
      defaultTabId: defaultTabId
    })
    this.render(hbs`
      {{#frost-object-details
        defaultTabId=defaultTabId
        detailTabs=(array
          (component 'frost-object-tab'
            id='profile'
            text='Profile View'
            content=(component 'object-details-content' color='skyblue' name=selectedTabName)
          )
        )
      }}
      test
      {{/frost-object-details}}
    `)

    expect($hook(detailsObjectTabHookName, {index: 0})).to.have.length(1)
    expect($hook('-object-details-content').text().trim()).to.be.equal('test')
  })

  it('should set onChange', function () {
    const defaultTabId = 'profile'
    const props = {
      defaultTabId: defaultTabId,
      onChange: sinon.spy()
    }
    this.setProperties(props)
    this.render(hbs`
      {{#frost-object-details
        onChange=onChange
        defaultTabId=defaultTabId
        detailTabs=(array
          (component 'frost-object-tab'
            id='profile'
            text='Profile View'
            content=(component 'object-details-content' color='skyblue' name=selectedTabName)
          )
        )
      }}
      test
      {{/frost-object-details}}
    `)

    this.$('button').click()

    expect(props.onChange.called).to.equal(true)
    props.onChange.reset()
  })

  it('should set onChange related object tab', function () {
    const props = {
      selectedTabId: 'devices',
      selectedTabType: 'relatedObjectTab',
      defaultTabId: 'profile',
      onChange: sinon.spy()
    }
    this.setProperties(props)
    this.render(hbs`
      {{#frost-object-details
        selectedTabId=selectedTabId
        selectedTabType=selectedTabType
        onChange=onChange
        defaultTabId=defaultTabId
        detailTabs=(array
          (component 'frost-object-tab'
            id='profile'
            text='Profile View'
            content=(component 'object-details-content' color='skyblue' name='profile')
          )
        )
        relatedObjectTabs=(array
          (component 'frost-related-object-tab'
            id='devices'
            icon=(hash
              name='network-construct'
            )
            text='devices'
            content=(component 'object-details-content' color='coral' name='related devices')
          )
        )
      }}
      test
      {{/frost-object-details}}
    `)

    return wait()
      .then(() => {
        this.$('.active.frost-button').click()

        expect(props.onChange.called).to.equal(true)
        props.onChange.reset()
      })
  })
})
