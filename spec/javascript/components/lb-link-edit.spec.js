import Vuex from 'vuex'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import LbLinkEdit from '../../../app/javascript/components/lb-link-edit'
import LbConfirmation from '../../../app/javascript/components/lb-confirmation'
import focus from '../../../app/javascript/directives/focus'
import { Link } from '../../../app/javascript/models/link'
import VueTextareaAutosize from 'vue-textarea-autosize'

const localVue  = createLocalVue()
localVue.use(Vuex)
localVue.directive('focus', focus)
localVue.use(VueTextareaAutosize)
localVue.component('lb-confirmation', LbConfirmation)


describe('lb-link-edit', () => {
  let routerPushSpy = jest.fn()
  let router = { push(input) { routerPushSpy(input) } }
  let route = { params: {} }

  describe('#created', () => {
    let loadDataSpy = jest.fn()

    beforeEach(() => {
      shallowMount(LbLinkEdit, {
        localVue,
        mocks: {
          $router: router,
          $route: route
        },
        methods: {
          loadData() { loadDataSpy() }
        }
      })
    })

    it('calls loadData', () => {
      expect(loadDataSpy).toHaveBeenCalled()
    })
  })

  describe('#loadData', () => {
    let wrapper

    describe('without id', () => {
      beforeEach(() => {
        wrapper = shallowMount(LbLinkEdit, {
          localVue,
          mocks: {
            $router: router,
            $route: route
          },
        })
      })

      it('sets editLinkCopy to an empty Link', () => {
        expect(wrapper.vm.editLinkCopy).toEqual({
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

      it('sets editLink to null', () => {
        expect(wrapper.vm.editLink).toEqual(null)
      })
    })

    describe('with valid id', () => {
      beforeEach(() => {
        wrapper = shallowMount(LbLinkEdit, {
          localVue,
          mocks: {
            $router: router,
            $route: { params: { id: 1 } }
          },
          computed: {
            link: () => () => { return new Link({
              completed: true, id: 1, notes: '', order: null, title: 'Example 6', topic_id: 1,
              topic_name: 'Typography', url: 'https://example6.com'})
            },
          }
        })
      })

      it('sets edit Link', () => {
        expect(wrapper.vm.editLink.id).toEqual(1)
        expect(wrapper.vm.editLink.title).toEqual('Example 6')
      })

      it('clones edit Link', () => {
        expect(wrapper.vm.editLinkCopy).not.toBe(wrapper.vm.editLink)
        expect(wrapper.vm.editLinkCopy).toEqual(wrapper.vm.editLink)
      })
    })

    describe('with in-existing id', () => {
      let toastSpy
      let closeFormModalSpy

      beforeEach(() => {
        toastSpy = jest.fn()
        closeFormModalSpy = jest.fn()
        wrapper = shallowMount(LbLinkEdit, {
          localVue,
          mocks: {
            $router: router,
            $route: { params: { id: 1 } }
          },
          computed: {
            link: () => () => { return undefined },
          },
          methods: {
            addToast(input) { toastSpy(input) },
            closeFormModal() { closeFormModalSpy() }
          }
        })
      })

      it('toasts an error', () => {
        expect(toastSpy).toHaveBeenCalledWith(['error', 'Could not edit Link (id: 1)'])
      })

      it('closes edit modal', () => {
        expect(closeFormModalSpy).toHaveBeenCalled()
      })
    })
  })

  describe('#save', () => {
    let actions
    let getters
    let store
    let wrapper
    let saveLinkSpy
    let closeFormModalSpy

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
                new Link({ completed: false, id: '8', notes: 'Some other notes',
                  order: null, title: 'flexbox', topic_id: 4, topic_name: 'UI Elements', topic_color: '#8729b9',
                  url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
              ]
            },
            getters,
            actions
          }
        }
      })

      saveLinkSpy = jest.fn()
      closeFormModalSpy = jest.fn()
    })

    describe('edit link', () => {
      beforeEach(() => {
        wrapper = mount(LbLinkEdit, {
          sync: false, // bug https://github.com/vuejs/vue-test-utils/issues/829#issuecomment-406049236
          store,
          localVue,
          mocks: {
            $router: router,
            $route: route
          },
          methods: {
            updateLink(input) {
              saveLinkSpy(input)
              return Promise.resolve(true)
            },
            closeFormModal() { closeFormModalSpy() }
          }
        })
        wrapper.vm.editLink =  new Link({ completed: false, id: '8', notes: 'Some other notes',
          order: null, title: 'flexbox', topic_id: 4, topic_name: 'UI Elements', topic_color: '#8729b9',
          url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'}),
        wrapper.vm.editLinkCopy = new Link({ completed: true, id: '8', notes: 'Edited notes',
          order: 2, title: 'Edited Link', topic_id: 2, topic_name: 'Archive', topic_color: '#8abb9',
          url: 'https://edited.com/'})
        wrapper.vm.save()
      })

      it('calls updateLink with editLinkCopy', (done) => {
        localVue.nextTick(() => {
          const expectedLink = new Link({ completed: true, id: '8', notes: 'Edited notes',
            order: 2, title: 'Edited Link', topic_id: 2, topic_name: 'Archive', topic_color: '#8abb9',
            url: 'https://edited.com/'})
          expectedLink.toastSuccessMessage = true
          expect(saveLinkSpy).toHaveBeenCalledWith(expectedLink)
          done()
        })
      })

      it('resets editLinkCopy', (done) => {
        localVue.nextTick(() => {
          expect(wrapper.vm.editLinkCopy).toEqual(new Link({ url: 'https://'}))
          done()
        })
      })

      it('sets editLink to null', (done) => {
        localVue.nextTick(() => {
          expect(wrapper.vm.editLink).toBe(null)
          done()
        })
      })

      it('closes FormModal', (done) => {
        localVue.nextTick(() => {
          expect(closeFormModalSpy).toHaveBeenCalledTimes(1)
          done()
        })
      })
    })
  })

  describe('#remove', () => {
    let store
    let wrapper
    let deleteLinkSpy
    let closeFormModalSpy

    beforeEach(() => {
      deleteLinkSpy = jest.fn()
      closeFormModalSpy = jest.fn()
      wrapper = mount(LbLinkEdit, {
        store,
        localVue,
        mocks: {
          $router: router,
          $route: route
        },
        methods: {
          deleteLink(input) {
            deleteLinkSpy(input)
            return Promise.resolve(true)
          },
          closeFormModal() {
            closeFormModalSpy()
          }
        }
      })
      wrapper.vm.editLink =  new Link({ completed: false, id: '8', notes: 'Some other notes',
        order: null, title: 'flexbox', topic_id: 4, topic_name: 'UI Elements', topic_color: '#8729b9',
        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'})
    })

    it('calls deleteLink with this.editLink', () => {
      wrapper.vm.remove()

      expect(deleteLinkSpy).toHaveBeenCalledWith(wrapper.vm.editLink)
    })

    it('close form modal', () => {
      wrapper.vm.remove()

      expect(closeFormModalSpy).toHaveBeenCalled()
    })

    it('throws an exception without editLink', () => {
      wrapper.vm.editLink = null

      expect(wrapper.vm.remove).toThrow('Exception: No Link to delete')
    })

    it('throws an exception without editLink.id', () => {
      wrapper.vm.editLink = { title: 'something' }

      expect(wrapper.vm.remove).toThrow('Exception: No Link to delete')
    })
  })

  describe('#resetEditLinkCopy', () => {
    it('resets editLinkCopy', () => {
      const wrapper = shallowMount(LbLinkEdit, {
        localVue,
        mocks: {
          $router: router,
          $route: route
        }})
      wrapper.vm.editLinkCopy = new Link({
        title: 'abc',
        id: 5,
        notes: 'some Notes',
        url: 'some url',
        topicColer: '#fff',
        topicName: 'Name',
        topicId: '5'
      })
      wrapper.vm.resetEditLinkCopy()

      expect(wrapper.vm.editLinkCopy).toEqual({
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

  describe('#closeFormModal', () => {
    it('redirects back to library', (done) => {
      const wrapper = shallowMount(LbLinkEdit, {
        localVue,
        mocks: {
          $router: router,
          $route: route
        }})
      wrapper.vm.closeFormModal()

      localVue.nextTick(() => {
        expect(routerPushSpy).toHaveBeenCalledWith('/library')
        done()
      })
    })
  })

  describe('#toggleConfirmationShown', () => {
    it('toggles value', () => {
      const wrapper = shallowMount(LbLinkEdit, {
        localVue,
        mocks: {
          $router: router,
          $route: route
        }})
      const oldValue = wrapper.vm.isConfirmationShown
      wrapper.vm.toggleConfirmationShown()

      expect(wrapper.vm.isConfirmationShown).not.toEqual(oldValue)
    })
  })
})
