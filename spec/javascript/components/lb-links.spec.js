import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import LbLinks from '../../../app/javascript/components/lb-links.vue'
import { Link } from '../../../app/javascript/models/link'
import * as mocks from '../mocks/links_mocks'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('lb-links.vue', () => {
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      fetchLinks: jest.fn(),
      updateLinksToDo: jest.fn()
    }
    getters = {
      links: jest.fn(),
      linksToDo: jest.fn(),
      linksToDoCount: jest.fn(),
      linksCompleted: jest.fn(),
      linksCompletedCount: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        links: {
          state: {
            links: [
              new Link({ completed: false, id: '8', notes: 'Some other notes', order: null, title: 'flexbox', topic_id: 4,
                topic_name: 'UI Elements', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
              new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: null, title: 'css tricks',
                topic_id: 4, topic_name: 'UI Elements', url: 'https://css-tricks.com/'}),
              new Link({ completed: true, id: '10', notes: '', order: null, title: 'Example 6', topic_id: 1,
                topic_name: 'Typography', url: 'https://example6.com'})
            ]
          },
          getters,
          actions
        }
      }
    })
  })

  describe('#created', () => {
    beforeEach(() => {
      shallowMount(LbLinks, { store, localVue,
        mocks: {
          $http: mocks.$httpIndexSuccess
        }
      })
    })

    it('calls fetchLinks()', () => {
      expect(actions.fetchLinks).toHaveBeenCalled()
    })

    it('calls linksToDoCount', () => {
      expect(getters.linksToDoCount).toHaveBeenCalled()
    })

    it('calls linksToDo', () => {
      expect(getters.linksToDo).toHaveBeenCalled()
    })

    it('calls linksCompleted', () => {
      expect(getters.linksCompleted).toHaveBeenCalled()
    })
  })

  describe('#toggleShowCompleted', () => {
    it('toggles showCompletedSection', () => {
      const wrapper = shallowMount(LbLinks, {
        store, localVue,
      })
      wrapper.vm.toggleShowCompleted()

      expect(wrapper.vm.showCompletedSection).toBeTruthy()
    })
  })
})
