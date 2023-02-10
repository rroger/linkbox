import axios from 'axios'
/* eslint-disable no-undef */

export class BaseApiService {
  constructor() {
    this.baseURL = '/api/v1'
    // this.baseURL = process.env.BASE_API || '/api/v1'
    this.$http = axios.create({baseURL: this.baseURL})
  }

  fetchAll(path, Klass) {
    return this.$http.get(path).then(
      (response) => {
        return this.createObjectsFromResponse(response, Klass)
      }
    )
  }

  createObjectsFromResponse(response, Klass) {
    const data = response.data.data
    if (Array.isArray(data)) {
      return data.map((raw) => {
        return this.createObject(raw, Klass)
      })
    } else {
      return this.createObject(data, Klass)
    }
  }

  createObject({attributes, id}, klass) {
    if (!attributes || !id || Object.keys(attributes).length === 0) {
      throw new TypeError('Invalid Parameters')
    }
    return new klass({...attributes, id: id })
  }
}
