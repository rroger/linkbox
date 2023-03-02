<template>
  <div class=" links">
    <div class="todo-section container">
      <h2 class="mb-3">
        To do
        <span class="count">({{ linksToDoCount }})</span>
      </h2>
      <draggable v-model='linksToDo' class="mb-5">
        <div class="to-do" v-bind:key="link.id" v-for="link in linksToDo">
          <lb-link-show :link="link"></lb-link-show>
        </div>
      </draggable>
    </div>
    <div class="completed-section">
      <div class="completed-links container">
        <a class="pull-right"
              @click="toggleShowCompleted()">
          <h2 class="mb-3 pt-4 completed-title">
            Completed
            <span class="count">({{ linksCompletedCount }})</span>
              <i v-if="showCompletedSection"
                 class="expand-completed material-icons mr-1">
                keyboard_arrow_up
              </i>
              <i v-else
                 class="expand-completed material-icons mr-1">
                keyboard_arrow_down
              </i>
          </h2>
        </a>
        <div v-if="showCompletedSection" class="completed" v-bind:key="link.id" v-for="link in linksCompleted">
          <lb-link-show :link="link"></lb-link-show>
        </div>
      </div>
    </div>
    <lb-link-new v-if="showLinkNew()"></lb-link-new>
    <lb-link-edit v-if="showLinkEdit()"></lb-link-edit>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Draggable from 'vuedraggable'
import LbLinkShow from './lb-link-show'
import LbLinkNew from './lb-link-new'
import LbLinkEdit from './lb-link-edit'

export default {
  name: 'lb-links',
  components: {
    'lb-link-show': LbLinkShow,
    'lb-link-new': LbLinkNew,
    'lb-link-edit': LbLinkEdit,
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
    toggleShowCompleted() {
      this.showCompletedSection = !this.showCompletedSection
    },
    showLinkNew() {
      return !this.$route.params.id && this.$route.params.additional === 'new'
    },
    showLinkEdit() {
      return this.$route.params.id && this.$route.params.additional === 'edit'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";

  .links {
    overflow-x: hidden;

    h2 {
      @include default-font-measure;
    }

    .count {
      vertical-align: super;
      font-size: $font-size-small;
    }

    .expand-completed {
      float: right;
    }

    .todo-section {
      max-width: $max-width;
    }

    .completed-section {
      background-color: $light-gray;
      padding-bottom: $big-space;

      .completed-title {
        cursor: pointer;
      }

      .completed-links {
        max-width: $max-width;
      }
    }
  }
</style>
