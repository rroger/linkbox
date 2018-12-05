import Vuex from 'vuex'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import LbLinkNew from '../../../app/javascript/components/lb-link-new.vue'
import focus from '../../../app/javascript/directives/focus'
import { Link } from '../../../app/javascript/models/link'
import VueTextareaAutosize from 'vue-textarea-autosize'

const localVue  = createLocalVue()
localVue.use(Vuex)
localVue.use(VueTextareaAutosize)

localVue.directive('focus', focus)


describe('lb-link-new', () => {
  let routerPushSpy = jest.fn()
  let router = { push(input) { routerPushSpy(input) } }
  let route = { params: {} }

  describe('#created', () => {
    let resetNewLinkSpy = jest.fn()

    beforeEach(() => {
      shallowMount(LbLinkNew, {
        localVue,
        mocks: {
          $router: router,
          $route: route
        },
        methods: {
          resetNewLink() {  resetNewLinkSpy() }
        }
      })
    })

    it('calls loadData', () => {
      expect(resetNewLinkSpy).toHaveBeenCalled()
    })
  })

  describe('#loadData', () => {
    let wrapper

    describe('without id', () => {
      beforeEach(() => {
        wrapper = shallowMount(LbLinkNew, {
          localVue,
          mocks: {
            $router: router,
            $route: route
          },
        })
      })

      it('sets newLink to an empty Link', () => {
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

  describe('#save', () => {
    let actions
    let getters
    let store
    let wrapper
    let saveLinkSpy

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
              links: [
                new Link({
                  completed: false, id: '8', notes: 'Some other notes',
                  order: null, title: 'flexbox', topic_id: 4, topic_name: 'UI Elements', topic_color: '#8729b9',
                  url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'
                }),
              ]
            },
            getters,
            actions
          }
        }
      })

      saveLinkSpy = jest.fn()
    })

    describe('add new link', () => {
      beforeEach(() => {
        wrapper = mount(LbLinkNew, {
          store,
          localVue,
          mocks: {
            $router: router,
            $route: route,
          },
          methods: {
            addLink(input) {
              saveLinkSpy(input)
              return Promise.resolve(true)
            }
          }
        })
        wrapper.vm.newLink.title = 'new title'
        wrapper.vm.save()
      })

      it('calls addLink with newLink', (done) => {
        localVue.nextTick(() => {
          expect(saveLinkSpy).toHaveBeenCalledWith(new Link({url: 'https://', title: 'new title'}))
          done()
        })
      })

      it('resets newLink after adding', (done) => {
        localVue.nextTick(() => {
          expect(wrapper.vm.newLink).toEqual(new Link({url: 'https://'}))
          done()
        })
      })

      it('closes FormModal', (done) => {
        localVue.nextTick(() => {
          expect(routerPushSpy).toHaveBeenCalledWith('/library')
          done()
        })
      })
    })
  })

  describe('#resetNewLink', () => {
    it('resets newLink', () => {
      const wrapper = shallowMount(LbLinkNew, {
        localVue,
        mocks: {
          $router: router,
          $route: route
        }})
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
