import Vue from 'vue/dist/vue'
import focus from '../../../app/javascript/directives/focus'

Vue.directive('focus', focus)

describe('focus', () => {
  let vm

  beforeEach(() => {
    const template = `
    <div>
      <input id="a" ref="a" type="text" />
      <input id="b" ref="b" v-focus type="text" />
      <input id="c" ref="c" type="text" />
    </div>`

    vm = new Vue({
      template,
    }).$mount()
  })

  it('focus correct element', (done) => {
    Vue.nextTick(() => {
      const focusedElement = document.activeElement
      expect(vm.$refs.b).toEqual(focusedElement)
      done()
    })
  })
})
