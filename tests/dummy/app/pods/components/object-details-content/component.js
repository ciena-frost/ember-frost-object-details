import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import layout from './template'

export default Component.extend({
  layout,
  @readOnly
  @computed('color')
  colorStyle (color) {
    const style = [
      `background-color:${color}`,
      'height: 200px'
    ]
      .join(';')
    return Ember.String.htmlSafe(style)
  }
})
