module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Photo Album',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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

    vendor: ['bootstrap']
  },

  css: ['bootstrap/dist/css/bootstrap.min.css', 'font-awesome/css/font-awesome.min.css']
};
