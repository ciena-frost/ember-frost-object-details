/*
 This is an example factory definition.

 Create more files in this directory to define additional factories.
 */
import Mirage, {faker} from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  'first-name': faker.name.firstName,
  lastName: faker.name.firstName,
  zipCode: faker.address.zipCode,
  email: function (i) {
    return 'person' + i + '@test.com'
  }
})
