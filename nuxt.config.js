const axios = require('axios')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Storybolk + Nuxt = <3",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "An awesome blog about Nuxtjs and Storyblok" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios'
    [
      "storyblok-nuxt",
      { 
        accessToken: 
          process.env.NODE_ENV === 'production' 
          ? 'vIxJ40Bg6QTApHaYqRMbDAtt' 
          : "0Rx7b4X5PHwDOADKUZQhpgtt", 
        cacheProvider: "memory" 
      }
    ]
  ],

  generate: {
    routes: function () {
      return axios.get(
        'https://api.storyblok.com/v1/cdn/stories?version=published&token=vIxJ40Bg6QTApHaYqRMbDAtt&starts_with=blog&cv=' + 
          Math.floor(Date.now() / 1e3)
      )
      .then((res) => {
        const blogPosts = res.data.stories.map(bp => bp.full_slug)
        return [
          '/', 
          '/blog', 
          '/about', 
          ...blogPosts
        ]
      })
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
