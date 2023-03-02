<template>
  <lb-modal class="modal-content" ref="modal">
    <div>
      <h2 class="mb-5">
        <span>New Link</span>
      </h2>
      <lb-link-form :link="newLink"></lb-link-form>
      <button @click="save()" class="btn btn-primary mt-2 mb-3">Save</button>
    </div>
  </lb-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Link } from '../models/link'
import LbLinkForm from './lb-link-form'
import LbModal from './lb-modal'

export default {
  name: 'lb-link-new',
  data() {
    return {
      newLink: null,
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
    this.resetNewLink()
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
      'addLink',
      'updateLinksToDo',
    ]),
    save() {
      this.addLink(this.newLink)
        .then(() => {
          this.resetNewLink()
          this.updateLinksToDo(this.linksToDo)
          this.$refs.modal.close()
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
</style>
