<template>
<div v-bind:class="{ 'modal-background': showConfirmation }">
  <transition
      name="custom-classes-transition"
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
      :duration="250"
  >
    <div v-if="showConfirmation" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container p-3">
          <i @click="$emit('close')" class="fas fa-times close-x"></i>

          <div class="modal-body mt-5">
            <slot></slot>
          </div>

          <div class="mt-3 m-1">
            <button class="btn btn-outline-primary" @click="$emit('close')">
              Cancel
            </button>

            <button class="btn btn-primary" data-test="confirm-button" @click="$emit('close') && doAfterConfirm()">
              <slot name="confirm-button">
                Proceed
              </slot>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'lb-confirmation',
  data: function() {
    return {}
  },
  props: {
    showConfirmation: Boolean,
    headerMessage: String,
    bodyMessage: String,
    doAfterConfirm: Function
  }
}
</script>

<style lang='scss' scoped>
@import "../stylesheets/variables";

.modal-background {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  text-align: center;
  max-width: 800px;
  min-height: 300px;
  @include default-font-measure;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

  button {
    min-width: 35%;
    margin: 25px 5px 5px 5px;
    @include default-button;
  }
}

.close-x {
  float: right;
}
</style>
