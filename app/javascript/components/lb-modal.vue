<template>
  <div class="modal-background">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container container p-3">
          <i @click="close()" class="material-icons md-48 close-x">close</i>
          <div class="mx-sm-auto col-sm-7">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lb-modal',
  methods: {
    close() {
      this.$router.push(this.returnUrl)
    }
  },
  props: {
    'returnUrl': {
      default: '/library',
      type: String
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
    background-color: $light-gray;
    border-radius: $thicker-border-size;
    box-shadow: 0 $thicker-border-size $normal-space rgba(0, 0, 0, 0.33);
    overflow-y:auto;
  }
</style>
