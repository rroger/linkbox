<template>
  <div class="toasts">
    <transition-group
    name="custom-classes-transition"
    enter-active-class="animated slideInDown"
    leave-active-class="animated fadeOutUp"
    >
      <div v-bind:class="[toast.toastType]" class="toast" v-bind:key="toast.text" v-for="toast in toasts">
        <img class="toast-type-image" v-bind:key="toast.toastType" :src="icons[toast.toastType]"/>
        <label v-text="toast.text" ></label>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'lb-toaster',
  data() {
    return {
      icons: {
        'success': require('../images/check-circle.svg'),
        'error': require('../images/error.svg'),
        'info': ''
      }
    }
  },
  computed: {
    toasts () {
      return this.$store.state.toasts
    },
  },
}
</script>
<style lang='scss' scoped>
@import "../stylesheets/variables";

.toasts {
  font-size: $font-size-small;
  text-align: center;
  font-weight: $font-weight-toast;
  vertical-align: middle;
  color: $background-gray;
  min-height: $toast-block-height;
  line-height: $toast-line-height;

  .toast {
    height: $toast-line-height;
  }

  .success {
    background: $green-gray;
  }

  .error {
    background: $red;
  }

  .toast-type-image {
    height: 0.75 * $toast-line-height;
    margin-bottom: 0.15em;
  }
}
</style>
