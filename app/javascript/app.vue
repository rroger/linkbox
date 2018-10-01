<template>
  <div id="app">
    <nav class="navbar navbar-light">
      <button class="add-button">
        <span class="add-frame">
          <img src="./images/add.svg" class="add-sign" />
        </span>
        <span class="add-text">ADD LINK</span>
      </button>
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
    height: 32px;
    background-color: #ffffff;
    padding-left: 0;
    margin-left: 50px;


    .add-frame {
      width: 28px;
      height: 28px;
      background-color: $dark-gray;
      display: inline-block;
      margin-left: -4px;

      .add-sign {
        width: 24px;
        height: 24px;
        object-fit: contain;
        fill: #ffffff;
      }

    }

    .add-text {
      vertical-align: middle;
      font-weight: 600;
    }
  }
</style>
