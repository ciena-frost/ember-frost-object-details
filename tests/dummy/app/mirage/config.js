export default function () {
  this.passthrough()

  this.get('/users', function (schema) {
    return {
      data: schema.db['users'].map((attrs) => {
        return {
          type: 'user',
          id: attrs.id,
          attributes: attrs
        }
      })
    }
  })

  this.get('/users/:id', function (schema, request) {
    let match = schema.db['users'].find(request.params.id)
    return {
      data: {
        type: 'user',
        id: match.id,
        attributes: match
      }
    }
  })

  this.get('/friends/:id', function (schema, request) {
    let match = schema.db['friends'].find(request.params.id)
    return {
      data: {
        type: 'friend',
        id: match.id,
        attributes: match
      }
    }
  })
}
