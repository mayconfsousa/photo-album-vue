<template>
  <transition name="slide-fade">
    <div class="form-group d-flex justify-content-between" v-if="$store.state.searchMode">
      <input type="text" class="form-control" placeholder="Search" v-focus="$store.state.searchMode" @blur="$store.commit('toggleSearchBoxMode')" />
    </div>
  </transition>
</template>
