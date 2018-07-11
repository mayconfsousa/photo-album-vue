<template>
  <aside>
    <nav id="sidebar" :class="{show: $store.state.sidebarVisible}">
      <div id="sidebar-header" class="d-flex justify-content-between">
        <h3>Albums</h3>
        <button class="btn btn-primary btn--rounded" aria-label="Add new album">
          <i class="fa fa-plus" />
        </button>
      </div>
      <ul id="album-list" class="nav flex-column">
        <li class="nav-item d-flex align-items-center" :class="{active: $store.state.selectedAlbum.id === album.id}" v-for="album in $store.state.albums" :key="album.id">
          <i class="fa fa-image" />
          <a class="nav-link" href="#" @click="$store.commit('selectAlbum', album.id)">{{album.title}}</a>
        </li>
      </ul>
      <ul id="settings-list" class="nav flex-column">
        <li class="nav-item d-flex align-items-center">
          <i class="fa fa-sign-out" />
          <a class="nav-link" href="#" @click="$root.$emit('signOut')">Sign Out</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
#sidebar {
  min-width: 250px;
  max-width: 250px;
  height: 100%;
  transition: all 0.3s;
  padding: 10px;
  background: #f5f5f5;
  border-right: 1px solid #e0e0e0;
}

#sidebar-header {
  padding: 10px;
}

#album-list {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
}

#settings-list {
  padding-top: 20px;
}

#album-list li,
#settings-list li {
  padding-left: 10px;
}

#album-list a,
#album-list i,
#settings-list a,
#settings-list i {
  color: #424242;
  text-decoration: none;
  transition: all 0.3s;
}

#album-list a,
#settings-list a {
  width: 100%;
}

#album-list li:hover,
#settings-list li:hover {
  background: #e0e0e0;
}

.active i {
  color: #d32f2f !important;
}

.active a {
  color: #000 !important;
  font-weight: bold;
}

@media (max-width: 992px) {
  #sidebar {
    margin-left: -75%;
    min-width: 75%;
    max-width: 75%;
    position: fixed;
    z-index: 4;
  }

  #sidebar.show {
    margin-left: 0;
  }
}
</style>
