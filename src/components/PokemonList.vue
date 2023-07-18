<script lang="ts">
import { ref } from "vue";
import { useQuery } from '@vue/apollo-composable'
import AllPokemon from '../graphql/queries/AllPokemons'
import router from "@/router";
import { computed } from 'vue'

const currentPage = ref(1);

export default {
    props: ['type'],
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
        <MainTitle />
        <div class="pokemon-list-container">
            <p v-if="error">Something went wrong...</p>
            <p v-if="loading">
                <PikachuLoading />
            </p>
            <PokemonCard isFromMainMenu v-else :pokemons="newCurrListPokemon"
                :handleIntoPokemonDetail="handleIntoPokemonDetail" />
        </div>
    </div>
    <div v-if="loading">
        <PikachuLoading />
    </div>
    <div v-else class="pagination-container">
        <vue-awesome-paginate :total-items="result?.pokemons?.count" :items-per-page="pageLimit" :max-pages-shown="5"
            v-model="currentPage" :on-click="handlePagination" showJumpButtons />
    </div>
</template>

<style scoped>
.pokemon-list-container {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    height: 100%;
}

.pagination-container {
    display: flex;
    column-gap: 10px;
    justify-content: center;
}

.pagination-container .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.pagination-container .paginate-buttons:hover {
    background-color: #d8d8d8;
}

.pagination-container .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.pagination-container .active-page:hover {
    background-color: #2988c8;
}</style>