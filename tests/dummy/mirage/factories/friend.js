import {Factory, faker} from 'ember-cli-mirage'

export default Factory.extend({
  'first-name': faker.name.firstName,
  lastName: faker.name.firstName,
  zipCode: faker.address.zipCode,
  email: function (i) {
    return 'friend_' + i + '@test.com'
  }
})
