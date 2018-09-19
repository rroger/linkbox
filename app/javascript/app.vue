<template>
  <div id="app">
    <nav class="navbar navbar-light">
      <form class="form-inline" v-on:submit.prevent="onSubmit">
        <div class="input-group">
          <div class="input-group-prepend">
            <img src="/public/images/add-24-px.svg" />
          </div>
          <input class="btn btn-primary" type="submit" @click="sendtest()">
        </div>
      </form>
    </nav>
    <div class="container-fluid main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: 'Hello Vue!'
    }
  },
  methods: {
    onSubmit() {},
  }
}
</script>

<style lang="scss" scoped>
  /*@import '../assets/stylesheets/landing.scss';*/
</style>
