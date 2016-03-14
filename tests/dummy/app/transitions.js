// import { animate, Promise } from "liquid-fire";

export default function () {
  this.transition(
    this.toRoute('details.maps'),
    this.use('to-left')
  )

  this.transition(
    this.toRoute('details.details'),
    this.use('to-right')
  )

  this.transition(
    this.fromRoute('details.network'),
    this.use('to-down')
  )

  this.transition(
    this.fromRoute('details.service'),
    this.use('to-down')
  )

  this.transition(
    this.fromRoute('details.tenant'),
    this.use('to-down')
  )

  this.transition(
    this.toRoute('details.network'),
    this.use('to-up')
  )

  this.transition(
    this.toRoute('details.service'),
    this.use('to-up')
  )

  this.transition(
    this.toRoute('details.tenant'),
    this.use('to-up')
  )

  this.transition(
    this.fromRoute('details.maps'),
    this.toRoute('details.details'),
    this.use('to-right')
  )
}
