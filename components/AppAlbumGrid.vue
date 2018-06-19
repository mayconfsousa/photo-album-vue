<template>
  <div id="album-grid" class="d-flex justify-content-between flex-wrap">
    <div class="item" v-for="photo in photos" v-bind:key="photo.id">
      <img v-bind:src="photo.src" alt="">
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    const photos = _.times(20).map(i => ({
      id: i + 1,
      src: `http://via.placeholder.com/300x300/00897B/fff&text=AFE IMAGE ${i + 1}`
    }));

    return { photos };
  }
};
</script>

<style scoped>
#album-grid:after {
  content: '';
  flex: auto;
}

#album-grid .item {
  width: 20%;
  padding: 3px;
}

#album-grid .item img {
  width: 100%;
}

@media (max-width: 768px) {
  #album-grid .item {
    width: calc(100% / 3);
  }
}
</style>
