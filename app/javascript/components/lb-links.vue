<template>
  <div class="container links">
    <h2>To do</h2>
    <h2>Completed</h2>
  </div>
</template>

<script>
export default {
  name: 'lb-links'
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
