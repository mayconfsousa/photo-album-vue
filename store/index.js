export const state = () => ({
  searchMode: false,
  albums: []
});

export const mutations = {
  toggleSearchBoxMode(state) {
    state.searchMode = !state.searchMode;
  }
};
