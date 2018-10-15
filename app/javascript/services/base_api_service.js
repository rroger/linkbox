import Vue from 'vue/dist/vue.js'
/* eslint-disable no-undef */

export class BaseApiService {
  constructor() {
    this.baseUrl = process.env.BASE_API
    this.$http = Vue.http
  }

  fetchAll(url, itemClass) {
    return this.$http.get(url).then(
      (response) => {
        return response.body['data'].map((raw) => {
          return new itemClass(Object.assign(raw.attributes, { id: raw.id}))
        })
      },
      (error) => {
        throw(error)
      }
    )
  }
}
