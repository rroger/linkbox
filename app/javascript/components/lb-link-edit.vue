<template>
  <div class="modal-background">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container container create-link-form p-3">
          <i @click="$emit('close')" class="material-icons md-48 close-x">close</i>
          <div class="mx-sm-auto col-sm-7">
            <h2 class="mb-5">
              <span>Edit Link</span>
            </h2>
            <lb-link-form :link="newLink"></lb-link-form>
            <button type="button" class="btn btn-outline-primary mt-2" @click="toggleConfirmationShown()">Delete</button>
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
import { Link } from '../models/link'
import { TOAST_TYPE} from '../models/toast'
import LbLinkForm from './lb-link-form'

export default {
  name: 'lb-link-edit',
  data() {
    return {
      topics: [],
      newLink: null,
      editLink: null,
      isConfirmationShown: false
    }
  },
  components: {
    'lb-link-form': LbLinkForm,
  },
  props: {
    showLinkCreate: Boolean
  },
  created() {
    this.loadData()
  },
  computed: {
    ...mapGetters([
      'linksToDo',
      'link'
    ]),
  },
  methods: {
    ...mapActions([
      'addToast',
      'updateLink',
      'updateLinksToDo',
      'deleteLink'
    ]),
    save() {
      if (this.editLink) {
        this.newLink.toastSuccessMessage = true
        this.updateLink(this.newLink).then(() => {
          this.resetNewLink()
          this.editLink = null
          this.closeFormModal()
        })
      }
    },
    remove() {
      if (!this.editLink || !this.editLink.id) { throw 'Exception: No Link to delete'}
      this.deleteLink(this.editLink)
      this.closeFormModal()
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

    button {
      @include default-button;
      width: $normal-form-element-width;
      height: $normal-form-element-height;
      padding: $normal-space;
      margin: 0 auto;
      float: none;
      min-width: 35%;
    }
  }
</style>
