import Vue from 'vue/dist/vue.js'
import { mount, shallowMount, createLocalVue } from "@vue/test-utils"
import LbTopics from "../../app/javascript/components/lb-topics.vue"
import LbConfirmation from "../../app/javascript/components/lb-confirmation.vue"


const $httpSuccess = {
  get(){
    return Promise.resolve({
      body: {
        "data": [
          {"id":"55","type":"topic","attributes":{"name":"One mores"}},
          {"id":"52","type":"topic","attributes":{"name":"So goodOk"}},
          {"id":"111","type":"topic","attributes":{"name":"Totaly New Topic"}},
          {"id":"112","type":"topic","attributes":{"name":"Typography"}}
        ]
      }
  });
  }
};
const $httpFail = {
  get(){
    return Promise.reject({body: { message: "internal server error" }});
  }
};

describe('TopicsComponent', () => {

  it('renders the correct Title', () => {
    const wrapper = shallowMount(LbTopics,  {
      mocks: {
        components: {
          'lb-confirmation': LbConfirmation
        },
        $http: $httpSuccess
      }
    });
    expect(wrapper.html()).toContain('<li>Topics');
  })

  it('loads and displays topics', async (done) => {
    const wrapper = shallowMount(LbTopics,  {
      mocks: {
        $http: $httpSuccess
      }
    });
    Vue.nextTick(() => {
      expect(wrapper.html()).toContain('One mores');
      expect(wrapper.html()).toContain('So goodOk');
      expect(wrapper.html()).toContain('Totaly New Topic');
      expect(wrapper.html()).toContain('Typography');
      done();
    })
  })
});
