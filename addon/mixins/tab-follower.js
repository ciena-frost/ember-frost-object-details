import Ember from 'ember'
import _ from 'lodash'

export default Ember.Mixin.create({
  didInsertElement () {
    this._super(...arguments)
    this.initFollower()
  },

  /**
   * Initializes the link follower.
   *
   * @function initFollower
   */
  initFollower () {
    let follower = Ember.$('.frost-view-follower')
    if (this._isDOMExist(follower)) {
      let isViewRoute = this.get('isViewRouteActivated')
      this._updateFollowerClass(follower, isViewRoute)
      Ember.run.scheduleOnce('afterRender', this, this._animateFollower, follower, false)
    }
  },

  /**
   * Updates and resizes the link follower to match the currently active view link
   * or default view link.
   *
   * @param {boolean} animate - whether or not follower should be animated
   */
  updateFollower (animate) {
    let follower = Ember.$('.frost-view-follower')
    if (this._isDOMExist(follower)) {
      let isViewRoute = this.get('isViewRouteActivated')
      this._updateFollowerClass(follower, isViewRoute)
      if (isViewRoute) {
        Ember.run.scheduleOnce('afterRender', this, this._animateFollower, follower, animate)
      }
    }
  },

  /**
   * Attaches 'active' class to link follower when currently active link is view route.
   * Removes it when currently active link is related route.
   *
   * @param {Object} follower - Jquery Object
   * @param {boolean} isViewRoute - whether or not current active link is view route
   * @private
   */
  _updateFollowerClass (follower, isViewRoute) {
    if (isViewRoute) {
      if (!follower.hasClass('active')) follower.addClass('active')
    } else {
      follower.removeClass('active')
    }
  },

  /**
   * Calculates width and position of the active link.
   *
   * @returns {Object} - link DOM width / position
   * @private
   */
  _calFollowerGeography () {
    let targetLink = this._targetLinkForFollower()
    let linkPosition = this._getDOMPosition(targetLink)
    let linkWidth = this._getDOMWidth(targetLink)
    return {
      width: linkWidth,
      left: linkPosition.left
    }
  },

  /**
   * Animates link follower to its final width / position if necessary.
   *
   * @param {Object} follower - Jquery Object
   * @param {boolean} animation - whether or not follower should be animated
   * @private
   */
  _animateFollower (follower, animation = true) {
    let followerGeography = this._calFollowerGeography()
    if (animation) {
      follower.animate(followerGeography, 300)
    } else {
      follower.css(followerGeography)
    }
  },

  /**
   * Gets the link DOM which the follower will attach to
   *
   * @returns {Object} - target link DOM
   * @private
   */
  _targetLinkForFollower () {
    let isViewRoute = this.get('isViewRouteActivated')
    if (isViewRoute) {
      return this._getActiveLink()
    } else {
      let defaultRoute = this.get('defaultRoute')
      let targetKey = defaultRoute.split('.').pop()
      let links = Ember.$('.frost-view-detail')
      let targetLink = _.find(links, (link) => {
        let href = link.getAttribute('href')
        if (href.indexOf(targetKey) > -1) return true
      })
      return Ember.$(targetLink)
    }
  },

  _isDOMExist (jqueryElement) {
    return jqueryElement.length
  },

  _getActiveLink () {
    return Ember.$('.frost-link.active') || Ember.$('.frost-link.is-selected')
  },

  _getDOMPosition (element) {
    if (element) return element.position()
  },

  _getDOMWidth (element) {
    if (element) return element.outerWidth()
  }
})
