import linksModule from '../../../../app/javascript/store/modules/links'
import {Link} from '../../../../app/javascript/models/link'


const state = {
  links: [
    new Link({ completed: false, id: '8', notes: 'Some other notes', order: null, title: 'flexbox', topic_id: 4,
      topic_name: 'UI Elements', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
    new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: null, title: 'css tricks',
      topic_id: 4, topic_name: 'UI Elements', url: 'https://css-tricks.com/'}),
    new Link({ completed: true, id: '10', notes: '', order: null, title: 'Example 6', topic_id: 1,
      topic_name: 'Typography', url: 'https://example6.com'})
  ]
}

describe('getters', () => {
  it('#links', () => {
    const result = linksModule.getters.links(state)

    expect(result).toEqual(
      [
        new Link({ completed: false, id: '8', notes: 'Some other notes', order: null, title: 'flexbox', topic_id: 4,
          topic_name: 'UI Elements', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
        new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: null, title: 'css tricks',
          topic_id: 4, topic_name: 'UI Elements', url: 'https://css-tricks.com/'}),
        new Link({ completed: true, id: '10', notes: '', order: null, title: 'Example 6', topic_id: 1,
          topic_name: 'Typography', url: 'https://example6.com'})
      ]
    )
  })

  it('#linksToDo', () => {
    const result = linksModule.getters.linksToDo(state)

    expect(result).toEqual(
      [
        new Link({ completed: false, id: '8', notes: 'Some other notes', order: null, title: 'flexbox', topic_id: 4,
          topic_name: 'UI Elements', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
        new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: null, title: 'css tricks',
          topic_id: 4, topic_name: 'UI Elements', url: 'https://css-tricks.com/'}),
      ]
    )
  })

  it('#linksToDoCount', () => {
    const linksToDo = linksModule.getters.linksToDo(state)
    const result = linksModule.getters.linksToDoCount(state, { linksToDo })

    expect(result).toEqual(2)
  })

  it('#linksCompleted', () => {
    const result = linksModule.getters.linksCompleted(state)

    expect(result).toEqual(
      [
        new Link({ completed: true, id: '10', notes: '', order: null, title: 'Example 6', topic_id: 1,
          topic_name: 'Typography', url: 'https://example6.com'})
      ]
    )
  })

  it('#linksCompletedCount', () => {
    const linksCompleted = linksModule.getters.linksCompleted(state)
    const result = linksModule.getters.linksCompletedCount(state, { linksCompleted })

    expect(result).toEqual(1)
  })
})
