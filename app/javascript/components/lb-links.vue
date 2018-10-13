<template>
  <div class="container links">
    <h2>To do</h2>
      <div class="link"  v-bind:key="link.id" v-for="link in links">
        <label v-text="link.title" ></label>
        <a>{{link.url}}</a>
      </div>
    <h2>Completed</h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'lb-links',
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
