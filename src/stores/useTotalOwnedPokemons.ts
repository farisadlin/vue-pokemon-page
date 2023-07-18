import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTotalOwnedPokemons = defineStore('total-owned-pokemons', () => {
  const currentListPokemonOwned = JSON.parse(localStorage.getItem("allMyPokemonList") || 'null');

  const totalOwned = ref(currentListPokemonOwned?.length)

  function handleUpdateTotalOwnedPokemons(updatedTotalOwned: number) {
    totalOwned.value = updatedTotalOwned
  }
  return { totalOwned, handleUpdateTotalOwnedPokemons }
})
