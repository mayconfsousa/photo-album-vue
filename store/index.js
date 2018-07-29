import _ from 'lodash';

export const state = () => ({
  sidebarVisible: false,
  searchMode: false,
  loggedIn: false,
  user: {},
  selectedAlbum: {},
  albums: [],
});

export const mutations = {
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
  selectAlbum(state, albumId) {
    state.selectedAlbum = state.albums.filter(a => a.id === albumId)[0];
    state.sidebarVisible = false;
  },
  setAlbums(state, albums) {
    state.albums = albums;
  },
  pushAlbum(state, album) {
    state.albums.push(album);
    state.albums = _.sortBy(state.albums, 'title');
  },
  signIn(state, { profile, access_token }) {
    state.loggedIn = true;
    state.user = { name: profile.getName(), email: profile.getEmail(), access_token };
  },
  signOut(state) {
    state.loggedIn = false;
    state.user = {};
  },
};
