<script lang="ts">
import router from "@/router";
import { computed } from 'vue'

export default {
    props: ['type'],
    methods: {
        handleIntoPokemonDetail(pokemonName: string) {
            router.push(`/pokemon-detail/${pokemonName}`)
        }
    },
    setup() {
        const pageLimit = 10;

        const currentListPokemonOwned = JSON.parse(localStorage.getItem("allMyPokemonList") || 'null');

        const countPokemonOwned: Record<number, number> = currentListPokemonOwned.reduce((acc: Record<number, number>, curr: { id: number }) => {
            return { ...acc, [curr.id]: (acc[curr.id] || 0) + 1 }
        }, {})

        const newCurrListPokemon = computed(() => currentListPokemonOwned?.map((result: any) => {
            const id = result.id;
            if (Object.prototype.hasOwnProperty.call(countPokemonOwned, id)) {
                return { ...result, owned: countPokemonOwned[id] }
            }
            return { ...result, owned: 0 };
        }))

        return {
            pageLimit,
            newCurrListPokemon,
        }
    },
}

</script>

<template>
    <RootContainer>
        <MainHeader />
        <div>
            <MainTitle title="My Pokemon List" />
            <div class="pokemon-list-container">
                <PokemonCard :pokemons="newCurrListPokemon" :handleIntoPokemonDetail="handleIntoPokemonDetail" />
            </div>
        </div>
    </RootContainer>
</template>

<style scoped>
.pokemon-list-container {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    height: 100%;
}
</style>