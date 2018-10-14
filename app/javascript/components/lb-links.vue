<template>
  <div class="container links">
    <h2>To do</h2>
    <draggable v-model='linksToDo'>
      <div class="to-do"  v-bind:key="link.id" v-for="link in linksToDo">
          <lb-link-show :link="link"></lb-link-show>
        </div>
    </draggable>
    <h2>Completed</h2>
    <div class="completed"  v-bind:key="link.id" v-for="link in linksCompleted">
      <lb-link-show :link="link"></lb-link-show>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Draggable from 'vuedraggable'
import LbLinkShow from './lb-link-show'

export default {
  name: 'lb-links',
  components: {
    'lb-link-show': LbLinkShow,
    'draggable': Draggable,
  },
  data() {
    return {}
  },
  created() {
    this.fetchLinks()

  },
  computed: {
    ...mapGetters([
      'links',
      'linksToDoCount',
      'linksCompleted',
      'linksCompletedCount'
    ]),
    linksToDo: {
      get() {
        return this.$store.getters.linksToDo
      },
      set(value) {
        this.updateLinksToDo(value)
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchLinks',
      'updateLinksToDo'
    ]),
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";

  .links {
    h2 {
      @include default-font-measure;
    }

    .to-do {
      border: #1b1a1b 1px solid;
    }
  }
</style>
