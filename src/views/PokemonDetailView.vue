<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { useRoute } from 'vue-router';
import PokemonDetail from '../graphql/queries/PokemonDetail'

import router from '@/router';

import PikachuLoading from '@/shared/components/PikachuLoading.vue';
import MainHeader from '@/modules/pokemonDetail/MainHeader.vue';
import MainContent from '@/modules/pokemonDetail/MainContent.vue';

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
    },
    components: { MainHeader, PikachuLoading, MainContent }
}
</script>

<template>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">
        <PikachuLoading />
    </p>
    <div class="container" v-else>
        <MainHeader :pokemonName="result.pokemon.name" />
        <MainContent :pokemonId="result.pokemon.id" :pokemonName="result.pokemon.name" :urlImg="result.pokemon.sprites.front_default"
            :pokemonTypes="result.pokemon.types" :pokemonMoves="result.pokemon.moves" />
    </div>
</template>

<style scoped>
.container {
    padding: 0 15px;
}

.main-container {
    display: flex;
}
</style>