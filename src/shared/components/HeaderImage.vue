<script lang="ts">
import router from "@/router";

export default {
    methods: {
        handleGoBack() {
            router.push('/')
        }
    },
}
</script>

<template>
    <img @click="handleGoBack" alt="Pokemon Logo" class="logo" src="@/assets/pokemon-logo.webp" width="250" height="100" />
</template>

<style scoped>
.logo {
    cursor: pointer;
}
/* Media Queries */
@media (max-width: 600px) {

    /* Styles for mobile devices */
    .logo {
        width: 150px;
        height: 75px;
    }
}

@media (min-width: 601px) and (max-width: 1024px) {

    /* Styles for tablet devices */
    .logo {
        width: 200px;
    }
}
</style>