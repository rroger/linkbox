<template>
  <div id="app">
    <lb-navigation></lb-navigation>
    <main role="main">
      <lb-toaster></lb-toaster>
      <div class="container main-container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import LbNavigation from './components/lb-navigation'
import LbToaster from './components/lb-toaster.vue'

export default {
  components: {
    'lb-navigation': LbNavigation,
    'lb-toaster': LbToaster
  }
}
</script>

<style lang="scss" scoped>
  @import "./stylesheets/shared";

  body {
    font-family: $font-family-base;
    background-color: $background-gray;
  }

  .main-container {
    margin-top: $nav-height + 1.5 * $toast-block-height;
    max-width: 100vw;
    padding: 0;
  }
</style>
