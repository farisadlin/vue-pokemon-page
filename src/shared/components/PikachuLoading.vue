<template>
    <div class="loading-container">
        <img alt='Loading' src='../../assets/pikachu-loading.gif' width='150' height='100' />
        <p class="description">
            Loading ...
        </p>
    </div>
</template>

<style scoped>
.loading-container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.description {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 10px;
    color: #3761a8;
}
</style>