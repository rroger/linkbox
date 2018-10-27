import Vuex from 'vuex'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
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
                topic_name: 'UI Elements', topic_color: '#8729b9', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
              new Link({ completed: false, id: '9', notes: 'Hint of Andres', order: null, title: 'css tricks',
                topic_id: 4, topic_name: 'UI Elements', topic_color: '#8729b9', url: 'https://css-tricks.com/'}),
              new Link({ completed: true, id: '10', notes: '', order: null, title: 'Example 6', topic_id: 1,
                topic_name: 'Typography', topic_color: '#603850', url: 'https://example6.com'})
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
      mount(LbLinks, { store, localVue,
        mocks: {
          $http: mocks.$httpIndexSuccess,
          $route: { params: {} }
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
      const wrapper = mount(LbLinks, { store, localVue,
        mocks: {
          $http: mocks.$httpIndexSuccess,
          $route: { params: {} }
        }
      })
      wrapper.vm.toggleShowCompleted()

      expect(wrapper.vm.showCompletedSection).toBeTruthy()
    })
  })

  describe('#showLinkForm', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(LbLinks, { store, localVue,
        mocks: {
          $http: mocks.$httpIndexSuccess,
          $route: { params: { additional: '' } }
        }
      })
    })

    it('returns true for "new" as url param', () => {
      wrapper.vm.$route.params.additional = 'new'

      expect(wrapper.vm.showLinkForm()).toBeTruthy()
    })

    it('returns true for id with "edit" as url param', () => {
      wrapper.vm.$route.params.id = 1
      wrapper.vm.$route.params.additional = 'edit'

      expect(wrapper.vm.showLinkForm()).toBeTruthy()
    })

    it('returns false for just "edit" as url param', () => {
      wrapper.vm.$route.params.additional = 'edit'

      expect(wrapper.vm.showLinkForm()).toBeFalsy()
    })

    it('returns false for empty url param', () => {
      wrapper.vm.$route.params.additional = ''

      expect(wrapper.vm.showLinkForm()).toBeFalsy()
    })

    it('returns false for undefined url param', () => {
      wrapper.vm.$route.params.additional = undefined

      expect(wrapper.vm.showLinkForm()).toBeFalsy()
    })

    it('returns false for null url param', () => {
      wrapper.vm.$route.params.additional = null

      expect(wrapper.vm.showLinkForm()).toBeFalsy()
    })

    it('returns false for id with "new" url param', () => {
      wrapper.vm.$route.params.id = 1
      wrapper.vm.$route.params.additional = 'new'

      expect(wrapper.vm.showLinkForm()).toBeFalsy()
    })

    it('returns false for number url param', () => {
      wrapper.vm.$route.params.additional = 1

      expect(wrapper.vm.showLinkForm()).toBeFalsy()
    })
  })
})
