<template>
  <div class="link container">
    <div class="row">
      <div class="col-md-12 topic">
        {{ link.topicName }}
      </div>
    </div>
    <div class="row">
      <div class="col-md-10">
        <a v-bind:href="link.url" target="_blank">{{ link.title }}</a>
      </div>
      <div class="col-md-2">
        {{ link.completed }} {{ link.order }}
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 additional">
        <span v-bind:class="{ 'notes-button': link.notes }" data-toggle="collapse" :data-target="anchor(link)" class="collapsed" aria-expanded="false">
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
  methods: {
    anchor(link) {
      return `#${link.htmlId()}`
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
      background-color: $mid-gray;
      font-size: $font-size-very-small;
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

  }
</style>
