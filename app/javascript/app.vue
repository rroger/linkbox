<template>
  <div id="app">
    <nav class="navbar navbar-light">
      <form class="form-inline" v-on:submit.prevent="onSubmit">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">@</span>
          </div>
          <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
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
