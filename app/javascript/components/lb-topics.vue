<template>
  <div class="container topics">
    <div class="row mt-2">
      <div class="offset-lg-4 col-lg-4">
        <div class="topics-header">
          <div class="row">
            <div class="col-lg-12">
              <button class="topics-add btn btn-outline-light" data-test="add-button" @click="toggleFormVisibility">
                <i class="material-icons md-24 mr-1" v-if="!showForm" >add</i>
                <i v-else class="material-icons md-24 mr-1">keyboard_arrow_up</i>
                <span v-if="currentTopic">Edit</span>
                <span v-else>Add</span>
                Topic</button>
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
                    <button v-show="currentTopic" type="button" class="btn btn-outline-primary" data-test="delete-button" @click="showConfirmation = true">Delete</button>
                    <button v-show="!currentTopic" type="button" class="btn btn-outline-primary" @click="showForm = false">Cancel</button>
                    <button type="submit" class="btn btn-primary save-button" :disabled="isSaveDisabled()">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ul>
          <li class="mb-3 mt-4">Topics <span class="topics-counter">({{ topics.length }})</span></li>
          <li v-for="topic in topics" class="topics-row" v-bind:key="topic.name">
            <span data-test="index-topic-name">
              {{ topic.name }}
            </span>
            <button type="button" class="btn btn-outline-light edit-button" @click="editInForm(topic)"
                    data-test="topic-edit-button">EDIT</button>
          </li>
        </ul>
      </div>
    </div>
    <lb-confirmation
        :showConfirmation="showConfirmation"
        :doAfterConfirm="deleteTopic"
        @close="showConfirmation = false"
    >
      <span v-if="currentTopic">
        Are you sure you want to delete '{{ currentTopic.name }}' from the Library?
      </span>
    </lb-confirmation>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import _ from 'lodash'
import { mapActions } from 'vuex'
import { TOAST_TYPE} from '../models/toast'

export default {
  name: 'lb-topics',
  data() {
    return {
      topics: [],
      showForm: false,
      showConfirmation: false,
      newTopicName: null,
      currentTopic: null,
      baseUrl: `${process.env.BASE_API}/topics`,
    }
  },
  created() {
    this.fetchTopics()
  },
  methods: {
    ...mapActions([
      'addToast',
    ]),
    toggleFormVisibility(){
      this.showForm = !this.showForm
      if (!this.showForm) {
        this.clearForm()
      }
    },
    clearForm() {
      this.newTopicName = null
      this.currentTopic = null
    },
    fetchTopics() {
      this.$http.get(this.baseUrl).then(
        (response) => {
          this.topics = _.map(response.body['data'], (raw) => {
            const topic = raw.attributes
            topic.id = raw.id
            return topic
          })
        },
        () => {
          this.addToast([TOAST_TYPE.ERROR, 'Could not load topics'])
        })
    },
    onSubmit() {
      if (this.currentTopic) {
        this.editTopic()
      } else {
        this.createTopic()
      }
    },
    newTopicParams() {
      return {
        data: {
          type: 'topic',
          attributes: {
            name: this.newTopicName
          }
        }
      }
    },
    createTopic() {
      const params = this.newTopicParams()
      this.$http.post(this.baseUrl, params).then(
        (response) => {
          this.fetchTopics()
          this.clearForm()
          this.addToast([TOAST_TYPE.SUCCESS, `Successfully added Topic '${response.body.data.attributes.name}'`])
        },
        () => {
          this.addToast([TOAST_TYPE.ERROR, `Could not add '${this.newTopicName}'`])
        })
    },
    editTopic() {
      if (!this.currentTopic) { throw 'Exception: no Topic selected for edit' }
      const params = this.newTopicParams()
      params.data.id = this.currentTopic.id
      this.$http.put(`${this.baseUrl}/${this.currentTopic.id}`, params).then(
        (response) => {
          this.addToast([TOAST_TYPE.SUCCESS, `Successfully edited Topic '${response.body.data.attributes.name}'`])
          this.fetchTopics()
          this.clearForm()
          this.showForm = false
        },
        () => {
          this.addToast([TOAST_TYPE.ERROR, `Could not edit '${this.currentTopic.name}'`])
        })
    },
    editInForm(topic) {
      this.currentTopic = topic
      this.newTopicName = topic.name
      this.showForm = true
    },
    deleteTopic() {
      if (!this.currentTopic) { throw 'Exception: no Topic selected for edit' }
      this.$http.delete(`${this.baseUrl}/${this.currentTopic.id}`).then(() => {
        this.addToast([TOAST_TYPE.SUCCESS, `Successfully deleted Topic '${this.currentTopic.name}'`])
        this.fetchTopics()
        this.clearForm()
        this.showForm = false
      },
      () => {
        this.addToast([TOAST_TYPE.ERROR, `Could not delete '${this.currentTopic.name}'`])
      })
    },
    isSaveDisabled(){
      return !this.newTopicName || !!(this.currentTopic && this.currentTopic.name === this.newTopicName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/variables";

.topics {
  .topics-header {
    border: 2px solid $dark-gray;
    padding: 0.5rem 0.25rem 0.25rem 0.25rem;
  }

  .topics-add {
    color: $dark-gray;
    border-color: transparent;
    @include default-font-measure;

    i {
      vertical-align: sub;
    }
  }

  .topics-counter {
    font-size: 0.7em;
    color: $gray;
    vertical-align: super;
  }

  .topics-form {
    width: 100%;
    padding: 0.5rem;

    button {
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 0;
      width: 48%;
      @include default-button;
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
    @include default-font-measure;
    list-style: none;
    padding-left: 10px;
    margin-top: 15px;
  }

  .topics-row {

    .edit-button {
      color: transparent;
      border-color: transparent;
      background-color: transparent;
      line-height: 0.6rem;
      font-size: 0.6rem;
      float: right;
    }
  }

  .topics-row:hover {
    background-color: $light-gray;

    .edit-button {
      color: $dark-gray;
      border-color: $light-gray;
    }
  }
}
</style>
