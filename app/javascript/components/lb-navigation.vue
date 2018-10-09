<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <button class="add-button ml-5">
      <img src="../images/add.svg" class="add-sign" />
      <span class="add-text pl-2 pr-2">
        ADD LINK
      </span>
    </button>

    <ul class="navbar-nav ml-auto mr-5 nav-links-right">
      <li class="nav-item">
        <router-link to="/library" class="nav-link">LIBRARY</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/topics" class="nav-link">TOPICS</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'lb-navigation',
}

</script>

<style lang="scss" scoped>
  @import '../stylesheets/shared';

  nav {
    height: $nav-height;
    background-color: $dark-gray;
  }
  .add-button {
    @include default-font-measure;
    background-color: $background-bright;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    border: $background-bright $normal-border-size solid;
    line-height: $nav-button-line-height;

    .add-sign {
      width: $nav-button-line-height;
      height: $nav-button-line-height;
      fill: $background-bright;
      background-color: $dark-gray;
      float: left;
    }

    .add-text {
      vertical-align: middle;
    }
  }

  .nav-link {
    color: $background-bright !important;
  }

  .nav-links-right {
    font-size: $font-size-title-small;
  }

  .router-link-active {
    border-bottom: $background-bright $very-thick-border-size solid;
  }
</style>
