import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import LbModal from '../../../app/javascript/components/lb-modal'

describe('lb-modal', () => {
  let routerPushSpy = jest.fn()
  let router = { push(input) { routerPushSpy(input) } }
  let route = { params: {} }

  describe('#close', () => {
    it('redirects back to library', (done) => {
      const wrapper = shallowMount(LbModal, {
        mocks: {
          $router: router,
          $route: route
        }})
      wrapper.vm.close()

      Vue.nextTick(() => {
        expect(routerPushSpy).toHaveBeenCalledWith('/library')
        done()
      })
    })
  })
})
