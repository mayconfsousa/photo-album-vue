<template>
  <div>
    <app-header/>
    <nuxt/>
  </div>
</template>

<script>
import { getAlbums, getMediaItems } from '~/api';

import AppHeader from '~/components/AppHeader';

export default {
  components: {
    AppHeader,
  },
  mounted() {
    this.renderGoogleSignInButton();
    this.$root.$on('signOut', this.onSignOut);
  },
  methods: {
    renderGoogleSignInButton() {
      window.gapi.signin2.render('google-signin-btn', {
        scope:
          'profile email https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.appendonly https://www.googleapis.com/auth/photoslibrary.sharing',
        width: 200,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: this.onSignIn,
      });
    },
    onSignIn(googleUser) {
      const profile = googleUser.getBasicProfile();
      const { access_token } = googleUser.getAuthResponse(true);
      this.$store.commit('signIn', { profile, access_token });
      this.getInitialData(access_token);
    },
    onSignOut() {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        this.$store.commit('signOut');
        setTimeout(this.renderGoogleSignInButton, 500);
      });
    },
    async getAlbums(access_token) {
      const albums = await getAlbums(access_token);
      this.$store.commit('setAlbums', albums);
    },
    async getMediaItems(access_token) {
      const mediaItems = await getMediaItems(access_token);
      this.$store.commit('setMediaItems', mediaItems);
    },
    getInitialData(access_token) {
      this.$nextTick(async () => {
        this.$nuxt.$loading.start();
        await Promise.all([this.getAlbums(access_token), this.getMediaItems(access_token)]);
        this.$nuxt.$loading.finish();
      });
    },
  },
};
</script>

<style>
body {
  background: #fafafa;
}

.btn--rounded {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 0;
}

/* Animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}
</style>
