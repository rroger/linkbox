<template>
  <div class="container">
    <div class="row mt-5">
      <div class="mr-auto col-md-4 ml-auto">
        <div class="topics-form">
          <a class="topics-add" href="./">+ Add Topic</a>
        </div>
        <hr />
        <ul>
          <li v-bind:key="topic.name" v-for="topic in topics">
            {{ topic.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'TopicsComponent',
  data() {
    return {
      topics: [{ name: 'Test Topic' }]
    };
  },
  created() {
    this.fetchTopics();
  },
  methods: {
    fetchTopics() {
      this.$http.get('http://localhost:3000/api/v1/topics').then(response => {
        const topics = _.map(response.body['data'], (raw) => {
          return raw.attributes;
        });
        this.topics = topics;
      });
    }
  }
};
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
