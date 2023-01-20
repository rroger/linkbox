import { shallowMount } from '@vue/test-utils'
import LbLinkShow from '../../../app/javascript/components/lb-link-show.vue'
import { Link } from '../../../app/javascript/models/link'

describe('lb-link-show.vue', () => {
  describe('with props', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(LbLinkShow, {
        propsData: {
          link: new Link({
            id: '1', title: 'Typography', url: 'https://typos.ch',
            notes: 'Some note', topic_id: 2, topic_name: 'Super Topic', topic_color: '#1111ab'
          })
        },
        methods: {
          updateLink() {}
        }
      })
    })

    it('displays topic', () => {
      expect(wrapper.find('.topic').text()).toEqual('Super Topic')
    })

    it('contains notes', () => {
      wrapper.find('[data-test="notes-show-link"]').trigger('click')

      expect(wrapper.find('.notes').text()).toEqual('Some note')
    })

    it('displays title', () => {
      expect(wrapper.find('.link-url').html()).toMatch(/>Typography<\//)
    })

    it('links url to tile', () => {
      expect(wrapper.find('.link-url').html()).toMatch(/<a\shref="https:\/\/typos\.ch.*>Typography<\/a>/)
    })

    describe('#toggleShowNotes', () => {
      it('showNotes is false by default', () => {
        expect(wrapper.vm.showNotes).toBeFalsy()
      })

      it('toggles showNotes', () => {
        wrapper.vm.toggleShowNotes()

        expect(wrapper.vm.showNotes).toBeTruthy()
      })
    })

    describe('#toggleComplete', () => {
      it('toggles link.completed', () => {
        const oldValue = wrapper.vm.link.completed
        wrapper.vm.toggleCompleted()

        expect(wrapper.vm.link.completed).toEqual(!oldValue)
      })

      it('calls updateLink', () => {
        const updateCompleteSpy = jest.fn()
        wrapper.vm.updateLink = (input) => { updateCompleteSpy(input) }
        wrapper.vm.toggleCompleted()

        expect(updateCompleteSpy).toHaveBeenCalledWith({ completed: true, id: '1'})

        wrapper.vm.toggleCompleted()

        expect(updateCompleteSpy).toHaveBeenCalledWith({ completed: false, id: '1'})
      })
    })
  })
})
