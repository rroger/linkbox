export const $httpIndexSuccess = {
  get() {
    return Promise.resolve({
      data: {
        'data':[
          { 'id': '8',
            'type': 'link',
            'attributes': {
              'title': 'flexbox','url':'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
              'notes': 'Some other notes',
              'order': null,
              'completed': false,
              'topic_name': 'UI Elements',
              'topic_id': 4,
              'topic_color': '#8729b9'
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
              'topic_id': 4,
              'topic_color': '#8729b9'
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
              'topic_id': 1,
              'topic_color': '#603850'
            }
          }
        ]
      }
    })
  }
}

export const $httpIndexFail = {
  get() {
    return Promise.reject({ data: { 'data': 'internal server error' } })
  }
}

export const $httpUpdateSuccess = {
  put() {
    return Promise.resolve({
      data: {
        data: {
          id: 88,
          type :'link',
          attributes: {
            title: 'News',
            url: 'https://a.ch',
            order: 4
          }
        },
      }
    })
  }
}

export const $httpUpdateFail = {
  put() {
    return Promise.reject({ data: { 'data': 'internal server error' } })
  }
}


export const $httpCreateSuccess = {
  newItem: { title: 'Types', url: 'https://t.ch', topicId: 2, notes: 'some' },
  post() {
    return Promise.resolve({
      data: {
        data: {
          id: 2,
          type: 'link',
          attributes: {
            title: 'Types',
            url: 'https://t.ch',
            notes: 'some',
            order: 0,
            topic_id: 2,
            topic_name: 'Architecture',
            topic_color: '#ab2123'
          }
        }
      }
    })
  }
}

export const $httpCreateFail = {
  post() {
    return Promise.reject({ data: { 'data': 'internal server error' } })
  }
}

export const $httpDeleteSuccess = {
  delete() {
    return Promise.resolve()
  }
}

export const $httpDeleteFail = {
  delete() {
    return Promise.reject({ data: { 'data': 'internal server error' } })
  }
}
