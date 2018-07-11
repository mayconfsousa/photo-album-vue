module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Photo Album',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Photo Album Vue!' },
      {
        name: 'google-signin-client_id',
        content: '187910410871-mplu411oihsru3n0jkg3hh5l0ugoramn.apps.googleusercontent.com'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://apis.google.com/js/platform.js' }]
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#1976D2' },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
    vendor: ['bootstrap', 'lodash', 'axios']
  },

  modules: ['@nuxtjs/pwa'],

  manifest: {
    name: 'Photo Album Vue!',
    short_name: 'Photo Album',
    background_color: '#fafafa',
    theme_color: '#007bff'
  },

  plugins: ['~/plugins/vue-plugins.js'],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'font-awesome/css/font-awesome.min.css',
    'viewerjs/dist/viewer.css'
  ]
};
