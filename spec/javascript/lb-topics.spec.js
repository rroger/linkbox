import Vue from 'vue/dist/vue.js'
import { shallowMount } from '@vue/test-utils'
import LbTopics from '../../app/javascript/components/lb-topics.vue'
import LbConfirmation from '../../app/javascript/components/lb-confirmation.vue'
import * as mocks from './mocks/topics_mocks'

describe('TopicsComponent', () => {
  let toastSpy = null
  let addToast = (toastMessage) => { console.log(`Toast: ${toastMessage}`)}

  describe('#created', () => {
    it('called fetchTopics', () =>  {
      const spy = jest.spyOn(LbTopics.methods, 'fetchTopics')
      shallowMount(LbTopics,  {
        mocks: {
          $http: mocks.$httpIndexSuccess
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
          $http: mocks.$httpIndexSuccess
        },
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
          $http: mocks.$httpIndexSuccess
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
            $http: mocks.$httpIndexSuccess
          },
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
            $http: mocks.$httpIndexFail
          },
          methods: { addToast: addToast }
        })
        toastSpy = jest.spyOn(wrapper.vm, 'addToast')
        Vue.nextTick(() => {
          expect(toastSpy).toHaveBeenCalledWith('Could not load topics')
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
          $http: mocks.$httpIndexSuccess,
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
          $http: mocks.$httpIndexSuccess
        }
      })
      wrapper.vm.newTopicName = 'Best Topic'

      expect(wrapper.vm.newTopicParams()).toEqual({'data': {'attributes': {'name': 'Best Topic'}, 'type': 'topic'}})
    })
  })

  describe('#createTopic', () => {
    describe('success', () => {
      let wrapper = null

      beforeEach(() => {
        wrapper = shallowMount(LbTopics,  {
          mocks: {
            components: {
              'lb-confirmation': LbConfirmation
            },
            $http: { get: mocks.$httpIndexSuccess.get, post: mocks.$httpCreateSuccess.post },
          },
          methods: {
            fetchTopics() {},
            addToast: addToast
          }
        })
        wrapper.vm.newTopicName = 'Newly Created Topic'
        toastSpy = jest.spyOn(wrapper.vm, 'addToast')
      })

      it('toasts success', (done) => {
        wrapper.vm.createTopic()
        Vue.nextTick(() => {
          expect(toastSpy).toHaveBeenCalledWith("Successfully added Topic 'Newly Created Topic'")
          done()
        })
      })

      it('re-fetches topics', (done) => {
        const spy = jest.spyOn(wrapper.vm, 'fetchTopics')
        wrapper.vm.createTopic()

        Vue.nextTick(() => {
          expect(spy).toHaveBeenCalledTimes(1)
          done()
        })
      })

      it('clears Form', (done) => {
        wrapper.vm.createTopic()

        Vue.nextTick(() => {
          expect(wrapper.vm.newTopicName).toEqual(null)
          expect(wrapper.vm.currentTopic).toEqual(null)
          done()
        })
      })
    })

    describe('failure', () => {
      let wrapper = null

      beforeEach(() => {
        wrapper = shallowMount(LbTopics,  {
          mocks: {
            components: {
              'lb-confirmation': LbConfirmation
            },
            $http: { get: mocks.$httpIndexSuccess.get, post: mocks.$httpCreateFail.post },
          },
          methods: {
            fetchTopics() {},
            addToast: addToast
          }
        })
        wrapper.vm.newTopicName = 'Newly Created Topic'
        toastSpy = jest.spyOn(wrapper.vm, 'addToast')
      })

      it('toasts failure', (done) => {
        wrapper.vm.createTopic()

        Vue.nextTick(() => {
          expect(wrapper.vm.newTopicName).toEqual('Newly Created Topic')
          expect(wrapper.vm.currentTopic).toEqual(null)
          done()
        })
      })

      it('does not change form', (done) => {
        wrapper.vm.createTopic()

        Vue.nextTick(() => {
          expect(toastSpy).toHaveBeenCalledWith("Could not add Newly Created Topic'")
          done()
        })
      })
    })

  })

  describe('#editTopic', () => {

  })

  describe('#editInForm', () => {

  })

  describe('#deleteTopic', () => {

  })

  describe('#isSaveDisabled', () => {

  })
})
