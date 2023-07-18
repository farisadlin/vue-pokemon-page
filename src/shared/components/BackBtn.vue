<script lang="ts">
import router from '@/router';

export default {
    methods: {
        handleGoBack() {
            router.go(-1)
        }
    }
}
</script>

<template>
    <button class="back-btn" @click="handleGoBack">Back</button>
</template>

<style scoped>
.back-btn {
    padding: 15px 20px;
    outline: none;
    border: none;
    border-radius: 15px;
    margin-bottom: 10px;
}
</style>