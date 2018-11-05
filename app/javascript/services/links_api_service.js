import { BaseApiService } from './base_api_service'
import { Link } from '../models/link'

export class LinksApiService extends BaseApiService {
  constructor() {
    super()
    this.path = 'links'
  }

  fetchLinks() {
    return this.fetchAll(this.path, Link)
  }

  updateLink(link) {
    if (!(link && link.id)) { throw 'Exception: no link to update' }
    const params = this.linkParams(link)
    return this.$http.put(`${this.path}/${link.id}`, params).then(
      (response) => {
        return this.createObjectsFromResponse(response, Link)
      }
    )
  }

  linkParams(link) {
    const params = {
      data: {
        type: 'link',
        attributes: link
      }
    }
    if (link.id) {
      params.id = link.id
    }
    return params
  }
}

