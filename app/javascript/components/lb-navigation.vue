<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container nav-container">
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
    </div>
  </nav>
</template>

<script>
export default {
  name: 'lb-navigation',
}

</script>

<style lang="scss" scoped>
  @import '../stylesheets/shared';

  .nav-container {
    max-width: $max-width-nav;
  }

  nav {
    height: $nav-height;
    background-color: $dark-gray;
    font-size: $font-size-title-small;
  }

  .add-button {
    font-size: $font-size-title-small;
    font-weight: $font-weight-title;
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
    margin-left: 1.5 * $big-space;
  }

  .router-link-active {
    border-bottom: $background-bright $very-thick-border-size solid;
  }
</style>
