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
    cursor: pointer;
    padding: 15px 20px;
    outline: none;
    border: none;
    border-radius: 15px;
    margin-right: 10px;
    transition: 0.1s;
}

.back-btn:hover {
    background-color: rgb(239, 68, 68);
    color: white;
}

@media (max-width: 600px) {
    .back-btn {
        margin-bottom: 10px;
    }
}
</style>