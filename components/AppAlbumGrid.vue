<template>
  <transition name="slide-fade">
    <div v-if="!$store.state.searchMode">
      <!-- Album Header -->
      <div class="form-group d-flex justify-content-between">
        <h3>{{$store.state.selectedAlbum.name}}</h3>
        <button class="btn btn-primary btn--rounded" @click="$store.commit('toggleSearchBoxMode')">
          <i class="fa fa-plus" />
        </button>
      </div>

      <!-- Album Grid -->
      <div id="album-grid" class="d-flex justify-content-between flex-wrap">
        <div class="item" v-for="photo in $store.state.selectedAlbum.photos" v-bind:key="photo.id">
          <img v-bind:src="photo.src" alt="">
        </div>
      </div>
    </div>
  </transition>
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

#album-grid .item img {
  width: 100%;
}

@media (max-width: 768px) {
  #album-grid .item {
    width: calc(100% / 3);
  }
}
</style>
