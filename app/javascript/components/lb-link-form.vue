<template>
  <div class="modal-background">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container container create-link-form p-3">
          <i @click="$emit('close')" class="material-icons md-48 close-x">close</i>
          <div class="mx-sm-auto col-sm-7">
            <h2 class="mb-5">New Link</h2>
            <label for="link-url" hidden>Link URL</label>
            <input id="link-url" v-model="newLink.url" v-focus type="text" placeholder="URL" class="form-control">

            <label for="link-title" hidden>Link Title</label>
            <input id="link-title" v-model="newLink.title" type="text" placeholder="Link Title" class="form-control">

            <label for="link-notes" hidden>Link Notes</label>
            <input id="link-notes" v-model="newLink.notes" type="text" placeholder="Notes" class="form-control">

            <label for="link-topic" hidden>Link Topic</label>
            <select id="link-topic" v-model="newLink.topicId" class="form-control">
              <option v-for="topic in topics" v-bind:key="topic.id" v-bind:value="topic.id">
                {{ topic.name }}
              </option>
            </select>
            <button @click="save()" class="btn btn-primary mt-5 mb-3">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BaseApiService } from '../services/base_api_service'
import { Topic } from '../models/topic'
import { Link } from '../models/link'
import { TOAST_TYPE} from '../models/toast'

export default {
  name: 'lb-link-form',
  data() {
    return {
      topics: [],
      newLink: null,
    }
  },
  props: {
    showLinkCreate: Boolean
  },
  created() {
    this.topicsService.fetchAll('topics', Topic)
      .then((topics) => {
        this.topics = topics
      })
      .catch(() => {
        this.addToast([TOAST_TYPE.ERROR, 'Could not load Topics'])
      })
    this.resetNewLink()
  },
  computed: {
    ...mapGetters([
      'linksToDo'
    ]),
    topicsService() { return new BaseApiService() }
  },
  methods: {
    ...mapActions([
      'addToast',
      'addLink',
      'updateLinksToDo'
    ]),
    save() {
      this.addLink(this.newLink)
        .then(() => {
          this.resetNewLink()
          this.updateLinksToDo(this.linksToDo)
          this.$router.push('/library')
        })
    },
    resetNewLink() {
      this.newLink = new Link({ url: 'https://' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";

  .modal-container {
    @include default-font-measure;
    max-width: $modal-min-width;
    min-height: 1.3*$modal-min-height;
    background-color: $background-bright;
    border-radius: $thicker-border-size;
    box-shadow: 0 $thicker-border-size $normal-space rgba(0, 0, 0, 0.33);
    margin: 0 auto;
  }

  .create-link-form {
    background-color: $light-gray;

    h2 {
      @include default-font-measure;
      width: $normal-form-element-width;
    }

    input, select, button {
      width: $normal-form-element-width;
      height: $normal-form-element-height;
      padding: $normal-space;
      margin: 0 auto;
      float: none;
    }

    input, select {
      font-size: $font-size-title-small;
      font-weight: normal;
      color: $dark-gray;
      margin-top: 1.5*$normal-space;
    }

    button {
      @include default-button;
      min-width: 35%;
      margin: 0;
    }

    ::placeholder {
      font-size: $font-size-title-small;
      font-weight: normal;
      color: $gray;
    }

    .form-control {
      margin-left: 0
    }
  }
</style>
