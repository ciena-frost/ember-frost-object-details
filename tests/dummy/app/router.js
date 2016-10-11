import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})
Router.map(function () {
  this.route('demo', { path: '/' })
  this.route('details', {path: '/details/:user_id'}, function () {
    this.route('views')
  })
})

export default Router
