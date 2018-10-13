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
}

