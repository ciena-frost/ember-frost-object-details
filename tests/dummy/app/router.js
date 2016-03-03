import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function () {
  this.route('demo', { path: '/' })
  this.route('details', {path: '/details/:user_id'}, function () {
    this.route('sub1')
    this.route('sub2')
    this.route('service')
    this.route('network')
    this.route('tenant')
  })
})

export default Router
