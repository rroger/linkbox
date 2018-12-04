<template>
  <div class="modal-background">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container container create-link-form p-3">
          <i @click="$emit('close')" class="material-icons md-48 close-x">close</i>
          <div class="mx-sm-auto col-sm-7">
            <h2 class="mb-5">
              <span>New Link</span>
            </h2>
            <lb-link-form :link="newLink"></lb-link-form>
            <button @click="save()" class="btn btn-primary mt-2 mb-3">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Link } from '../models/link'
import LbLinkForm from './lb-link-form'

export default {
  name: 'lb-link-new',
  data() {
    return {
      newLink: null,
    }
  },
  components: {
    'lb-link-form': LbLinkForm,
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
          this.closeFormModal()
        })
    },
    resetNewLink() {
      this.newLink = new Link({ url: 'https://' })
    },
    closeFormModal() {
      this.$router.push('/library')
    },
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
