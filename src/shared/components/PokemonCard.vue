<script lang="ts">
import type { AllMyPokemonList } from '@/shared/types'
export default {
    props: {
        pokemons: {
            type: Array as () => Array<AllMyPokemonList>
        },
        handleIntoPokemonDetail: {
            type: Function
        }
    }
}
</script>

<template>
    <div class="pokemon-list-card" v-for="pokemon in pokemons" @click="handleIntoPokemonDetail?.(pokemon.name)"
        :key="pokemon.id">
        <div class="pokemon-info-wrapper">
            <img class="pokemon-img" width="100" height="100" :src="pokemon.image" />
            <span class="pokemon-list-info__owned">Pokemon Owned: {{ pokemon.owned }}</span>
        </div>
        <div class="pokemon-name">
            <span>{{ pokemon.name }}</span>
        </div>
    </div>
</template>

<style scoped>
.pokemon-list-card {
    width: 200px;
    height: 100%;
    margin: 0px 15px 15px;
}

.pokemon-info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid rgb(55, 97, 168);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom: none;
}

.pokemon-list-info__owned {
    margin: 10px 0;
    color: rgb(55, 97, 168);
    font-size: 0.75rem;
}

.pokemon-name {
    text-align: center;
    background-color: rgb(55, 97, 168);
    padding: 10px;
    cursor: pointer;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    color: rgb(254, 202, 27);
    border-top: none;
    text-transform: capitalize;
}

.pokemon-img {
    margin: 10px 0;
}
</style>