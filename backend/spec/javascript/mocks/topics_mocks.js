export const $httpIndexSuccess = {
  get() {
    return Promise.resolve({
      body: {
        'data': [
          {'id':'55','type':'topic','attributes':{'name':'One mores', 'color': '#4dbea7'}},
          {'id':'52','type':'topic','attributes':{'name':'So goodOk', 'color': '#c6f98a'}},
          {'id':'111','type':'topic','attributes':{'name':'Totaly New Topic', 'color': '#f6c98a' }},
          {'id':'112','type':'topic','attributes':{'name':'Typography', 'color': '#3614fa' }}
        ]
      }
    })
  }
}

export const $httpIndexSuccessAxios = {
  get() {
    return Promise.resolve({
      data: {
        'data': [
          {'id':'55','type':'topic','attributes':{'name':'One mores', 'color': '#4dbea7'}},
          {'id':'52','type':'topic','attributes':{'name':'So goodOk', 'color': '#c6f98a'}},
          {'id':'111','type':'topic','attributes':{'name':'Totaly New Topic', 'color': '#f6c98a' }},
          {'id':'112','type':'topic','attributes':{'name':'Typography', 'color': '#3614fa' }}
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

export const $httpIndexFailAxios = {
  get() {
    return Promise.reject({ data: { 'data': 'internal server error' } })
  }
}

export const $httpCreateSuccess = {
  post() {
    return Promise.resolve({
      body: {
        'data': {'id':'88','type':'topic','attributes':{'name':'Newly Created Topic'}},
      }
    })
  }
}

export const $httpCreateFail = {
  post() {
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

export const $httpDeleteSuccess = {
  delete() {
    return Promise.resolve({})
  }
}

export const $httpDeleteFail = {
  delete() {
    return Promise.reject({ body: { 'data': 'internal server error' } })
  }
}
