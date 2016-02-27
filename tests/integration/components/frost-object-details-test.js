import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-object-details',
  'Integration: EmberFrostObjectDetailsComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function (val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-object-details}}
      //     template content
      //   {{/frost-object-details}}
      // `)

      this.render(hbs`{{frost-object-details}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
