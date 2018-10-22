<template>
  <div class="container links">
    <h2 class="mb-3">
      To do
      <span class="count">({{ linksToDoCount }})</span>
    </h2>
    <draggable v-model='linksToDo'>
      <div class="to-do" v-bind:key="link.id" v-for="link in linksToDo">
          <lb-link-show :link="link"></lb-link-show>
        </div>
    </draggable>
    <div v-show="linksCompletedCount > 0" class="completed-section">
      <h2 class="mb-3 pt-4">
        Completed
        <span class="count">({{ linksCompletedCount }})</span>
        <span class="pull-right"
              @click="showCompletedSection = !showCompletedSection">
          <i v-if="!showCompletedSection"
             class="expand-completed material-icons mr-1">
            keyboard_arrow_down
          </i>
          <i v-else
             class="expand-completed material-icons mr-1">
            keyboard_arrow_up
          </i>
        </span>
      </h2>
      <div v-if="showCompletedSection" class="completed" v-bind:key="link.id" v-for="link in linksCompleted">
        <lb-link-show :link="link"></lb-link-show>
      </div>
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
  created() {
    this.fetchLinks()

  },
  data() {
    return {
      showCompletedSection: false,
    }
  },
  computed: {
    ...mapGetters([
      'linksToDoCount',
      'linksCompleted',
      'linksCompletedCount'
    ]),
    linksToDo: {
      get() {
        return this.$store.getters.linksToDo
      },
      set(linksList) {
        this.$store.dispatch('updateLinksToDo', linksList)
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchLinks'
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
