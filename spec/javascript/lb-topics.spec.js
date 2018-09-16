import Vue from 'vue/dist/vue.js'
import { shallowMount } from '@vue/test-utils'
import LbTopics from '../../app/javascript/components/lb-topics.vue'
import LbConfirmation from '../../app/javascript/components/lb-confirmation.vue'
import { $httpIndexSuccess, $httpIndexFail } from './mocks/topics_mocks'



describe('TopicsComponent', () => {

  describe('#created', () => {
    it('called fetchTopics', () =>  {
      const spy = jest.spyOn(LbTopics.methods, 'fetchTopics')
      shallowMount(LbTopics,  {
        mocks: {
          $http: $httpIndexSuccess
        }
      })
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('#toggleFormVisibility', () => {
    let wrapper = null
    beforeEach(() => {
      wrapper = shallowMount(LbTopics,  {
        mocks: {
          $http: $httpIndexSuccess
        }
      })
    })

    it('toggles showForm value', () => {
      expect(wrapper.vm.showForm).toBeFalsy()
      wrapper.vm.toggleFormVisibility()

      expect(wrapper.vm.showForm).toBeTruthy()

      wrapper.vm.toggleFormVisibility()

      expect(wrapper.vm.showForm).toBeFalsy()
    })

    it('clears the Form when showForm is set to false', () => {
      const spy = jest.spyOn(wrapper.vm, 'clearForm')
      expect(wrapper.vm.showForm).toBeFalsy()
      wrapper.vm.toggleFormVisibility()
      wrapper.vm.newTopicName = 'some new name'
      wrapper.vm.currentTopic = 'Some Topic'

      expect(wrapper.vm.showForm).toBeTruthy()

      wrapper.vm.toggleFormVisibility()

      expect(wrapper.vm.newTopicName).toBe(null)
      expect(wrapper.vm.currentTopic).toBe(null)
      expect(spy).toBeCalledTimes(1)
    })
  })

  describe('#clearForm', () => {
    it('clears values', () => {
      const wrapper = shallowMount(LbTopics,  {
        mocks: {
          $http: $httpIndexSuccess
        }
      })
      wrapper.vm.newTopicName = 'some new name'
      wrapper.vm.currentTopic = 'Some Topic'
      wrapper.vm.clearForm()

      expect(wrapper.vm.newTopicName).toBe(null)
      expect(wrapper.vm.currentTopic).toBe(null)
    })
  })

  describe('#fetchTopics', () => {
    describe('successfull http call', () => {
      it('sets topics', (done) => {
        const wrapper = shallowMount(LbTopics,  {
          mocks: {
            $http: $httpIndexSuccess
          }
        })
        Vue.nextTick(() => {
          expect(wrapper.vm.topics).toEqual(
            [
              { id: '55', name: 'One mores' },
              { id: '52', name: 'So goodOk' },
              { id: '111', name: 'Totaly New Topic'},
              { id: '112', name: 'Typography' }
            ]
          )
          done()
        })
      })
    })

    describe('http fail', () => {
      it('adds toaster', (done) => {
        const wrapper = shallowMount(LbTopics,  {
          mocks: {
            $http: $httpIndexFail
          }
        })
        const spy = jest.spyOn(wrapper.vm, 'addToast')
        Vue.nextTick(() => {
          expect(spy).toHaveBeenCalledWith('Could not load topics')
          done()
        })
      })
    })
  })

  describe('#onSubmit', () => {
    let wrapper = null
    let spyEdit = null
    let spyCreate = null
    beforeEach(() => {
      wrapper = shallowMount(LbTopics,  {
        mocks: {
          $http: $httpIndexSuccess,
        },
        methods: {
          createTopic() { return true },
          editTopic() { return true }
        }
      })
      spyEdit = jest.spyOn(wrapper.vm, 'editTopic')
      spyCreate = jest.spyOn(wrapper.vm, 'createTopic')
    })

    it('calles editTopic when currentTopic exists', () => {
      wrapper.vm.currentTopic = 'some topic'
      wrapper.vm.onSubmit()

      expect(spyEdit).toHaveBeenCalledTimes(1)
      expect(spyCreate).toHaveBeenCalledTimes(0)
    })

    it('calles createTopic when currentTopic was null', () => {
      wrapper.vm.currentTopic = null
      wrapper.vm.onSubmit()

      expect(spyEdit).toHaveBeenCalledTimes(0)
      expect(spyCreate).toHaveBeenCalledTimes(1)
    })
  })

  describe('#newTopicParams', () => {
    it('renders the correct Title', () => {
      const wrapper = shallowMount(LbTopics,  {
        mocks: {
          components: {
            'lb-confirmation': LbConfirmation
          },
          $http: $httpIndexSuccess
        }
      })
      wrapper.vm.newTopicName = 'Best Topic'

      expect(wrapper.vm.newTopicParams()).toEqual({'data': {'attributes': {'name': 'Best Topic'}, 'type': 'topic'}})
    })
  })

  describe('#createTopic', () => {

  })

  describe('#editTopic', () => {

  })

  describe('#editInForm', () => {

  })

  describe('#deleteTopic', () => {

  })

  describe('#isSaveDisabled', () => {

  })

  it('renders the correct Title', () => {
    const wrapper = shallowMount(LbTopics,  {
      mocks: {
        components: {
          'lb-confirmation': LbConfirmation
        },
        $http: $httpIndexSuccess
      }
    })
    expect(wrapper.html()).toContain('<li>Topics')
  })

  it('loads and displays topics', (done) => {
    const wrapper = shallowMount(LbTopics,  {
      mocks: {
        $http: $httpIndexSuccess
      }
    })
    Vue.nextTick(() => {
      expect(wrapper.html()).toContain('One mores')
      expect(wrapper.html()).toContain('So goodOk')
      expect(wrapper.html()).toContain('Totaly New Topic')
      expect(wrapper.html()).toContain('Typography')
      done()
    })
  })
})
