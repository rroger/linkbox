export class Link {
  constructor({id, title, url, notes = '', order = null, completed = false, topic_name = null, topic_id = null }) {
    this.id = id
    this.title = title
    this.url = url
    this.notes = notes
    this.order = order
    this.completed = completed
    this.topicName = topic_name
    this.topicId = topic_id
  }

  htmlId() {
    return `link-id-${this.id}`
  }
}

