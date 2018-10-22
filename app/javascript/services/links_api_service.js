import { BaseApiService } from './base_api_service'
import { Link } from '../models/link'

export class LinksApiService extends BaseApiService {
  constructor() {
    super()
    this.url = `${this.baseUrl}/links`
  }

  fetchLinks() {
    return this.fetchAll(this.url, Link)
  }

  updateLink(link) {
    if (!(link && link.id)) { throw 'Exception: no link to update' }
    const params = this.linkParams(link)
    return this.$http.put(`${this.url}/${link.id}`, params).then(
      (response) => {
        return this.createObjectsFromResponse(response, Link)
      }
    )
  }

  linkParams(link) {
    const params = {
      data: {
        type: 'link',
        attributes: {}
      }
    }
    Object.assign(params.data.attributes, link)
    if (link.id) {
      params.id = link.id
    }
    return params
  }
}

