<script setup lang="ts">
import { ref } from 'vue'
const items = ref([
  { id: 1, owned: 1, name: "H1", urlImg: 'https://easydrawingguides.com/wp-content/uploads/2021/10/Cute-Chibi-Pikachu-Pokemon-step-by-step-drawing-tutorial-step-10.png' },
  { id: 2, owned: 2, name: "H2", urlImg: 'https://easydrawingguides.com/wp-content/uploads/2021/10/Cute-Chibi-Pikachu-Pokemon-step-by-step-drawing-tutorial-step-10.png' },
  { id: 3, owned: 3, name: "H3", urlImg: 'https://easydrawingguides.com/wp-content/uploads/2021/10/Cute-Chibi-Pikachu-Pokemon-step-by-step-drawing-tutorial-step-10.png' },
  { id: 4, owned: 4, name: "H4", urlImg: 'https://easydrawingguides.com/wp-content/uploads/2021/10/Cute-Chibi-Pikachu-Pokemon-step-by-step-drawing-tutorial-step-10.png' },
  { id: 5, owned: 5, name: "H5", urlImg: 'https://easydrawingguides.com/wp-content/uploads/2021/10/Cute-Chibi-Pikachu-Pokemon-step-by-step-drawing-tutorial-step-10.png' }
])
</script>

<template>
  <header>
    <img alt="Pokemon Logo" class="logo" src="@/assets/pokemon-logo.webp" width="350" height="150" />
    <button class="my-pokemon-btn">My Pokemon! <span class="my-pokemon-score">1</span></button>
  </header>
  <div>
    <p class="pokemon-title">Pokemon List</p>
    <div class="pokemon-list-container">
      <div class="pokemon-list-card" v-for="item in items" :key="item.id">
        <div class="pokemon-info-wrapper">
          <img class="pokemon-img" width="100" height="100" :src="item.urlImg" />
          <span class="pokemon-list-info__owned">Pokemon Owned: {{ item.owned }}</span>
        </div>
        <div class="pokemon-name">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
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

.pokemon-list-container {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  height: 100%;
}

.pokemon-list-card {
  width: 200px;
  height: 100%;
  margin: 0px 15px 15px;
}

.pokemon-info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid rgb(55, 97, 168);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: none;
}

.pokemon-list-info__owned {
  margin: 10px 0;
  color: rgb(55, 97, 168);
  font-size: 0.75rem;
}

.pokemon-name {
  text-align: center;
  background-color: rgb(55, 97, 168);
  padding: 10px;
  cursor: pointer;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: rgb(254, 202, 27);
  border-top: none;
}

.pokemon-img {
  margin: 10px 0;
}
</style>
