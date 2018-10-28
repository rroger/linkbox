<template>
  <div class="modal-background">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container container create-link-form p-3">
          <i @click="$emit('close')" class="material-icons md-48 close-x">close</i>
          <div class="mx-sm-auto col-sm-7">
            <h2 class="mb-5">
              <span v-if="editLink">Edit Link</span>
              <span v-else>New Link</span>
            </h2>

            <label for="link-url" hidden>Link URL</label>
            <input id="link-url" v-model="newLink.url" v-focus type="text" placeholder="URL" class="form-control">

            <label for="link-title" hidden>Link Title</label>
            <input id="link-title" v-model="newLink.title" type="text" placeholder="Link Title" class="form-control">

            <label for="link-notes" hidden>Link Notes</label>
            <input id="link-notes" v-model="newLink.notes" type="text" placeholder="Notes" class="form-control">

            <label for="link-topic" hidden>Link Topic</label>
            <select id="link-topic" v-model="newLink.topicId" class="form-control mb-5">
              <option v-for="topic in topics" v-bind:key="topic.id" v-bind:value="topic.id">
                {{ topic.name }}
              </option>
            </select>
            <button v-if="editLink" type="button" class="btn btn-outline-primary mt-2" @click="toggleConfirmationShown()">Delete</button>
            <button @click="save()" class="btn btn-primary mt-2 mb-3">Save</button>
          </div>
        </div>
      </div>
    </div>
    <lb-confirmation
        :showConfirmation="isConfirmationShown"
        :doAfterConfirm="remove"
        @close="toggleConfirmationShown"
    >
      <span v-if="editLink">
        Are you sure you want to delete '{{ editLink.title }}' from the Library?
      </span>
    </lb-confirmation>
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
      editLink: null,
      isConfirmationShown: false
    }
  },
  props: {
    showLinkCreate: Boolean
  },
  created() {
    this.loadTopics()
    this.loadData()
  },
  computed: {
    ...mapGetters([
      'linksToDo',
      'link'
    ]),
    topicsService() { return new BaseApiService() }
  },
  methods: {
    ...mapActions([
      'addToast',
      'addLink',
      'updateLink',
      'updateLinksToDo',
      'deleteLink'
    ]),
    save() {
      if (this.editLink) {
        this.updateLink(this.newLink).then(() => {
          this.resetNewLink()
          this.editLink = null
          this.closeFormModal()
        })
      } else {
        this.addLink(this.newLink)
          .then(() => {
            this.resetNewLink()
            this.updateLinksToDo(this.linksToDo)
            this.closeFormModal()
          })
      }
    },
    remove() {
      if (!this.editLink || !this.editLink.id) { throw 'Exception: No Link to delete'}
      this.deleteLink(this.editLink)
      this.closeFormModal()
    },
    loadTopics() {
      this.topicsService.fetchAll('topics', Topic)
        .then((topics) => {
          this.topics = topics
        })
        .catch(() => {
          this.addToast([TOAST_TYPE.ERROR, 'Could not load Topics'])
        })
    },
    loadData() {
      this.resetNewLink()
      const id = this.$route.params.id
      if (id) {
        this.editLink = this.link(id)
        if (this.editLink) {
          // according to stackoverflow the best way to clone a class instance in es6:
          // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
          this.newLink = Object.assign( Object.create( Object.getPrototypeOf(this.editLink)), this.editLink)
        } else {
          this.closeFormModal()
          this.addToast([TOAST_TYPE.ERROR, `Could not edit Link (id: ${id})`])
        }
      }
    },
    resetNewLink() {
      this.newLink = new Link({ url: 'https://' })
    },
    closeFormModal() {
      this.$router.push('/library')
    },
    toggleConfirmationShown() {
      this.isConfirmationShown = !this.isConfirmationShown
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";

  .modal-container {
    @include default-font-measure;
    max-width: $modal-min-width;
    max-height: calc(100vh - #{$app-wide-min-top-margin});
    background-color: $background-bright;
    border-radius: $thicker-border-size;
    box-shadow: 0 $thicker-border-size $normal-space rgba(0, 0, 0, 0.33);
    overflow-y:auto;
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
