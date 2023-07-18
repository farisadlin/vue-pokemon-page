<script lang="ts">
export default {
    props: {
        title: String
    }
}
</script>

<template>
    <p class="pokemon-title">{{ title || 'Pokemon List' }}</p>
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
</style>