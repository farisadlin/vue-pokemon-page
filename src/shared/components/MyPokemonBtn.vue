<script lang="ts">
import router from '@/router';

export default {
    data() {
        return {
            currentListPokemonOwned: JSON.parse(localStorage.getItem("allMyPokemonList") || 'null').length
        }
    },
    methods: {
        handleGoToMyPokemon() {
            router.push('/my-pokemon-list')
        }
    },
}
</script>

<template>
    <button @click="handleGoToMyPokemon" class="my-pokemon-btn">My Pokemon! <span class="my-pokemon-score">
        {{ currentListPokemonOwned }}
    </span>
    </button>
</template>

<style scoped>
.my-pokemon-btn {
    margin: auto 0;
    padding: 0 20px;
    border-radius: 20px;
    border: 3px solid #FECA1B;
    font-size: 1rem;
    color: #3761A8;
    align-items: center;
    display: flex;
    transition: 0.1s;
    background-color: white;
    cursor: pointer;
    transition: 0.1s;
}

.my-pokemon-btn:hover {
    background-color: rgb(55, 97, 168);
    color: white;
    border: 3px solid white;
}

.my-pokemon-score {
    color: #FECA1B;
    font-size: 2rem;
    font-style: italic;
    font-weight: bold;
    margin: 0 0 0 10px;
}
</style>