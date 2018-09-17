export const $httpIndexSuccess = {
  get(){
    return Promise.resolve({
      body: {
        'data': [
          {'id':'55','type':'topic','attributes':{'name':'One mores'}},
          {'id':'52','type':'topic','attributes':{'name':'So goodOk'}},
          {'id':'111','type':'topic','attributes':{'name':'Totaly New Topic'}},
          {'id':'112','type':'topic','attributes':{'name':'Typography'}}
        ]
      }
    })
  }
}

export const $httpIndexFail = {
  get(){
    return Promise.reject({ body: { 'data': 'internal server error' } })
  }
}
