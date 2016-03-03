// import { animate, Promise } from "liquid-fire";

export default function () {
  this.transition(
    this.toRoute('details.network'),
    this.use('to-up')
  );

  this.transition(
    this.toRoute('details.service'),
    this.use('to-up')
  );

  this.transition(
    this.hasClass('main-container'),
    this.use('toUp')
  );



}
