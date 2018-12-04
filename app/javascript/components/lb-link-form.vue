<template>
  <div>
    <label for="link-url" hidden>Link URL</label>
    <input id="link-url" v-model="link.url" v-focus type="text" placeholder="URL" class="form-control">

    <label for="link-title" hidden>Link Title</label>
    <input id="link-title" v-model="link.title" type="text" placeholder="Link Title" class="form-control">

    <label for="link-notes" hidden>Link Notes</label>
    <textarea-autosize
        id="link-notes"
        class="form-control textarea-autosize"
        placeholder="Notes"
        ref="someName"
        v-model="link.notes"
        :min-height="30"
    ></textarea-autosize>

    <label for="link-topic" hidden>Link Topic</label>
    <select id="link-topic" v-model="link.topicId" class="form-control">
      <option v-for="topic in topics" v-bind:key="topic.id" v-bind:value="topic.id">
        {{ topic.name }}
      </option>
    </select>

    <div class="custom-control form-control-lg custom-checkbox mb-5">
      <input type="checkbox" v-model="link.completed" class="custom-control-input" id="link-completed">
      <label class="custom-control-label" for="link-completed">Mark as Completed</label>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { BaseApiService } from '../services/base_api_service'
import { Topic } from '../models/topic'
import { TOAST_TYPE} from '../models/toast'

export default {
  name: 'lb-link-form',
  data() {
    return {
      topics: [],
    }
  },

  props: {
    showLinkCreate: Boolean,
    link: null
  },
  created() {
    this.loadTopics()
  },
  computed: {
    topicsService() { return new BaseApiService() }
  },
  methods: {
    ...mapActions([
      'addToast',
    ]),
    loadTopics() {
      this.topicsService.fetchAll('topics', Topic)
        .then((topics) => {
          this.topics = topics
        })
        .catch(() => {
          this.addToast([TOAST_TYPE.ERROR, 'Could not load Topics'])
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";

  .create-link-form {
    background-color: $light-gray;

    input, select {
      width: $normal-form-element-width;
      height: $normal-form-element-height;
      padding: $normal-space;
      float: none;
      font-size: $font-size-title-small;
      font-weight: normal;
      color: $dark-gray;
      margin: 1.5*$normal-space auto 0;
    }

    .textarea-autosize {
      width: $normal-form-element-width;
      padding: $normal-space;
      font-size: $font-size-title-small;
      font-weight: normal;
      color: $dark-gray;
      margin: 1.5*$normal-space auto 0;
    }

    ::placeholder {
      font-size: $font-size-title-small;
      font-weight: normal;
      color: $gray;
    }

    .form-control {
      margin-left: 0
    }

    .custom-control-label {
      font-size: $font-size-title-small;
      font-weight: normal;
    }

    .custom-control-label::before,
    .custom-control-label::after {
      border: $dark-gray 1px solid;
      width: 0.75rem;
      height: 0.75rem;
    }
  }
</style>
