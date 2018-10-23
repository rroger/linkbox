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
              @click="toggleShowCompleted()">
          <i v-if="showCompletedSection"
             class="expand-completed material-icons mr-1">
            keyboard_arrow_up
          </i>
          <i v-else
             class="expand-completed material-icons mr-1">
            keyboard_arrow_down
          </i>
        </span>
      </h2>
      <div v-if="showCompletedSection" class="completed" v-bind:key="link.id" v-for="link in linksCompleted">
        <lb-link-show :link="link"></lb-link-show>
      </div>
    </div>
    <lb-link-create v-if="$route.params.additional === 'new'"
        @close="$router.push('/library')"
    ></lb-link-create>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Draggable from 'vuedraggable'
import LbLinkShow from './lb-link-show'
import LbLinkCreate from './lb-link-create'

export default {
  name: 'lb-links',
  components: {
    'lb-link-show': LbLinkShow,
    'lb-link-create': LbLinkCreate,
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
  data: () => {
    return {
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
    toggleShowCompleted() {
      this.showCompletedSection = !this.showCompletedSection
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";

  .links {
    h2 {
      @include default-font-measure;
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
