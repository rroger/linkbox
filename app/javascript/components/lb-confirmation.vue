<template>
<div>
  <transition
      name="custom-classes-transition"
      enter-active-class="animated pulse"
      leave-active-class="animated hinge"
  >
    <div v-if="showConfirmation" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <i @click="$emit('close')" class="fas fa-times close-x"></i>

          <div class="modal-body mt-5">
            <slot></slot>
          </div>

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
  </transition>
</div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  props: {
    showConfirmation: Boolean,
    headerMessage: String,
    bodyMessage: String,
    doAfterConfirm: Function
  }
};
</script>

<style lang='scss'>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  text-align: center;
  max-width: 800px;
  min-height: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  button {
    min-width: 30%;
    height: 48px;
    margin: 25px 5px 5px 5px;
  }
}

.modal-body {
  margin: 20px 0;
}

.close-x {
  float: right;
}
</style>
