export class Link {
  constructor({id, title, url, notes = '', order = null, completed = false, topic_name = null, topic_id = null }) {
    this.id = id
    this.title = title
    this.url = url
    this.notes = notes
    this.order = order
    this.completed = completed
    this.topic_name = topic_name
    this.topic_id = topic_id
  }
}

