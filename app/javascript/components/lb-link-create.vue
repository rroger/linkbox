<template>
  <div class="modal-background">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container create-link-form p-3">
          <i @click="$emit('close')" class="material-icons md-48 close-x">close</i>
          <h2>New Link</h2>
          <p class="mt-5">
            <input v-model="newLink.url" type="text" placeholder="URL">
          </p>
          <p>
            <input v-model="newLink.title" type="text" placeholder="Link Title">
          </p>
          <p>
            <input v-model="newLink.notes" type="text" placeholder="Notes">
          </p>
          <p>
            <select v-model="newLink.topicId" class="form-contro">
              <option v-for="topic in topics" v-bind:key="topic.id" v-bind:value="topic.id">
                {{ topic.name }}
              </option>
            </select>
          </p>
          Link: {{ newLink }}
          <p class="mt-5">
            <button @click="save()" class="btn btn-primary">Save</button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { BaseApiService } from '../services/base_api_service'
import { Topic } from '../models/topic'
import { Link } from '../models/link'
import { TOAST_TYPE} from '../models/toast'

export default {
  name: 'lb-link-create',
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
    const topicsService = new BaseApiService()
    topicsService.fetchAll(`${topicsService.baseUrl}/topics`, Topic)
      .then((topics) => {
        this.topics = topics
      })
      .catch(() => {
        this.addToast([TOAST_TYPE.ERROR, 'Could not load Topics'])
      })
    this.newLink =  new Link({})
  },
  methods: {
    ...mapActions([
      'addToast',
      'addLink'
    ]),
    save() {
      this.addLink(this.newLink)
        .then(() => {
          this.newLink =  new Link({})
          this.$router.push('/library')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";

  .modal-container {
    @include default-font-measure;
      text-align: center;
      max-width: $modal-min-width;
      min-height: $modal-min-height;
      margin: 0 auto;
      background-color: $background-bright;
      border-radius: $thicker-border-size;
      box-shadow: 0 $thicker-border-size $normal-space rgba(0, 0, 0, 0.33);

    button {
    @include default-button;
      min-width: 35%;
      margin: $normal-space $small-space $small-space $small-space;
    }
  }

  .create-link-form {
    background-color: $light-gray;

    h2 {
      @include default-font-measure;
    }

    input, select, button {
      width: $normal-form-element-width;
      height: $normal-form-element-height;
      padding: $normal-space;
    }
  }
</style>
