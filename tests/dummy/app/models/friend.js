import DS from 'ember-data'

export default DS.Model.extend({
  'first-name': DS.attr('string'),
  'lastName': DS.attr('string'),
  'zipCode': DS.attr('string'),
  'email': DS.attr('string')
})
