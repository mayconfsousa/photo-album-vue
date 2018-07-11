<template>
  <div>
    <div id="google-signin-btn" v-if="!$store.state.loggedIn"></div>
    <section class="container-fluid d-flex p-0" v-else>
      <app-album-list/>
      <section id="content" class="d-flex flex-column">
        <app-search-box/>
        <app-album-grid/>
      </section>
    </section>
  </div>
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
    window.addEventListener('resize', () => this.$store.commit('hideSidebar'));
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

#google-signin-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
