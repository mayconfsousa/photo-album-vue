import _ from 'lodash';

const albums = _.times(5).map(i => ({
  id: i + 1,
  name: `Album ${i + 1}`,
  photos: _.times(_.random(1, 20)).map(j => ({
    id: j + 1,
    src: 'https://dummyimage.com/300x300/00897B/fff'
  }))
}));

export const state = () => ({
  searchMode: false,
  selectedAlbum: albums[0],
  albums
});

export const mutations = {
  toggleSearchBoxMode(state) {
    state.searchMode = !state.searchMode;
  },
  selectAlbum(state, albumId) {
    state.selectedAlbum = state.albums.filter(a => a.id === albumId)[0];
  }
};
