// import { animate, Promise } from "liquid-fire";

export default function () {

  this.transition(
    this.toRoute((routeName) => {
      return routeName.indexOf('related') >= 0
    }),
    this.use('to-up'),
    this.debug()
  );

  this.transition(
    this.fromRoute((routeName) => {

      debugger;
      return routeName.indexOf('related') >= 0
    }),
    this.toRoute((routeName) => {
      return routeName.indexOf('views') >= 0
    }),
    this.use('to-down'),
    this.debug()
  );

  //this.transition(
  //  this.fromRoute(['details.related.network', 'details.related.service', 'details.related.tenant']),
  //  this.use('to-down')
  //)
  //
  //this.transition(
  //  this.toRoute(['details.related.network', 'details.related.service', 'details.related.tenant']),
  //  this.use('to-up')
  //)

  //this.transition(
  //  this.fromRoute('details.views.maps'),
  //  this.toRoute('details.views.lines'),
  //  this.use('to-right'),
  //  this.debug()
  //)
}
