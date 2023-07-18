<script lang="ts">
import router from '@/router';
import type { AllMyPokemonList } from '@/shared/types'
import { useTotalOwnedPokemons } from '@/stores/useTotalOwnedPokemons';
import { computed } from 'vue';
export default {
    props: {
        pokemons: {
            type: Array as () => Array<AllMyPokemonList>
        },
        isFromMainMenu: {
            type: Boolean
        },
        handleIntoPokemonDetail: {
            type: Function
        }
    },
    data() {
        return {
            currentListPokemonOwned: this.pokemons,
            updateKey: 0
        }
    },
    methods: {
        handleReleasePokemon(id: number, nickname: string) {
            const { handleUpdateTotalOwnedPokemons } = useTotalOwnedPokemons();
            const newCurrentListPokemonOwned = this?.currentListPokemonOwned?.filter((pokemon: AllMyPokemonList) => pokemon.id !== id || pokemon.nickname !== nickname)
            localStorage.clear();
            localStorage.setItem("allMyPokemonList", JSON.stringify(newCurrentListPokemonOwned));
            handleUpdateTotalOwnedPokemons(newCurrentListPokemonOwned?.length);

            const countPokemonOwned: Record<number, number> = newCurrentListPokemonOwned?.reduce((acc: Record<number, number>, curr: { id: number }) => {
                return { ...acc, [curr.id]: (acc[curr.id] || 0) + 1 }
            }, {}) || {}

            const newCurrListPokemon = computed(() => newCurrentListPokemonOwned?.map((result: any) => {
                const id = result.id;
                const owned = countPokemonOwned[id] ?? 0;
                return { ...result, owned };
            }))
            this.currentListPokemonOwned = newCurrListPokemon;
            this.updateKey++;
        },
        handleGoBack() {
            router.push('/')
        }
    },
}
</script>

<template>
    <div class="pokemon-list-card" v-for="pokemon in isFromMainMenu ? pokemons : currentListPokemonOwned" :key="pokemon.id">
        <div @click="handleIntoPokemonDetail?.(pokemon.name)" class="pokemon-info-wrapper">
            <img class="pokemon-img" width="100" height="100" :src="pokemon.image" />
            <span class="pokemon-list-info__owned">Pokemon Owned: {{ pokemon.owned }}</span>
        </div>
        <div class="pokemon-name">
            <span>{{ isFromMainMenu ? pokemon.name : pokemon.nickname }}</span>
        </div>
        <button @click="handleReleasePokemon(pokemon.id, pokemon.nickname)" class="release-btn"
            v-if="!isFromMainMenu">Release Pokemon</button>
    </div>
    <div class="no-my-pokemon-list-container" v-show="!isFromMainMenu && !currentListPokemonOwned?.length">
        <p>You don't have any current pokemon on your list. Let's go catch some Pokemons!</p>
        <div class="catch-pokemon-btn-container">
            <button @click="handleGoBack" class="catch-pokemon-btn">Catch the Pokemon!</button>
        </div>
    </div>
</template>

<style scoped>
.pokemon-list-card {
    width: 200px;
    height: 100%;
    margin: 0px 15px 15px;
    cursor: pointer;
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

.release-btn {
    width: 100%;
    border-radius: 15px;
    padding: 5px 30px;
    outline: none;
    background-color: rgb(239, 68, 68);
    border: 3px solid rgb(239, 68, 68);
    color: white;
    transition: all 0.1s ease 0s;
    cursor: pointer;
    margin-top: 5px;
}

.release-btn:hover {
    background-color: white;
    border: 3px solid rgb(239, 68, 68);
    color: rgb(239, 68, 68);
}

.no-my-pokemon-list-container {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    height: 400px;
    justify-content: center;
}

.catch-pokemon-btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
}

.catch-pokemon-btn {
    background-color: #3761A8;
    color: white;
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 20px;
    transition: 0.1s;
    cursor: pointer;
}

.catch-pokemon-btn:hover {
    filter: brightness(1.25);
}
</style>