<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <button class="add-button ml-5">
        <span class="add-frame">
          <img src="./images/add.svg" class="add-sign" />
        </span>
        <span class="add-text">ADD LINK</span>
      </button>

      <ul class="navbar-nav ml-auto mr-5">
        <li class="nav-item">
          <a class="nav-link " href="#">LIBRARY</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">TOPICS</a>
        </li>
      </ul>
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
    background-color: white;
    padding-left: 0;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.1px;

    .add-sign {
      width: 28px;
      height: 28px;
      object-fit: contain;
      fill: white;
      background-color: $dark-gray;
    }

    .add-text {
      vertical-align: middle;
      font-weight: 600;
    }
  }

  .nav-link {
    color: white !important;
  }

  .router-link-active{
    border-bottom: white 3px solid;
  }
</style>
