<template>
    <header>
        <HeaderImage />
        <button class="my-pokemon-btn">My Pokemon! <span class="my-pokemon-score">1</span></button>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid #FECA1B;
}

.my-pokemon-btn {
    margin: auto 0;
    padding: 10px 20px;
    border-radius: 20px;
    border: 3px solid #FECA1B;
    font-size: 1rem;
    color: #3761A8;
    align-items: center;
    display: flex;
    transition: 0.1s;
    background-color: white;
}

.my-pokemon-score {
    color: #FECA1B;
    font-size: 2rem;
    font-style: italic;
    font-weight: bold;
    margin: 0 0 0 10px;
}
</style>