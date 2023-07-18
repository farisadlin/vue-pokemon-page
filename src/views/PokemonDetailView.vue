<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { useRoute } from 'vue-router';
import PokemonDetail from '../graphql/queries/PokemonDetail'

import router from '@/router';

export default {
    props: ["type"],
    methods: {
        handleGoBack() {
            router.go(-1)
        }
    },
    setup(props) {
        const route = useRoute();
        const pokemonName = route.params.pokemonName;
        const { result, loading, error } = useQuery(PokemonDetail, () => ({
            type: props.type,
            name: pokemonName,
        }));
        return {
            result,
            loading,
            error
        };
    }
}
</script>

<template>
    <RootContainer>
        <p v-if="error">Something went wrong...</p>
        <p v-if="loading">
            <PikachuLoading />
        </p>
        <div class="container" v-else>
            <MainHeaderPokemonDetail :pokemonName="result.pokemon.name" />
            <MainContentPokemonDetail :pokemonId="result.pokemon.id" :pokemonName="result.pokemon.name"
                :urlImg="result.pokemon.sprites.front_default" :pokemonTypes="result.pokemon.types"
                :pokemonMoves="result.pokemon.moves" />
        </div>
    </RootContainer>
</template>

<style scoped>
.container {
    padding: 0 15px;
}

.main-container {
    display: flex;
}
</style>