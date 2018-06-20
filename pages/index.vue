<template>
  <section class="container-fluid d-flex p-0">
    <app-album-list/>
    <section id="content" class="d-flex flex-column">
      <app-search-box/>
      <app-album-grid/>
    </section>
  </section>
</template>

<script>
import AppAlbumList from '~/components/AppAlbumList';
import AppSearchBox from '~/components/AppSearchBox';
import AppAlbumGrid from '~/components/AppAlbumGrid';

export default {
  components: {
    AppAlbumList,
    AppSearchBox,
    AppAlbumGrid
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);

      window.addEventListener('resize', () => this.$store.commit('hideSidebar'));
    });
  }
};
</script>

<style scoped>
.container-fluid {
  margin-top: 56px;
  min-height: calc(100vh - 56px);
}

#content {
  padding: 20px;
  flex: 1;
}
</style>
