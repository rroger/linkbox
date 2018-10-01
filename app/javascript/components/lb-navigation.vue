<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <button class="add-button ml-5">
      <img src="../images/add.svg" class="add-sign" />
      <span class="add-text">ADD LINK</span>
    </button>

    <ul class="navbar-nav ml-auto mr-5 nav-links-right">
      <li class="nav-item">
        <a class="nav-link " href="#">LIBRARY</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">TOPICS</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'lb-navigation'
}

</script>

<style lang="scss" scoped>
  @import '../stylesheets/variables';

  .add-button {
    width: 123px;
    height: 30px;
    background-color: white;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.1px;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    border: white 1px solid;

    .add-sign {
      width: 28px;
      height: 28px;
      fill: white;
      background-color: $dark-gray;
      float: left;
    }

    .add-text {
      vertical-align: middle;
      font-weight: 600;
    }
  }

  .nav-link {
    color: white !important;
  }

  .nav-links-right {
    font-size: 12px;
  }

  .router-link-active{
    border-bottom: white 3px solid;
  }
</style>
