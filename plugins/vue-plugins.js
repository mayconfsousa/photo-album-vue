import Vue from 'vue';
import Viewer from 'v-viewer';

Vue.use(Viewer, {
  defaultOptions: {
    title: false,
    movable: false,
    fullscreen: false,
  },
});
