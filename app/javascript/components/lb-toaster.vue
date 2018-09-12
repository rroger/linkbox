<template>
  <div class="toasts">
    <div class="toast" v-bind:key="toast.text" v-for="toast in toasts">
      <label v-text="toast.text" ></label>
    </div>
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
  background: $green-gray;
  font-size: 10px;
  text-align: center;

  .toast {
    min-height: 20px;
  }
}
</style>
