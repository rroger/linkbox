<template>
  <div id="app">
    <nav class="navbar navbar-light">
      <form class="form-inline" v-on:submit.prevent="onSubmit">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="add-button">
              <div class="add-frame">
                <img src="./images/add-24-px.svg" class="add-sign" />
              </div>
            </div>
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
  @import './stylesheets/variables';

  .add-button {
    width: 123px;
    height: 30px;
    background-color: #ffffff;

    .add-frame {
      width: 28px;
      height: 28px;
      background-color: $dark-gray;

      .add-sign {
        width: 24px;
        height: 24px;
        object-fit: contain;
        fill: white;
      }
    }

  }
</style>
