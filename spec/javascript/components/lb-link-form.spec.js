import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import LbLinkForm from '../../../app/javascript/components/lb-link-form.vue'
import focus from '../../../app/javascript/directives/focus'
import { Topic } from '../../../app/javascript/models/topic'
import { Link } from '../../../app/javascript/models/link'

const localVue  = createLocalVue()
localVue.use(Vuex)
localVue.directive('focus', focus)

describe('lb-link-form.vue', () => {
  describe('#created', () => {
    it('calls fetchTopics and sets topics', (done) =>  {
      const fetchAllSpy = jest.fn().mockImplementation(() => {
        return Promise.resolve('newly set topics')
      })
      const wrapper = mount(LbLinkForm, {
        localVue,
        computed: {
          topicsService() {
            return { fetchAll: fetchAllSpy }
          }
        }
      })
      localVue.nextTick(() => {
        expect(fetchAllSpy).toHaveBeenCalledWith('topics', Topic)
        expect(wrapper.vm.topics).toEqual('newly set topics')
        done()
      })
    })

    it('can toast error message', (done) =>  {
      const fetchAllSpy = jest.fn().mockImplementation(() => {
        return Promise.reject()
      })
      const toastSpy = jest.fn()
      mount(LbLinkForm, {
        localVue,
        computed: {
          topicsService() {
            return { fetchAll: fetchAllSpy }
          }
        },
        methods: {
          addToast(input) {
            toastSpy(input)
          }
        }
      })

      localVue.nextTick(() => {
        localVue.nextTick(() => {
          expect(toastSpy).toHaveBeenCalledWith(['error', 'Could not load Topics'])
          done()
        })
      })
    })
  })

  describe('#save', () => {
    let actions
    let getters
    let store
    let wrapper
    let addLinkSpy

    beforeEach(() => {
      actions = {
        updateLinksToDo: jest.fn()
      }
      getters = {
        linksToDo: jest.fn(),
      }
      store = new Vuex.Store({
        modules: {
          links: {
            state: {
              links: []
            },
            getters,
            actions
          }
        }
      })

      addLinkSpy = jest.fn()
      wrapper = mount(LbLinkForm, {
        store,
        localVue,
        mocks: {
          $router: { push: jest.fn() }
        },
        methods: {
          addLink(input) {
            addLinkSpy(input)
            return Promise.resolve(true)
          },
        }
      })
      wrapper.vm.newLink.title = 'new title'
      wrapper.vm.save()
    })


    it('calls addLink with newLink', (done) => {
      localVue.nextTick(() => {
        expect(addLinkSpy).toHaveBeenCalledWith(new Link({ url: 'https://', title: 'new title' }))
        done()
      })
    })

    it('resets newLink after adding', (done) => {
      localVue.nextTick(() => {
        expect(wrapper.vm.newLink).toEqual(new Link({ url: 'https://'}))
        done()
      })
    })


    it('redirects back to library', (done) => {
      localVue.nextTick(() => {
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/library')
        done()
      })
    })
  })

  describe('#resetNewLink', () => {
    it('resets newLink', () => {
      const wrapper = mount(LbLinkForm, { localVue })
      wrapper.vm.newLink = new Link({
        title: 'abc',
        id: 5,
        notes: 'some Notes',
        url: 'some url',
        topicColer: '#fff',
        topicName: 'Name',
        topicId: '5'
      })
      wrapper.vm.resetNewLink()

      expect(wrapper.vm.newLink).toEqual({
        completed: false,
        id: undefined,
        notes: '',
        order: null,
        title: undefined,
        topicColor: null,
        topicId: null,
        topicName: null,
        url: 'https://'
      })
    })
  })
})
