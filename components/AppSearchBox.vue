<template>
  <transition name="slide-fade">
    <div class="form-group d-flex justify-content-between" v-if="$store.state.searchMode">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" />
        <div class="input-group-append">
          <button class="btn btn-danger" @click="$store.commit('toggleSearchBoxMode')" aria-label="Disable search mode">Cancel</button>
        </div>
      </div>
    </div>
  </transition>
</template>
