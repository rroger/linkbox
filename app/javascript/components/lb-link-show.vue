<template>
  <div class="link container">
    <div class="row">
      <div class="col-md-12 topic" v-bind:class="{ completed: link.completed }">
        <div class="rectangle"></div>
        <span>
          {{ link.topicName }}
        </span>
      </div>
    </div>
    <div class="row link-url">
      <div class="col-md-12">
        <a v-bind:href="link.url" target="_blank">{{ link.title }}</a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 additional">
        <span v-bind:class="{ 'notes-button': link.notes }" data-toggle="collapse" :data-target="link.htmlIdWithAnchor()" class="collapsed" aria-expanded="false">
          <span>NOTES </span>
          <i v-show="link.notes" class="material-icons mr-1">keyboard_arrow_down</i>
        </span>
        <div v-bind:id="link.htmlId()" class="notes collapse" >
          {{ link.notes }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Link } from '../models/link'
export default {
  name: 'lb-link-show',
  props: {
    link: Link,
  },
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
    }

    .additional {
      font-size: $font-size-very-small;
      font-weight: bold;

      .material-icons {
        font-size: $font-size-small;
      }
    }

    .notes-button {
      cursor: pointer;
    }

    .notes {
      font-weight: normal;
    }

    .rectangle {
      width: 10px;
      height: 10px;
      background-color: #a393ac;
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
