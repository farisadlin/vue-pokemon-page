<script lang="ts">
export default { 
    props: {
        isFromMainMenu: Boolean
    }
}
</script>

<template>
    <header :class="['main-header', { 'from-main-menu': isFromMainMenu }]">
        <HeaderImage />
        <div class="btn-wrapper">
            <BackBtn v-if="!isFromMainMenu" />
            <MyPokemonBtn />
        </div>
    </header>
</template>

<style scoped>
.main-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid #FECA1B;
    flex-direction: row-reverse;
}

.from-main-menu {
    flex-direction: row;
}

.btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>