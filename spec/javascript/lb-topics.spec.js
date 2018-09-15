import { mount, shallowMount } from "@vue/test-utils"
import TopicsComponent from "../../app/javascript/components/lb-topics.vue"
// import ConfirmationComponent from "../../app/javascript/components/lb-confirmation.vue"

// jest.mock('this.$http.get', () => ({
//   get: jest.fn(() => Promise.resolve({ data: 3 }))
// }))

describe('TopicsComponent', () => {
  // Now mount the component and you have the wrapper
  console.log('debug: ', TopicsComponent);
  const wrapper = shallowMount(TopicsComponent);

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>');
  })

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true);
  })
})
