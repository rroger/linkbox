<template>
  <div class="link container">
    <div class="row">
      <div class="col-md-12 topic" v-bind:class="{ completed: link.completed }">
        <div class="rectangle" v-bind:style="{ backgroundColor: link.topicColor }"></div>
        <span>
          {{ link.topicName }}
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 link-url">
        <a v-bind:href="link.url" target="_blank">{{ link.title }}</a>
        <button @click="toggleCompleted()"
                v-bind:class="{ 'btn-outline-primary': !link.completed, 'btn-primary': link.completed, opaque: !link.completed}"
                class="pull-right btn complete-button">
          <i v-if="link.completed" class="material-icons mr-1 completed-icon">done</i>
          COMPLETE
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 additional">
        <span v-bind:class="{ 'notes-button': link.notes }">
          <a href="javascript:void(0)" @click="toggleShowNotes()" data-test="notes-show-link">
            <span>NOTES </span>
              <i v-if="link.notes && showNotes" class="material-icons">keyboard_arrow_up</i>
              <i v-if="link.notes && !showNotes" class="material-icons">keyboard_arrow_down</i>
          </a>
        </span>
        <a href="javascript:void(0)" @click="editLink()" class="ml-1" >EDIT</a>
        <div v-if="showNotes" class="notes">
          <span v-bind:key="row" v-for="row in link.notes.split('\n')">
            {{ row }}<br/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Link } from '../models/link'

export default {
  name: 'lb-link-show',
  props: {
    link: Link,
  },
  data() {
    return {
      showNotes: false
    }
  },
  methods: {
    ...mapActions([
      'updateLink'
    ]),
    toggleCompleted() {
      this.link.completed = !this.link.completed
      this.updateLink({id: this.link.id, completed: this.link.completed}) // TODO: don't switch position if it is not able to save
    },
    toggleShowNotes() {
      this.showNotes = !this.showNotes
    },
    editLink() {
      this.$router.push(`library/${this.link.id}/edit`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../stylesheets/shared";

  .link {
    line-height: $toast-line-height;

    .row {
      margin-top: $small-space;
      margin-bottom: $small-space;
    }

    .topic {
      background-color: $light-gray;
      font-size: $font-size-very-small;
      span {
        vertical-align: sub;
      }
    }

    .link-url {
      margin-top: $small-space;
      font-weight: normal;
      padding-right: 0;
    }

    .additional {
      font-size: $font-size-very-small;
      font-weight: bold;

      .material-icons {
        font-size: $font-size-small;
      }
    }

    a, .notes-button {
      cursor: pointer;
    }

    .complete-button {
      float: right;
      font-size: $font-size-very-small;
      font-weight: bold;
    }

    .completed-icon {
      font-size: $font-size-small;
      font-weight: bolder;
      vertical-align: sub;
    }

    .opaque {
      opacity: 0.5;
    }

    .notes {
      font-weight: normal;
    }

    .rectangle {
      width: 10px;
      height: 10px;
      display: inline-block;
      white-space: nowrap;
      position: relative;
      top: 3px;
      margin-right: $small-space;
    }

    .completed {
      background-color: $mid-gray;
    }
  }
</style>
