<script lang="ts">
import router from '@/router';

export default {
    props: {
        pokemonName: String,
    },
    methods: {
        handleGoToBase() {
            router.push('/')
        }
    }
}
</script>

<template>
    <header class="header-container">
        <div class="header-container__left">
            <BackBtn />
            <div class="breadcrumb-wrapper">
                <span @click="handleGoToBase" class="homepage">Home Page / </span>
                <span class="pokemon-name">{{ pokemonName }}</span>
            </div>
        </div>
        <div class="header-container__right">
            <HeaderImage />
        </div>
    </header>
</template>

<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.breadcrumb-wrapper {
    text-transform: capitalize;
}

.breadcrumb-wrapper .homepage {
    color: #cacaca;
}

.breadcrumb-wrapper .pokemon-name {
    color: black;
    font-size: 1.5rem;
}
</style>