import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import App from './App.vue'
import Loading from './shared/components/PikachuLoading.vue'
import PokemonList from './components/PokemonList.vue'
import MainHeader from './components/MainHeader.vue'
import MainHeaderPokemonDetail from './modules/pokemonDetail/MainHeader.vue'
import MainContentPokemonDetail from './modules/pokemonDetail/MainContent.vue'
import HeaderImage from './shared/components/HeaderImage.vue'

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import router from './router'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://graphql-pokeapi.graphcdn.app/',
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app
  .component('PikachuLoading', Loading)
  .component('PokemonList', PokemonList)
  .component('MainHeader', MainHeader)
  .component('HeaderImage', HeaderImage)
  .component('MainHeaderPokemonDetail', MainHeaderPokemonDetail)
  .component('MainContentPokemonDetail', MainContentPokemonDetail)

app
.use(VueAwesomePaginate)
.use(router)

app.mount('#app');
