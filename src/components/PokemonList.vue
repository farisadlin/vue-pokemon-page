<script lang="ts">
import { ref } from "vue";
import { useQuery } from '@vue/apollo-composable'
import PikachuLoading from '../shared/components/PikachuLoading.vue'
import AllPokemon from '../graphql/queries/AllPokemons'
import router from "@/router";
import { computed } from 'vue'

const currentPage = ref(1);

export default {
    props: ['type'],
    components: { PikachuLoading },
    methods: {
        handleIntoPokemonDetail(pokemonName: string) {
            router.push(`/pokemon-detail/${pokemonName}`)
        }
    },
    setup(props) {
        const pageLimit = 10;

        const { result, loading, error, fetchMore } = useQuery(AllPokemon, () => ({
            type: props.type,
            offset: 0,
            limit: pageLimit
        }), {
            fetchPolicy: 'cache-and-network'
        });

        const pokemons = computed(() => result.value?.pokemons ?? [])

        function handlePagination(pageNumber: number = 1) {
            fetchMore({
                variables: {
                    offset: (pageNumber - 1) * pageLimit
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return previousResult

                    return fetchMoreResult;
                },
            })
        }

        const currentListPokemonOwned = JSON.parse(localStorage.getItem("allMyPokemonList") || 'null');

        const countPokemonOwned: Record<number, number> = currentListPokemonOwned.reduce((acc: Record<number, number>, curr: { id: number }) => {
            return { ...acc, [curr.id]: (acc[curr.id] || 0) + 1 }
        }, {})

        const newCurrListPokemon = computed(() => pokemons?.value.results?.map((result: any) => {
            const id = result.id;
            if (Object.prototype.hasOwnProperty.call(countPokemonOwned, id)) {
                return { ...result, owned: countPokemonOwned[id] }
            }
            return { ...result, owned: 0 };
        }))

        return {
            result,
            loading,
            error,
            handlePagination,
            currentPage,
            pageLimit,
            newCurrListPokemon,
        }
    },
}

</script>

<template>
    <div>
        <p class="pokemon-title">Pokemon List</p>
        <div class="pokemon-list-container">
            <p v-if="error">Something went wrong...</p>
            <p v-if="loading">
                <PikachuLoading />
            </p>
            <div class="pokemon-list-card" v-else v-for="pokemon in newCurrListPokemon"
                @click="handleIntoPokemonDetail(pokemon.name)" :key="pokemon.id">
                <div class="pokemon-info-wrapper">
                    <img class="pokemon-img" width="100" height="100" :src="pokemon.image" />
                    <span class="pokemon-list-info__owned">Pokemon Owned: {{ pokemon.owned }}</span>
                </div>
                <div class="pokemon-name">
                    <span>{{ pokemon.name }}</span>
                </div>
            </div>
        </div>
    </div>
    <p v-if="loading">
        <PikachuLoading />
    </p>
    <div v-else class="bottom-container">
        <vue-awesome-paginate :total-items="result?.pokemons?.count" :items-per-page="pageLimit" :max-pages-shown="5"
            v-model="currentPage" :on-click="handlePagination" showJumpButtons />
    </div>
</template>

<style scoped>
.pokemon-title {
    font-family: "Segoe UI", sans-serif;
    font-size: 1rem;
    color: rgb(55, 97, 168);
    text-align: center;
    margin: 15px auto;
    background-color: rgb(238, 238, 238);
    width: 200px;
    padding: 5px 0px;
    border-radius: 15px;
}

.pokemon-list-container {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    height: 100%;
}

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

.bottom-container {
    display: flex;
    justify-content: center;
}

.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}
</style>../graphql/queries/AllPokemons