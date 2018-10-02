<template>
  <div id="app">
    <lb-navigation></lb-navigation>
    <lb-toaster></lb-toaster>
    <div class="container main-container">
      <router-view></router-view>
    </div>
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
