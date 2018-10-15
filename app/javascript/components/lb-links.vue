<template>
  <div class="container links">
    <h2 class="mb-3">
      To do
      <span class="count">({{ linksToDoCount }})</span>
    </h2>
    <draggable v-model='linksToDo'>
      <div class="to-do"  v-bind:key="link.id" v-for="link in linksToDo">
          <lb-link-show :link="link"></lb-link-show>
        </div>
    </draggable>
    <h2 class="mt-3 mb-3">
      Completed
      <span class="count">({{ linksCompletedCount }})</span>
      <i v-show="linksCompletedCount > 0"
         class="expand-completed material-icons md 24 mr-1 collapsed pull-right"
         data-toggle="collapse"
         data-target="#completed-links"
         aria-expanded="false">
        keyboard_arrow_down
      </i>
    </h2>
    <div id="completed-links" class="completed collapse"  v-bind:key="link.id" v-for="link in linksCompleted">
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
      set(linksList) {
        this.updateLinksToDo(linksList)
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
      max-width: 800px;
    }

    .to-do {
    }

    .count {
      vertical-align: super;
      font-size: $font-size-small;
    }

    .expand-completed {
      cursor: pointer;
      float: right;
    }
  }
</style>
