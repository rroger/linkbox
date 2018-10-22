import Vue from 'vue/dist/vue.js'
/* eslint-disable no-undef */

export class BaseApiService {
  constructor() {
    this.baseUrl = process.env.BASE_API
    this.$http = Vue.http
  }

  fetchAll(url, Klass) {
    return this.$http.get(url).then(
      (response) => {
        return this.createObjectsFromResponse(response, Klass)
      }
    )
  }

  createObjectsFromResponse(response, Klass) {
    const data = response.body.data
    if (Array.isArray(response.body.data)) {
      return data.map((raw) => {
        return this.createObject(raw, Klass)
      })
    } else {
      return this.createObject(data, Klass)
    }
  }

  createObject({attributes, id}, Klass) {
    return new Klass({...attributes, id: id })
  }
}
