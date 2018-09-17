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
      <div class="row">
        <div class="col-md-6  left-outlet">
          <div class="container">
            Some text
          </div>
        </div>
        <div class="col-md-6 right-outlet">
          <div class="container">
            And other
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: 'Hello Vue!'
    };
  },
  methods: {
    onSubmit() {},
  }
};
</script>

<style lang="scss" scoped>
  /*@import '../assets/stylesheets/landing.scss';*/
</style>
