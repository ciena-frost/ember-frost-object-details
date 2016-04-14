import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})
Router.map(function () {
  this.route('demo', { path: '/' })
  this.route('details', {path: '/details/:user_id'}, function () {
    this.route('views', function () {
      this.route('profile')
      this.route('preferences')
      this.route('details')
    })
    this.route('related', function () {
      this.route('devices')
      this.route('friends', {path: '/details/:friend_id'})
      this.route('subscriptions')
    })
  })
})

export default Router
