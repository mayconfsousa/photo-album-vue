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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Rubik'
      },
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'
      }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
      },
      {
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js'
      }
    ]
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
    }
  }
};
