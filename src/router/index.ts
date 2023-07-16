import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'base',
    // lazy-loaded component
    component: () => import('../views/BaseView.vue')
  },
  {
    path: '/my-pokemon-list',
    name: 'myPokemonList',
    // lazy-loaded component
    component: () => import('../views/MyPokemonListView.vue')
  },
  {
    path: '/pokemon-detail/:pokemonName',
    name: 'pokemonDetail',
    // lazy-loaded component
    component: () => import('../views/PokemonDetailView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
