<template>
  <div class="container topics">
    <div class="row mt-5">
      <div class="mr-auto col-md-4 ml-auto">
        <div class="topics-header">
          <div class="row">
            <div class="col-md-9">
              <button class="topics-add btn btn-outline-light" v-on:click="showForm = !showForm">+ Add Topic</button>
            </div>
            <div class="col-md-3">
              <span class="topics-counter">({{ topics.length }})</span>
            </div>
          </div>
          <div class="row">
            <div class=col-md-12>
              <form v-show="showForm" class="mt-4 topics-form" v-on:submit.prevent="onSubmit">
                <div class="row">
                  <div class=col-md-12>
                    <input v-model="newTopicName" id="topic-name" name="topic-name" type="text" placeholder="| Sketch">
                  </div>
                </div>
                <div class="row">
                  <div class=col-md-12>
                    <button type="button" class="btn btn-outline-primary">Delete</button>
                    <button type="submit" class="btn btn-primary save-button">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ul>
          <li v-bind:key="topic.name" v-for="topic in topics">
            {{ topic.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'TopicsComponent',
  data() {
    return {
      topics: [{ name: 'Test Topic' }],
      showForm: false,
      newTopicName: null,
    };
  },
  created() {
    this.fetchTopics();
  },
  methods: {
    fetchTopics() {
      this.$http.get('http://localhost:3000/api/v1/topics').then(response => {
        const topics = _.map(response.body['data'], (raw) => {
          return raw.attributes;
        });
        this.topics = topics;
      });
    },
    onSubmit() {
      const params = {
        data: {
          type: 'topic',
          attributes: {
            name: this.newTopicName
          }
        }
      };
      this.$http.post('http://localhost:3000/api/v1/topics', params).then(() => {
        this.fetchTopics();
        this.newTopicName = null;
        this.showForm = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/_variables.scss';
.topics {
  .topics-header {
    border: 1px solid $dark-gray;
    padding: 10px;
  }
  .topics-add {
    color: $dark-gray;
    border-color: transparent !important;
  }

  .topics-counter {
    font-size: 0.7em !important;
    float: right;
    color: $gray;
  }

  .topics-form {
    width: 100%;

    button {
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 0px;
      width: 48%;
      height: 48px;
      border: 1.5px solid !important;
    }

    .save-button {
      float: right;
    }
  }

  #topic-name {
    width: 100%;
    margin-bottom: 10px;
    padding-left: 10px;
    border: 0.5px solid $dark-gray;
    line-height: 2.5rem;
  }

  ul {
    list-style: none;
    padding-left: 10px;
    margin-top: 15px;
  }
}
</style>
