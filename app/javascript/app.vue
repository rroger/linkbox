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

<style lang="scss">
  @import "./stylesheets/shared";

  body {
    font-family: $font-family-base;
    background-color: $background-bright;
    min-height:100vh
  }

  .main-container {
    margin-top: $app-wide-min-top-margin;
    max-width: 100vw;
    padding: 0;
  }
</style>
