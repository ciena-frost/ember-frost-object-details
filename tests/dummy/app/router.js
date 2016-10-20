import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})
Router.map(function () {
  this.route('demo', { path: '/' }, function () {
    this.route('overview', { path: '/' })
    // Building blocks
    this.route('content')
    this.route('default-tab')
    this.route('selected-tab')
    this.route('query-params')
    // Object details components
    this.route('object-tab')
    this.route('related-object-tab')
    // Tests
    this.route('hook')
  })
})

export default Router
