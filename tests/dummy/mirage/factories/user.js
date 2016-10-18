import {
  faker,
  Factory
} from 'ember-cli-mirage'

export default Factory.extend({
  'first-name': faker.name.firstName,
  lastName: faker.name.firstName,
  zipCode: faker.address.zipCode,
  email: function (i) {
    return 'person' + i + '@test.com'
  }
})
