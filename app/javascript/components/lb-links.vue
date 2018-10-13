<template>
  <div class="container links">
    <h2>To do</h2>
      <div class="to-do"  v-bind:key="link.id" v-for="link in links">
        <lb-link-show :link="link"></lb-link-show>
      </div>
    <h2>Completed</h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LbLinkShow from './lb-link-show'

export default {
  name: 'lb-links',
  components: {
    'lb-link-show': LbLinkShow
  },
  data() {
    return {}
  },
  created() {
    this.fetchLinks()

  },
  computed: {
    ...mapGetters({ links: 'links' }),
  },
  methods: {
    ...mapActions(['fetchLinks']),
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";

  .links{
   h2 {
     @include default-font-measure;
   }
 }
</style>
