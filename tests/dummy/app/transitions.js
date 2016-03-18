// import { animate, Promise } from "liquid-fire";

export default function () {
  this.transition(
    this.toRoute(['details.maps', 'details.details']),
    this.use('to-left')
  )

  this.transition(
    this.fromRoute(['details.network', 'details.service', 'details.tenant']),
    this.use('to-down')
  )

  this.transition(
    this.toRoute(['details.network', 'details.service', 'details.tenant']),
    this.use('to-up')
  )

  this.transition(
    this.fromRoute('details.maps'),
    this.toRoute('details.details'),
    this.use('to-right')
  )
}
