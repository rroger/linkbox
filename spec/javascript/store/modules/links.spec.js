import linksModule from '../../../../app/javascript/store/modules/links'
import { Link } from '../../../../app/javascript/models/link'
import * as mocks from '../../mocks/links_mocks'
import {TOAST_TYPE} from '../../../../app/javascript/models/toast'

describe('store/modules/links', () => {
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

  describe('actions', () => {
    describe('#fetchLinks', () => {
      it('commits setLinks on success', (done) => {
        linksModule.linksApiService().$http = mocks.$httpIndexSuccess
        let commit = jest.fn()
        let dispatch = jest.fn()

        linksModule.actions.fetchLinks( { commit, dispatch } ).then(
          () => {
            expect(commit).toHaveBeenCalledWith('setLinks', [
              {'completed': false, 'id': '8', 'notes': 'Some other notes', 'order': null, 'title': 'flexbox',
                'topicId': 4, 'topicName': 'UI Elements',
                'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'},
              {'completed': false, 'id': '9', 'notes': 'Hint of Andres', 'order': null, 'title': 'css tricks',
                'topicId': 4, 'topicName': 'UI Elements', 'url': 'https://css-tricks.com/'},
              {'completed': true, 'id': '10', 'notes': '', 'order': null, 'title': 'Example 6',
                'topicId': 1, 'topicName': 'Typography', 'url': 'https://example6.com'}
            ])
            done()
          }
        )
      })

      it('dispatches action add Toast on error', (done) => {
        linksModule.linksApiService().$http = mocks.$httpIndexFail
        let commit = jest.fn()
        let dispatch = jest.fn()

        linksModule.actions.fetchLinks( { commit, dispatch } ).then(
          () => {
            expect(dispatch).toHaveBeenCalledWith('addToast', [TOAST_TYPE.ERROR, 'Could not load Links'])
            done()
          }
        )
      })

      it('sets loading to true and false', (done) => {
        linksModule.linksApiService().$http = mocks.$httpIndexFail
        let commit = jest.fn()
        let dispatch = jest.fn()

        linksModule.actions.fetchLinks({commit, dispatch}).finally(
          () => {
            expect(commit).toHaveBeenCalledWith('setLoading', true)
            expect(commit).toHaveBeenCalledWith('setLoading', false)
            done()
          }
        )
      })
    })

    describe('#updateLinksToDo', () => {

    })
  })

  describe('mutations', () => {
    describe('#setLinks', () => {

    })

    describe('#updateLink', () => {

    })

    describe('#setLoading', () => {

    })
  })
})
