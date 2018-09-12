<template>
  <div class="toasts">
    <transition-group
    name="custom-classes-transition"
    enter-active-class="animated slideInDown"
    leave-active-class="animated fadeOutUp"
    >
      <div class="toast" v-bind:key="toast.text" v-for="toast in toasts">
        <label v-text="toast.text" ></label>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  computed: {
    toasts () {
      return this.$store.state.toasts
    },
  },
}
</script>
<style lang='scss' scoped>
@import "../../assets/stylesheets/_variables.scss";

.toasts {
  font-size: 10px;
  text-align: center;
  min-height: 40px;

  .toast {
    height: 20px;
    background: $green-gray;
  }
}
</style>
