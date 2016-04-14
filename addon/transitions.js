// import { animate, Promise } from "liquid-fire";
export default function () {

  let fromRouteIndex = 0
  let _container = window.App.__container__

  let compareDetailsRouteIndex = function (toRouteName, fromRouteIndex, callback) {
    let toRouteIndex = _container.lookup(`route:${toRouteName}`).get('detailsRouteIndex')
    if (toRouteIndex) {
      return callback(fromRouteIndex, toRouteIndex)
    }
    return false
  }

  let saveFromRouteIndex = function (routeName) {
    let detailsRouteIndex = _container.lookup(`route:${routeName}`).get('detailsRouteIndex')
    if (detailsRouteIndex) {
      fromRouteIndex = detailsRouteIndex
      return true
    }
    return false
  }

  //  Animation rule will trigger when view routes don't have detailsRouteIndex as property.
  this.transition(
    this.toRoute((routeName) => {
      return routeName.indexOf('.views.') >= 0
    }),
    this.use('fade')
  )

  // Animation rule will trigger when both fromRoute and toRoute has detailsRouteIndex as property &&
  // fromRouteIndex < toRouteIndex
  this.transition(
    this.fromRoute((routeName) => {
      return saveFromRouteIndex(routeName)
    }),
    this.toRoute((routeName) => {
      return compareDetailsRouteIndex(routeName, fromRouteIndex, (fromRouteIndex, toRouteIndex) => {
        return fromRouteIndex < toRouteIndex
      })
    }),
    this.use('to-right')
  )

  // Animation rule will trigger when both fromRoute and toRoute has detailsRouteIndex as property &&
  // fromRouteIndex > toRouteIndex
  this.transition(
    this.fromRoute((routeName) => {
      return saveFromRouteIndex(routeName)
    }),
    this.toRoute((routeName) => {
      return compareDetailsRouteIndex(routeName, fromRouteIndex, (fromRouteIndex, toRouteIndex) => {
        return fromRouteIndex > toRouteIndex
      })
    }),
    this.use('to-left')
  )

  // Animation rule will trigger when transition to related routes
  this.transition(
    this.toRoute((routeName) => {
      return routeName.indexOf('.related') >= 0
    }),
    this.use('to-up')
  )

  // Animation rule will trigger when transition from related routes to views routes
  this.transition(
    this.fromRoute((routeName) => {
      return routeName.indexOf('.related') >= 0
    }),
    this.toRoute((routeName) => {
      return routeName.indexOf('.views') >= 0
    }),
    this.use('to-down')
  )
}
