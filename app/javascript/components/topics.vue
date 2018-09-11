<template>
  <div class="container topics">
    <div class="row mt-5">
      <div class="offset-lg-4 col-lg-4">
        <div class="topics-header">
          <div class="row">
            <div class="col-lg-12">
              <button class="topics-add btn btn-outline-light" @click="toggleFormVisibility">+ Add Topic</button>
            </div>
          </div>
          <div class="row">
            <div class=col-lg-12>
              <form v-show="showForm" class="mt-4 topics-form" v-on:submit.prevent="onSubmit">
                <div class="row">
                  <div class=col-md-12>
                    <input v-model="newTopicName" id="topic-name" name="topic-name" type="text" placeholder="| Sketch">
                  </div>
                </div>
                <div class="row">
                  <div class=col-lg-12>
                    <button v-show="editTopicId" type="button" class="btn btn-outline-primary" data-test="delete-button" @click="deleteTopic()">Delete</button>
                    <button v-show="!editTopicId" type="button" class="btn btn-outline-primary" @click="showForm = false">Cancel</button>
                    <button type="submit" class="btn btn-primary save-button">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ul>
          <li>Topics <span class="topics-counter">({{ topics.length }})</span></li>
          <li>&nbsp;</li>
          <li class="topics-row" v-bind:key="topic.name" v-for="topic in topics">
            <span>
              {{ topic.name }}
            </span>
            <button type="button" class="btn btn-outline-light edit-button" @click="edit(topic)">EDIT</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import _ from 'lodash';
export default {
  name: 'TopicsComponent',

  data() {
    return {
      topics: [],
      showForm: false,
      newTopicName: null,
      editTopicId: null,
      baseUrl: `${process.env.BASE_API}/topics`,
    };
  },
  created() {
    this.fetchTopics();
  },
  methods: {
    toggleFormVisibility(){
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.clearForm();
      }
    },
    clearForm() {
      this.newTopicName = null;
      this.editTopicId = null;
    },
    fetchTopics() {
      this.$http.get(this.baseUrl).then(response => {
        const topics = _.map(response.body['data'], (raw) => {
          const topic = raw.attributes;
          topic.id = raw.id;
          return topic;
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
      if (this.editTopicId) {
        params.data.id = this.editTopicId;
        this.$http.put(`${this.baseUrl}/${this.editTopicId}`, params).then(() => {
          this.fetchTopics();
          this.clearForm();
          this.showForm = false;
        });
      } else {
        this.$http.post(this.baseUrl, params).then(() => {
          this.fetchTopics();
          this.newTopicName = null;
        });
      }
    },
    edit(topic) {
      this.editTopicId = topic.id;
      this.newTopicName = topic.name;
      this.showForm = true;
    },
    deleteTopic() {
      this.$http.delete(`${this.baseUrl}/${this.editTopicId}`).then(() => {
        this.fetchTopics();
        this.clearForm();
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
    color: $gray;
    vertical-align: super;
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


  .topics-row {
    .edit-button {
      color: transparent;
      border-color: transparent;
      line-height: 0.6rem;
      font-size: 0.6rem;
      float: right;
    }
  }

  .topics-row:hover {
    .edit-button {
      color: $dark-gray;
      border-color: $light-gray;
    }
    background-color: $light-gray;
  }
}
</style>
