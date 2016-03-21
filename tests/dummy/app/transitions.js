// import { animate, Promise } from "liquid-fire";

export default function () {
  this.transition(
    this.toRoute(['details.primary.maps', 'details.primary.lines']),
    this.use('to-left')
  )

  this.transition(
    this.fromRoute(['details.secondary.network', 'details.secondary.service', 'details.secondary.tenant']),
    this.use('to-down')
  )

  this.transition(
    this.toRoute(['details.secondary.network', 'details.secondary.service', 'details.secondary.tenant']),
    this.use('to-up')
  )

  this.transition(
    this.fromRoute('details.primary.maps'),
    this.toRoute('details.primary.lines'),
    this.use('to-right')
  )
}
