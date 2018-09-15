import { mount, shallowMount } from "@vue/test-utils"
import TopicsComponent from "../../app/javascript/components/lb-topics.vue"
// import ConfirmationComponent from "../../app/javascript/components/lb-confirmation.vue"

// jest.mock('this.$http.get', () => ({
//   get: jest.fn(() => Promise.resolve({ data: 3 }))
// }))

// jest.mock('TopicsComponent.$http.get', () => ({
//   get: jest.fn(() => )
// }));
TopicsComponent.$http = {
  get: function(args) {
    return Promise.resolve({"data":[{"id":"55","type":"topic","attributes":{"name":"One mores"}},{"id":"52","type":"topic","attributes":{"name":"So goodOk"}},{"id":"111","type":"topic","attributes":{"name":"Totaly New Topic"}},{"id":"112","type":"topic","attributes":{"name":"Typography"}}]});
  }
}

console.log('this httpget: ', TopicsComponent.$http.get(args));

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
