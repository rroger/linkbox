import Vue from 'vue/dist/vue.js'
import _ from 'lodash'
/* eslint-disable no-undef */

import store from '../store'
import { TOAST_TYPE} from '../models/toast'

export class BaseApiService {
  constructor() {
    this.baseUrl = process.env.BASE_API
    this.$http = Vue.http
    this.$store = store
    this.TOAST_TYPE = TOAST_TYPE
    this.errorToast = (message) => this.$store.dispatch('addToast', [this.TOAST_TYPE.ERROR, message])
  }

  fetchAll(url, itemClass) {
    return this.$http.get(url).then(
      (response) => {
        return _.map(response.body['data'], (raw) => {
          return new itemClass(_.extend(raw.attributes, { id: raw.id}))
        })
      },
      (error) => {
        this.errorToast(`Could not load ${url}`)
        return error
      })
  }
}
