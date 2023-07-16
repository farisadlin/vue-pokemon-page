<script lang="ts">
import HeaderImage from '@/shared/components/HeaderImage.vue';
import router from '@/router';

export default {
    props: {
        pokemonName: String,
    },
    methods: {
        handleGoBack() {
            router.go(-1)
        },
        handleGoToBase() {
            router.push('/')
        }
    },
    components: { HeaderImage }
}
</script>

<template>
    <header class="header-container">
        <div class="header-container__left">
            <button class="back-btn" @click="handleGoBack">Back</button>
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

.back-btn {
    padding: 15px 20px;
    outline: none;
    border: none;
    border-radius: 15px;
    margin-bottom: 10px;
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