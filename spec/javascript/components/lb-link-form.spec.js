import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import LbLinkForm from '../../../app/javascript/components/lb-link-form.vue'
import focus from '../../../app/javascript/directives/focus'
import { Topic } from '../../../app/javascript/models/topic'
import { Link } from '../../../app/javascript/models/link'
import VueTextareaAutosize from 'vue-textarea-autosize'


const localVue  = createLocalVue()
localVue.use(VueTextareaAutosize)
localVue.directive('focus', focus)


describe('lb-link-form.vue', () => {
  let link = new Link({})
  let routerPushSpy = jest.fn()
  let router = { push(input) { routerPushSpy(input) } }
  let route = { params: {} }

  describe('#created', () => {
    let loadTopicsSpy = jest.fn()
    let loadDataSpy = jest.fn()

    beforeEach(() => {
      shallowMount(LbLinkForm, {
        localVue,
        mocks: {
          $router: router,
          $route: route
        },
        methods: {
          loadTopics() { loadTopicsSpy() },
          loadData() { loadDataSpy(this.resetNewLink()) }
        },
        propsData: {
          link: link
        }
      })
    })

    it('calls loadTopics', () => {
      expect(loadTopicsSpy).toHaveBeenCalled()
    })
  })

  describe('#loadTopics', () => {
    it('calls fetchTopics and sets topics', (done) =>  {
      const fetchAllSpy = jest.fn().mockImplementation(() => {
        return Promise.resolve('newly set topics')
      })
      const wrapper = mount(LbLinkForm, {
        localVue,
        mocks: {
          $router: router,
          $route: route
        },
        computed: {
          topicsService() {
            return { fetchAll: fetchAllSpy }
          }
        },
        propsData: {
          link: link
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
        mocks: {
          $router: router,
          $route: route
        },
        computed: {
          topicsService() {
            return { fetchAll: fetchAllSpy }
          }
        },
        methods: {
          addToast(input) {
            toastSpy(input)
          }
        },
        propsData: {
          link: link
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
})
