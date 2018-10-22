import axios from 'axios'
/* eslint-disable no-undef */

export class BaseApiService {
  constructor() {
    this.baseURL = process.env.BASE_API
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

  createObject({attributes, id}, Klass) {
    return new Klass({...attributes, id: id })
  }
}
