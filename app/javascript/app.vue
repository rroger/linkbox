<template>
  <div id="app">
    <lb-navigation></lb-navigation>
    <div class="container-fluid main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LbNavigation from './components/lb-navigation'
  components: {
    'lb-navigation': LbNavigation
  }
}
</script>
