import Vuex from 'vuex';
import _ from 'lodash';
import uuid from 'uuid/v1';

const LOCAL_STORAGE_KEY = 'photo-album-vue-store';

const createStore = () => {
  const store = new Vuex.Store({
    state: {
      sidebarVisible: false,
      searchMode: false,
      loggedIn: false,
      user: {},
      selectedAlbum: {},
      albums: [],
      mediaItems: [],
    },
    mutations: {
      initializeStore(state) {
        const store = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (store) {
          const storeData = JSON.parse(store);
          state.selectedAlbum = storeData.selectedAlbum;
          state.albums = storeData.albums;
          state.mediaItems = storeData.mediaItems;
        }
      },
      toggleSearchBoxMode(state) {
        state.searchMode = !state.searchMode;
        if (state.searchMode) state.sidebarVisible = false;
      },
      toggleSidebar(state) {
        state.sidebarVisible = !state.sidebarVisible;
      },
      hideSidebar(state) {
        state.sidebarVisible = false;
      },
      signIn(state, { profile, access_token }) {
        state.loggedIn = true;
        state.user = { name: profile.getName(), email: profile.getEmail(), access_token };
      },
      signOut(state) {
        state.loggedIn = false;
        state.user = {};
      },
      setMediaItems(state, mediaItems) {
        state.mediaItems = mediaItems;
      },
      selectAlbum(state, albumId) {
        state.selectedAlbum = state.albums.filter(a => a.id === albumId)[0];
        state.sidebarVisible = false;
      },
      addAlbum(state, albumTitle) {
        state.albums.push({ id: uuid(), title: albumTitle, mediaItems: [] });
      },
      removeAlbum(state, albumId) {
        _.remove(state.albums, album => album.id === albumId);
      },
      updateAlbumPhotos(state, { albumId, mediaItems }) {
        const albumIndex = _.findIndex(state.albums, album => album.id === albumId);
        state.albums[albumIndex].mediaItems = mediaItems;
        state.selectedAlbum = state.albums[albumIndex];
      },
    },
  });

  // Persist state
  store.subscribe((mutation, state) => {
    const { selectedAlbum, albums, mediaItems } = state;
    const store = { selectedAlbum, albums, mediaItems };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
  });

  return store;
};

export default createStore;
