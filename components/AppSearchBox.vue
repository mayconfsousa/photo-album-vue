<template>
  <div>
    <div id="overlay" v-if="$store.state.sidebarVisible"></div>
    <transition name="slide-fade">
      <div v-if="$store.state.searchMode">
        <!-- Add Photos Header -->
        <div class="form-group d-flex justify-content-between">
          <h4>Select the photos to add to the album "{{$store.state.selectedAlbum.title}}"</h4>
          <div>
            <button class="btn btn-primary" @click="save()" aria-label="Enable search mode">Save</button>
            &nbsp;
            <button class="btn btn-secondary" @click="cancel()" aria-label="Enable search mode">Cancel</button>
          </div>
        </div>

        <!-- Add Photos Grid -->
        <div id="album-grid" class="d-flex justify-content-between flex-wrap">
          <div class="item" v-for="(mediaItem, index) in $store.state.mediaItems" :key="index" @click="toggleSelectedItem(mediaItem)">
            <img :src="mediaItem.baseUrl" alt="" :class="{selected: isSelected(mediaItem)}">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return { selectedPhotos: [] };
  },
  updated() {
    if (this.selectedPhotos.length === 0) {
      this.selectedPhotos = this.$store.state.selectedAlbum.mediaItems;
    }
  },
  methods: {
    toggleSelectedItem(mediaItem) {
      if (this.isSelected(mediaItem))
        this.selectedPhotos = _.filter(this.selectedPhotos, item => item.id !== mediaItem.id);
      else this.selectedPhotos.push(mediaItem);
    },
    isSelected(mediaItem) {
      return _.includes(this.selectedPhotos, mediaItem);
    },
    cancel() {
      this.selectedPhotos = [];
      this.$store.commit('toggleSearchBoxMode');
    },
    save() {
      this.$nextTick(async () => {
        this.$nuxt.$loading.start();

        this.$store.commit('updateAlbumPhotos', {
          albumId: this.$store.state.selectedAlbum.id,
          mediaItems: this.selectedPhotos,
        });

        this.selectedPhotos = [];
        this.$store.commit('toggleSearchBoxMode');

        this.$nuxt.$loading.finish();
      });
    },
  },
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

#album-grid .item:hover,
#album-grid .item:focus {
  cursor: pointer;
}

#album-grid .item img {
  width: 100%;
}

@media (max-width: 992px) {
  #album-grid .item {
    width: calc(100% / 4);
  }
}

@media (max-width: 768px) {
  #album-grid .item {
    width: calc(100% / 3);
  }
}

#overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  cursor: pointer;
}

.selected {
  border: 5px solid #007bff;
  border-radius: 2px;
}
</style>
