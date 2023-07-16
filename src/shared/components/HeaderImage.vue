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