<script lang="ts">
import router from '@/router';
import type { SweetAlertResult } from 'sweetalert2';
import type { AllMyPokemonList } from '@/shared/types';

export default {
    props: {
        pokemonId: String,
        pokemonName: String,
        urlImg: String,
        pokemonTypes: {
            type: Array as () => Array<{ type: { name: string } }>,
        },
        pokemonMoves: {
            type: Array as () => Array<{ move: { name: string } }>,
        },
    },
    methods: {
        handleCatchPokemon() {
            const rand = Math.random();
            if (rand < 0.5) {
                this?.$swal({
                    icon: "error",
                    title: "Failed to Catch the Pokemon",
                    text: "Good luck for catching the pokemon next time!",
                }).then(() => {
                    router.replace("/");
                })
            } else {
                this?.$swal({
                    icon: "success",
                    title: "Successfully Caught the Pokemon!",
                    text: "Give your new Pokemon a nickname!",
                    html: `<input type="text" id="nickname" class="swal2-input" placeholder="Your pokemon nickname">`,
                    confirmButtonText: "Give Pokemon the Nickname",
                    allowOutsideClick: false,
                    focusConfirm: true,
                    preConfirm: () => {
                        const allMyPokemonList = JSON.parse(localStorage.getItem("allMyPokemonList") || 'null');

                        const nickname = (this?.$swal?.getPopup()?.querySelector("#nickname") as HTMLInputElement | null)?.value;

                        const matchedNickname = allMyPokemonList?.some((pokemon: AllMyPokemonList) => pokemon.nickname === nickname.toLowerCase() && pokemon.name === this?.pokemonName?.toLowerCase())

                        if (matchedNickname || !nickname || nickname === undefined) {
                            this?.$swal?.showValidationMessage(
                                matchedNickname
                                    ? `Current nickname for this pokemon has been taken. Please enter different nickname`
                                    : "Please enter nickname for the pokemon",
                            );
                        } else {
                            return { nickname: nickname };
                        }
                    },
                }).then((result: SweetAlertResult) => {
                    this?.$swal?.fire(
                        `Congratulation! Your Pokemon Nickname is ${result?.value?.nickname}`.trim(),
                    );
                    let allMyPokemonList = JSON.parse(localStorage.getItem("allMyPokemonList") || 'null');
                    if (allMyPokemonList == null) allMyPokemonList = [];

                    const myPokemon = {
                        id: this.pokemonId,
                        name: this.pokemonName,
                        nickname: result?.value?.nickname.toLowerCase(),
                        image: this.urlImg,
                    };

                    window.localStorage.setItem("myPokemon", JSON.stringify(myPokemon));
                    allMyPokemonList.push(myPokemon);
                    window.localStorage.setItem("allMyPokemonList", JSON.stringify(allMyPokemonList));
                }).then(() => {
                    router.replace("/my-pokemon-list");
                })
            };
        }
    }
}

</script>

<template>
    <div class="main-container">
        <div class="main-container__left pokemon-info">
            <div class="pokemon-info__image-wrapper">
                <img class="pokemon-img" :src="urlImg" />
            </div>
            <div class="pokemon-info__name">
                <span>{{ pokemonName }}</span>
            </div>
        </div>
        <div class="main-container__right pokemon-info">
            <p class="label">Types</p>
            <ul class="list-container">
                <li class='content' v-for="(pokemon, index) in pokemonTypes" :key="index">{{ pokemon.type.name }}
                </li>
            </ul>
            <p class="label">Moves</p>
            <ul class="list-container">
                <li class='content' v-for="(pokemon, index) in pokemonMoves" :key="index">{{ pokemon.move.name }}
                </li>
            </ul>
        </div>
    </div>
    <div class="catch-pokemon-btn-container">
        <button @click="handleCatchPokemon" class="catch-pokemon-btn">Catch the Pokemon!</button>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
}

.main-container__left.pokemon-info {
    width: 100%;
    padding-right: 30px;
}

.pokemon-info__image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid rgb(55, 97, 168);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom: none;
    min-height: 500px;
    justify-content: center;
}

.pokemon-info .pokemon-info__name {
    text-align: center;
    background-color: rgb(55, 97, 168);
    padding: 10px;
    cursor: pointer;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    color: rgb(254, 202, 27);
    border-top: none;
    text-transform: capitalize;
    font-size: 2rem;
}

.pokemon-info .pokemon-img {
    margin: 10px 0;
    width: 300px;
}

.main-container__right.pokemon-info {
    width: 100%;
    padding-left: 30px;
    flex-direction: column;
    align-items: center;
    border: 3px solid #FECA1B;
    border-radius: 15px;
}

.main-container__right.pokemon-info .label {
    color: #3761A8;
    font-weight: bold;
}

.main-container__right.pokemon-info .list-container {
    display: flex;
    padding: 0;
    list-style: none;
    flex-flow: row wrap;
    max-height: 300px;
    overflow-y: auto;
}

.list-container .content {
    width: 120px;
    text-transform: capitalize;
    color: grey;
    margin-bottom: 10px;
}

.catch-pokemon-btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
}

.catch-pokemon-btn {
    background-color: #3761A8;
    color: white;
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 20px;
    transition: 0.1s;
}

/* Media Queries */
@media (max-width: 600px) {

    /* Styles for mobile devices */
    .main-container {
        flex-direction: column;
    }

    .pokemon-info .pokemon-info__name {
        font-size: 1.5rem;
    }

    .main-container__left.pokemon-info {
        padding-right: 0px;
    }

    .main-container__right.pokemon-info {
        padding: 0 0px 10px 10px;
        margin-top: 20px;
        width: auto;
    }

    .pokemon-info .pokemon-img {
        width: 200px;
    }

    .catch-pokemon-btn-container {
        display: flex;
        justify-content: center;
        margin-top: 5px;
    }
}

@media (min-width: 601px) and (max-width: 1024px) {

    /* Styles for tablet devices */
    .main-container {
        flex-direction: column;
    }

    .main-container__left.pokemon-info {
        padding-right: 0px;
    }

    .main-container__right.pokemon-info {
        padding: 0 0px 10px 10px;
        margin-top: 20px;
        width: auto;
    }

    .pokemon-info .pokemon-img {
        width: 250px;
    }

    .catch-pokemon-btn-container {
        display: flex;
        justify-content: center;
        margin-top: 5px;
    }
}
</style>