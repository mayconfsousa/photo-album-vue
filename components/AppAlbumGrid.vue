<template>
  <div>
    <div id="overlay" v-if="$store.state.sidebarVisible"></div>
    <transition name="slide-fade">
      <div v-if="!$store.state.searchMode">
        <!-- Album Header -->
        <div class="form-group d-flex justify-content-between">
          <h3>{{$store.state.selectedAlbum.name}}</h3>
          <button class="btn btn-primary btn--rounded" @click="$store.commit('toggleSearchBoxMode')" aria-label="Enable search mode">
            <i class="fa fa-plus" />
          </button>
        </div>

        <!-- Album Grid -->
        <div id="album-grid" class="d-flex justify-content-between flex-wrap" v-viewer>
          <div class="item" v-for="photo in $store.state.selectedAlbum.photos" :key="photo.id">
            <img :src="photo.src" alt="">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

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
</style>
