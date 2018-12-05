<template>
  <lb-modal class="modal-content" ref="modal">
    <div>
      <h2 class="mb-5">
        <span>Edit Link</span>
      </h2>
      <lb-link-form :link="editLinkCopy"></lb-link-form>
      <button type="button" class="btn btn-outline-primary mt-2" @click="toggleConfirmationShown()">Delete</button>
      <button @click="save()" class="btn btn-primary mt-2 mb-3">Save</button>
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
  </lb-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Link } from '../models/link'
import { TOAST_TYPE} from '../models/toast'
import LbLinkForm from './lb-link-form'
import LbModal from './lb-modal'

export default {
  name: 'lb-link-edit',
  data() {
    return {
      topics: [],
      editLinkCopy: null,
      editLink: null,
      isConfirmationShown: false
    }
  },
  components: {
    'lb-link-form': LbLinkForm,
    'lb-modal': LbModal,
  },
  props: {
    showLinkCreate: Boolean
  },
  created() {
    this.loadData()
  },
  mounted() {
    if (!this.editLink) {
      this.$refs.modal.close()
      this.addToast([TOAST_TYPE.ERROR, 'Could not edit Link'])
    }
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
        this.editLinkCopy.toastSuccessMessage = true
        this.updateLink(this.editLinkCopy).then(() => {
          this.resetEditLinkCopy()
          this.editLink = null
          this.$refs.modal.close()
        })
      }
    },
    remove() {
      if (!this.editLink || !this.editLink.id) { throw 'Exception: No Link to delete'}
      this.deleteLink(this.editLink)
      this.$refs.modal.close()
    },
    loadData() {
      this.resetEditLinkCopy()
      const id = this.$route.params.id
      if (id) {
        this.editLink = this.link(id)
        if (this.editLink) {
          // according to stackoverflow the best way to clone a class instance in es6:
          // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
          this.editLinkCopy = Object.assign( Object.create( Object.getPrototypeOf(this.editLink)), this.editLink)
        }
      }
    },
    resetEditLinkCopy() {
      this.editLinkCopy = new Link({ url: 'https://' })
    },
    toggleConfirmationShown() {
      this.isConfirmationShown = !this.isConfirmationShown
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";
</style>
