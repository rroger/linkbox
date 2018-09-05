<template>
  <div class="container">
    <div class="row mt-5">
      <div class="mr-auto col-md-4 ml-auto topics-form">
        <a class="topics-add" href="./">+ Add Topic</a>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TopicsComponent"
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/stylesheets/_variables.scss';

  .topics-form {
    border: 1px solid $dark-gray;
    padding: 10px;
  }
   .topics-add {
     color: $dark-gray;
   }
</style>
