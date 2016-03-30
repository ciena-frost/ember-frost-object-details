import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})
Router.map(function () {
  this.route('demo', { path: '/' })
  this.route('details', {path: '/details/:user_id'}, function () {
    this.route('views', function () {
      this.route('maps')
      this.route('lines')
    })
    this.route('related', function () {
      this.route('service')
      this.route('network')
      this.route('tenant')
    })
  })
})

export default Router
