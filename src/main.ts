// @ts-nocheck

import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import App from './App.vue'
import Loading from './shared/components/PikachuLoading.vue'
import PokemonList from './components/PokemonList.vue'
import MainHeader from '@/shared/components/MainHeader.vue'
import MainHeaderPokemonDetail from '@/modules/pokemonDetail/MainHeader.vue'
import MainContentPokemonDetail from '@/modules/pokemonDetail/MainContent.vue'
import RootContainer from '@/shared/components/RootContainer.vue'
import HeaderImage from '@/shared/components/HeaderImage.vue'
import PokemonCard from '@/shared/components/PokemonCard.vue'
import MyPokemonBtn from '@/shared/components/MyPokemonBtn.vue'
import MainTitle from '@/shared/components/MainTitle.vue'
import BackBtn from '@/shared/components/BackBtn.vue'

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createPinia } from 'pinia'

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
  .component('RootContainer', RootContainer)
  .component('PikachuLoading', Loading)
  .component('PokemonList', PokemonList)
  .component('MainHeader', MainHeader)
  .component('HeaderImage', HeaderImage)
  .component('MainHeaderPokemonDetail', MainHeaderPokemonDetail)
  .component('MainContentPokemonDetail', MainContentPokemonDetail)
  .component('PokemonCard', PokemonCard)
  .component('MyPokemonBtn', MyPokemonBtn)
  .component('MainTitle', MainTitle)
  .component('BackBtn', BackBtn)

app
  .use(VueAwesomePaginate)
  .use(VueSweetalert2)
  .use(router)
  .use(createPinia())

app.mount('#app');
