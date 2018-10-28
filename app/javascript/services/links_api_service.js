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

  createLink(newLink) {
    if (!newLink) { throw 'Exception: no link to update' }
    return this.$http.post(this.path, this.linkParams(newLink)).then(
      (response) => {
        return this.createObjectsFromResponse(response, Link)
      }
    )
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

  deleteLink(link) {
    if (!(link && link.id)) { throw 'Exception: no link to delete' }
    return this.$http.delete(`${this.path}/${link.id}`).then(() => {
      return true
    })
  }

  linkParams(link) {
    const params = {
      data: {
        type: 'link',
        attributes: { ...link }
      }
    }
    if (link.id) {
      params.data.id = link.id
      delete params.data.attributes.id
    }
    if (link.topicId) {
      params.data.attributes.topic_id = link.topicId
      delete params.data.attributes.topicId
    }
    return params
  }

  // helpers

  linkIdentifier(link) {
    let linkIdentifier = ''
    if (link && link.title) {
      linkIdentifier = `"${link.title}"`
    } else if (link && link.id) {
      linkIdentifier = `ID: ${link.id}`
    }
    return linkIdentifier
  }
}

