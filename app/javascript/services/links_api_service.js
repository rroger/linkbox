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
        const raw = response.body['data']
        return new Link(Object.assign(raw['attributes'], { id: raw['id']}))
      },
      (error) => {
        this.errorToast(`Could not update ${link.title}`)
        return error
      })
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

