<script lang="ts">
import gql from 'graphql-tag'
import { ref } from "vue";
import { useQuery } from '@vue/apollo-composable'

const currentPage = ref(1);

const ALL_POKEMONS_QUERY = gql`
  query POKEMONS($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`

export default {
  props: ['type'],
  name: 'App',
  setup(props) {
    const pageLimit = 10;
    const { result, loading, error, fetchMore } = useQuery(ALL_POKEMONS_QUERY, () => ({
      type: props.type,
      offset: 0,
      limit: pageLimit
    }));

    function handlePagination(pageNumber: number = 1) {
      fetchMore({
        variables: {
          offset: (pageNumber - 1) * pageLimit
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          return fetchMoreResult;
        },
      })
    }

    return {
      result,
      loading,
      error,
      handlePagination,
      currentPage,
      pageLimit
    }
  }
}
</script>

<template>
  <header>
    <img alt="Pokemon Logo" class="logo" src="@/assets/pokemon-logo.webp" width="350" height="150" />
    <button class="my-pokemon-btn">My Pokemon! <span class="my-pokemon-score">1</span></button>
  </header>
  <div>
    <p class="pokemon-title">Pokemon List</p>
    <div class="pokemon-list-container">
      <p v-if="error">Something went wrong...</p>
      <p v-if="loading">Loading...</p>
      <div class="pokemon-list-card" v-else v-for="pokemon in result.pokemons.results" :key="pokemon.id">
        <div class="pokemon-info-wrapper">
          <img class="pokemon-img" width="100" height="100" :src="pokemon.image" />
          <span class="pokemon-list-info__owned">Pokemon Owned: {{ pokemon.owned }}</span>
        </div>
        <div class="pokemon-name">
          <span>{{ pokemon.name }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-container">
    <vue-awesome-paginate :total-items="result.pokemons.count" :items-per-page="pageLimit" :max-pages-shown="5"
      v-model="currentPage" :on-click="handlePagination" showJumpButtons />
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

.bottom-container {
  display: flex;
  justify-content: center;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
