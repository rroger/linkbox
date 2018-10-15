export const $httpIndexSuccess = {
  get() {
    return Promise.resolve({
      body: {
        'data':[
          { 'id': '8',
            'type': 'link',
            'attributes': {
              'title': 'flexbox','url':'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
              'notes': 'Some other notes',
              'order': null,
              'completed': false,
              'topic_name': 'UI Elements',
              'topic_id': 4
            }
          },
          { 'id': '9',
            'type': 'link',
            'attributes': {
              'title': 'css tricks',
              'url': 'https://css-tricks.com/',
              'notes': 'Hint of Andres',
              'order': null,
              'completed': false,
              'topic_name': 'UI Elements',
              'topic_id': 4
            }
          },
          { 'id': '10',
            'type': 'link',
            'attributes': {
              'title': 'Example 6',
              'url':'https://example6.com',
              'notes':'',
              'order': null,
              'completed': true,
              'topic_name': 'Typography',
              'topic_id': 1
            }
          }
        ]
      }
    })
  }
}

export const $httpIndexFail = {
  get() {
    return Promise.reject({ body: { 'data': 'internal server error' } })
  }
}

export const $httpUpdateSuccess = {
  put() {
    return Promise.resolve({
      body: {
        'data': {'id':'88','type':'topic','attributes':{'name':'Newly Edited Topic'}},
      }
    })
  }
}

export const $httpUpdateFail = {
  put() {
    return Promise.reject({ body: { 'data': 'internal server error' } })
  }
}

