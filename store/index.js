import _ from 'lodash';

const albums = _.times(5).map(i => ({
  id: i + 1,
  name: `Album ${i + 1}`,
  photos: _.times(_.random(1, 20)).map(j => ({
    id: j + 1,
    src: `https://dummyimage.com/300x300/00897b/fff&text=Image${j + 1}`
  }))
}));

export const state = () => ({
  sidebarVisible: false,
  searchMode: false,
  selectedAlbum: albums[0],
  albums
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
  }
};
