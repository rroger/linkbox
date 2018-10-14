<template>
  <div class="link container-fluid">
    <div class="row">
      <div class="col-md-12 link-topic">
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
      <div class="col-md-12">
        <button data-toggle="collapse" :data-target="anchor(link)">
          <span>NOTES</span><i></i>
        </button>
        <div v-bind:id="link.htmlId()" class="notes">
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

</style>
