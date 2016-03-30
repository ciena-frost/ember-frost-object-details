export default function () {
  this.passthrough()

  this.get('/users', function (db) {
    return {
      data: db['users'].map((attrs) => {
        return {
          type: 'user',
          id: attrs.id,
          attributes: attrs
        }
      })
    }
  })

  this.get('/users/:id', function (db, request) {
    let match = db['users'].find(request.params.id)
    return {
      data: {
        type: 'user',
        id: match.id,
        attributes: match
      }
    }
  })
}
