
export function initialize (container, app) {

  let a = {
    name: 'quincy',
    test: function () {
      return true
    }
  }

  app.register('transition:test', a);

 // app.inject()
}

export default {
  name: 'transition',
  initialize
}
