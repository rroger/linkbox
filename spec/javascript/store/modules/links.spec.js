import linksModule from '../../../../app/javascript/store/modules/links'
import { Link } from '../../../../app/javascript/models/link'
import { LinksApiService } from '../../../../app/javascript/services/links_api_service'
import * as mocks from '../../mocks/links_mocks'
import {TOAST_TYPE} from '../../../../app/javascript/models/toast'

describe('store/modules/links', () => {
  const state = {
    links: [
      new Link({ completed: false, id: '8', notes: 'Some other notes', order: 10, title: 'flexbox', topic_id: 4,
        topic_name: 'UI Elements', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
      new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: 2, title: 'css tricks',
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
          new Link({ completed: false, id: '8', notes: 'Some other notes', order: 10, title: 'flexbox', topic_id: 4,
            topic_name: 'UI Elements', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
          new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: 2, title: 'css tricks',
            topic_id: 4, topic_name: 'UI Elements', url: 'https://css-tricks.com/'}),
          new Link({ completed: true, id: '10', notes: '', order: null, title: 'Example 6', topic_id: 1,
            topic_name: 'Typography', url: 'https://example6.com'})
        ]
      )
    })

    it('#linksToDo (ordered by order)', () => {
      const result = linksModule.getters.linksToDo(state)

      expect(result).toEqual(
        [
          new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: 2, title: 'css tricks',
            topic_id: 4, topic_name: 'UI Elements', url: 'https://css-tricks.com/'}),
          new Link({ completed: false, id: '8', notes: 'Some other notes', order: 10, title: 'flexbox', topic_id: 4,
            topic_name: 'UI Elements', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),

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
      it('commits updateLink on success', (done) => {
        linksModule.linksApiService().$http = mocks.$httpUpdateSuccess
        let dispatch = jest.fn()
        let commit = function(operation, parameter) {
          expect(operation).toEqual('updateLink')
          expect(parameter).toEqual(
            {
              completed: false,
              id: '8',
              notes: 'Some other notes',
              order: 0,
              title: 'flexbox',
              topicId: 4,
              topicName: 'UI Elements',
              url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'
            }
          )
          done()
        }

        linksModule.actions.updateLinksToDo({commit, dispatch},
          [
            {'completed': false, 'id': '8', 'notes': 'Some other notes', 'order': 2, 'title': 'flexbox',
              'topicId': 4, 'topicName': 'UI Elements',
              'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}
          ])
      })

      it('dispatches addToast on error', (done) => {
        linksModule.linksApiService().$http = mocks.$httpUpdateFail
        let commit = jest.fn()
        let dispatch = function(operation, parameter) {
          expect(operation).toEqual('addToast')
          expect(parameter).toEqual([TOAST_TYPE.ERROR, 'Could not update flexbox'])
          done()
        }

        linksModule.actions.updateLinksToDo({commit, dispatch},
          [
            {'completed': false, 'id': '8', 'notes': 'Some other notes', 'order': 2, 'title': 'flexbox',
              'topicId': 4, 'topicName': 'UI Elements',
              'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}
          ])
      })
    })
  })

  describe('mutations', () => {
    let state
    let links

    beforeEach(() => {
      state = {}
      links = [new Link({ id: 2, url: 'https://house.ch', title: 'the house' })]
    })

    describe('#setLinks', () => {
      it('assigns links', () => {
        linksModule.mutations.setLinks(state, links)

        expect(state.links).toEqual(links)
      })
    })

    describe('#updateLink', () => {
      it('updates links', () => {
        state.links = links
        const updatedLink = JSON.parse(JSON.stringify(links[0])) // clone
        updatedLink.order = 400

        linksModule.mutations.updateLink(state, updatedLink)

        expect(state.links[0].order).toEqual(400)
      })
    })

    describe('#setLoading', () => {
      it('sets loading to true', () => {
        linksModule.mutations.setLoading(state, true)

        expect(state.loading).toBeTruthy()
      })

      it('sets loading to false', () => {
        linksModule.mutations.setLoading(state, false)

        expect(state.loading).toBeFalsy()
      })
    })
  })

  describe('#linksApiService()', () => {
    it('returns a LinksApiService', () => {
      expect(linksModule.linksApiService()).toBeInstanceOf(LinksApiService)
    })

    it('returns the same instance of LinksApiService', () => {
      const firstInstance = linksModule.linksApiService()
      const secondInstance = linksModule.linksApiService()

      expect(firstInstance).toBe(secondInstance)
    })
  })
})
