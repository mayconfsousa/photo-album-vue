<template>
  <header>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="/">
        <img src="/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">Photo Album
      </a>
      <button class="navbar-toggler" type="button" @click="$store.commit('toggleSidebar')" aria-label="Toggle navigation">
        <i class="fa fa-bars" />
      </button>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  box-shadow: 0 8px 7px -7px #9e9e9e;
  margin-bottom: 0;
  background-color: #fff;
}

.navbar img {
  margin-right: 1em;
}
</style>
