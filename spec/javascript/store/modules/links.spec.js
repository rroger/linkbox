import linksModule from '../../../../app/javascript/store/modules/links'
import { Link } from '../../../../app/javascript/models/link'
import * as mocks from '../../mocks/links_mocks'
import {TOAST_TYPE} from '../../../../app/javascript/models/toast'

describe('store/modules/links', () => {
  let state = {
    links: [
      new Link({ completed: true, id: '7', notes: '', order: null, title: 'XYZ', topic_id: 1,
        topic_name: 'Typography', url: 'https://example6.com'}),
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
          new Link({ completed: true, id: '7', notes: '', order: null, title: 'XYZ', topic_id: 1,
            topic_name: 'Typography', url: 'https://example6.com'}),
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

    it('#linksCompleted (ordered by title)', () => {

      expect(linksModule.getters.linksCompleted(state)).toEqual(
        [
          new Link({ completed: true, id: '10', notes: '', order: null, title: 'Example 6', topic_id: 1,
            topic_name: 'Typography', url: 'https://example6.com'}),
          new Link({ completed: true, id: '7', notes: '', order: null, title: 'XYZ', topic_id: 1,
            topic_name: 'Typography', url: 'https://example6.com'})
        ]
      )
    })

    it('#linksCompletedCount', () => {
      const linksCompleted = linksModule.getters.linksCompleted(state)
      const result = linksModule.getters.linksCompletedCount(state, { linksCompleted })

      expect(result).toEqual(2)
    })
  })

  describe('actions', () => {
    describe('#fetchLinks', () => {
      it('commits setLinks on success', (done) => {
        linksModule.linksApiService.$http = mocks.$httpIndexSuccess
        let commit = jest.fn()
        let dispatch = jest.fn()

        linksModule.actions.fetchLinks( { commit, dispatch } ).then(
          () => {
            expect(commit).toHaveBeenCalledWith('SET_LINKS', [
              {'completed': false, 'id': '8', 'notes': 'Some other notes', 'order': null, 'title': 'flexbox',
                'topicId': 4, 'topicName': 'UI Elements', 'topicColor': '#8729b9',
                'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'},
              {'completed': false, 'id': '9', 'notes': 'Hint of Andres', 'order': null, 'title': 'css tricks',
                'topicId': 4, 'topicName': 'UI Elements', 'topicColor': '#8729b9', 'url': 'https://css-tricks.com/'},
              {'completed': true, 'id': '10', 'notes': '', 'order': null, 'title': 'Example 6',
                'topicId': 1, 'topicName': 'Typography', 'topicColor': '#603850', 'url': 'https://example6.com'}
            ])
            done()
          }
        )
      })

      it('dispatches action add Toast on error', (done) => {
        linksModule.linksApiService.$http = mocks.$httpIndexFail
        let commit = jest.fn()
        let dispatch = jest.fn()

        linksModule.actions.fetchLinks( { commit, dispatch } ).then(
          () => {
            expect(dispatch).toHaveBeenCalledWith('addToast', [TOAST_TYPE.ERROR, 'Could not load Links'])
            done()
          }
        )
      })
    })

    describe('#updateLinksToDo', () => {
      it('dispatches updateLink', (done) => {
        linksModule.linksApiService.$http = mocks.$httpUpdateFail
        let commit = jest.fn()
        let dispatch = function(operation, parameter) {
          expect(operation).toEqual('updateLink')
          expect(parameter).toEqual({ id: '8', order: 1 })
          done()
        }

        linksModule.actions.updateLinksToDo({commit, dispatch},
          [
            {'completed': false, 'id': '8', 'notes': 'Some other notes', 'order': 2, 'title': 'flexbox',
              'topicId': 4, 'topicName': 'UI Elements', topicColor: '#8729b9',
              'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}
          ])
      })

      it('does nothing when order did not change', (done) => {
        linksModule.links = state
        linksModule.linksApiService.$http = mocks.$httpUpdateSuccess
        let counter = 0
        let commit = jest.fn()
        let dispatch = function(operation, parameter) {
          expect(operation).toEqual('updateLink')
          if (counter === 0) {
            expect(parameter).toEqual({ id: '8', order: 1})
          } else if (counter === 1 ) {
            expect(parameter).toEqual({ id: '20', order: 2})
            done()
          }
          counter += 1
        }

        linksModule.actions.updateLinksToDo({commit, dispatch},
          [
            {'completed': false, 'id': '8', 'notes': 'Some other notes', 'order': 2, 'title': 'old second',
              'topicId': 4, 'topicName': 'UI Elements', topicColor: '#8729b9',
              'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'},
            {'completed': false, 'id': '20', 'notes': 'Some other notes', 'order': 1, 'title': 'old first',
              'topicId': 4, 'topicName': 'UI Elements', topicColor: '#8729b9',
              'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'},
            {'completed': false, 'id': '25', 'notes': 'Some other notes', 'order': 3, 'title': 'last',
              'topicId': 4, 'topicName': 'UI Elements', topicColor: '#8729b9',
              'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}
          ])
      })
    })

    describe('#updateLink', () => {
      it('commits updateLink on success', (done) => {
        linksModule.linksApiService.$http = mocks.$httpUpdateSuccess
        let dispatch = jest.fn()
        let commit = function(operation, parameter) {
          expect(operation).toEqual('UPDATE_LINK')
          expect(parameter).toEqual(
            new Link({
              id: 88,
              title: 'News',
              url: 'https://a.ch',
              notes: '',
              order: 4,
              completed: false,
              topicName: null,
              topicId: null,
              topicColor: '#a393ac'
            })
          )
          done()
        }

        linksModule.actions.updateLink({commit, dispatch},
          {'completed': false, 'id': '8', 'notes': 'Some other notes', 'order': 2, 'title': 'flexbox',
            'topicId': 4, 'topicName': 'UI Elements',
            'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'
          }
        )
      })

      it('toasts an error', (done) => {
        linksModule.linksApiService.$http = mocks.$httpUpdateFail
        let commit = jest.fn()
        let dispatch = function(operation, parameter) {
          expect(operation).toEqual('addToast')
          expect(parameter).toEqual(['error', 'Could not update Link "flexbox"'])
          done()
        }

        linksModule.actions.updateLink({commit, dispatch},
          {'completed': false, 'id': '8', 'notes': 'Some other notes', 'order': 2, 'title': 'flexbox',
            'topicId': 4, 'topicName': 'UI Elements',
            'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'
          }
        )
      })
    })

    describe('addLink', () => {
      describe('when succeeding', () => {
        it('commits ADD_LINK', (done) => {
          linksModule.linksApiService.$http = mocks.$httpCreateSuccess
          let dispatch = jest.fn()
          let commit = function (operation, parameter) {
            expect(operation).toEqual('ADD_LINK')
            expect(parameter).toEqual(
              new Link({
                id: 2,
                title: 'Types',
                url: 'https://t.ch',
                notes: 'some',
                order: 0,
                topic_id: 2,
                topic_name: 'Architecture',
                topic_color: '#ab2123'
              })
            )
            done()
          }

          linksModule.actions.addLink({commit, dispatch}, mocks.$httpCreateSuccess.newItem)
        })

        it('dispatches addToast', (done) => {
          linksModule.linksApiService.$http = mocks.$httpCreateSuccess
          let commit = jest.fn()
          let dispatch = function (operation, parameter) {
            expect(operation).toEqual('addToast')
            expect(parameter).toEqual([TOAST_TYPE.SUCCESS, 'Successfully added Link "Types"'])
            done()
          }

          linksModule.actions.addLink({commit, dispatch}, mocks.$httpCreateSuccess.newItem)
        })
      })

      describe('when failing', () => {
        it('toasts an error', (done) => {
          linksModule.linksApiService.$http = mocks.$httpCreateFail
          let commit = jest.fn()
          let dispatch = function(operation, parameter) {
            expect(operation).toEqual('addToast')
            expect(parameter).toEqual(['error', 'Could not create Link "flexbox"'])
            done()
          }

          linksModule.actions.addLink({commit, dispatch},
            {'completed': false, 'id': '8', 'notes': 'Some other notes', 'order': 2, 'title': 'flexbox',
              'topicId': 4, 'topicName': 'UI Elements',
              'url': 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'
            }
          )
        })
      })
    })

    describe('#deleteLink', () => {
      describe('when succeeding', () => {
        it('commits REMOVE_LINK', (done) => {
          linksModule.linksApiService.$http = mocks.$httpDeleteSuccess
          let dispatch = jest.fn()
          let commit = function (operation) {
            expect(operation).toEqual('REMOVE_LINK')
            done()
          }

          linksModule.actions.deleteLink({commit, dispatch}, { id: 2 } )
        })

        it('dispatches addToast', (done) => {
          linksModule.linksApiService.$http = mocks.$httpDeleteSuccess
          let commit = jest.fn()
          let dispatch = function (operation, parameter) {
            expect(operation).toEqual('addToast')
            expect(parameter).toEqual([TOAST_TYPE.SUCCESS, 'Successfully deleted Link ID: 2'])
            done()
          }

          linksModule.actions.deleteLink({commit, dispatch}, { id: 2 })
        })
      })

      describe('when failing', () => {
        it('toasts an error', (done) => {
          linksModule.linksApiService.$http = mocks.$httpDeleteFail
          let commit = jest.fn()
          let dispatch = function(operation, parameter) {
            expect(operation).toEqual('addToast')
            expect(parameter).toEqual(['error', 'Could not deleted Link ID: 2'])
            done()
          }

          linksModule.actions.deleteLink({commit, dispatch}, { id: 2 })
        })
      })
    })
  })

  describe('mutations', () => {
    let links

    beforeEach(() => {
      links = [new Link({ id: 2, url: 'https://house.ch', title: 'the house' })]
    })

    describe('#SET_LINKS', () => {
      it('assigns links', () => {
        linksModule.mutations.SET_LINKS(state, links)

        expect(state.links).toEqual(links)
      })
    })

    describe('#ADD_LINK', () => {
      it('adds a link', () => {
        state.links = [
          new Link({ id: 3, title: 'old Link', url: 'https://b.ch' })
        ]
        const newLink = new Link({ id: 1, title: 'new Link', url: 'https://a.ch' })
        linksModule.mutations.ADD_LINK(state, newLink)

        expect(state.links).toEqual([
          new Link({ id: 3, title: 'old Link', url: 'https://b.ch' }),
          new Link({ id: 1, title: 'new Link', url: 'https://a.ch' })
        ])
      })
    })

    describe('#UPDATE_LINK', () => {
      it('updates links', () => {
        state.links = links
        const updatedLink = JSON.parse(JSON.stringify(links[0])) // clone
        updatedLink.order = 400

        linksModule.mutations.UPDATE_LINK(state, updatedLink)

        expect(state.links[0].order).toEqual(400)
      })
    })

    describe('#REMOVES_LINK', () => {
      beforeEach(() => {
        state.links = [
          new Link({ id: 3, title: 'old Link', url: 'https://b.ch' })
        ]
      })

      it('removes a link', () => {
        linksModule.mutations.REMOVE_LINK(state, { id: 3} )

        expect(linksModule.getters.link(state)(3)).toBeFalsy()
        expect(state.links).toEqual([])
      })

      it('does nothing when no valid link is passed', () => {
        linksModule.mutations.REMOVE_LINK(state, { id: 2} )

        expect(linksModule.getters.link(state)(3)).toBeTruthy()
        expect(state.links).toEqual([new Link({ id: 3, title: 'old Link', url: 'https://b.ch' })])
      })
    })
  })
})
