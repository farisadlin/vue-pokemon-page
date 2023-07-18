<script lang="ts">
export default {
    name: 'RootContainer',
}
</script>

<template>
    <div class='root-container'>
        <slot></slot>
    </div>
</template>

<style>
.root-container {
    max-width: 1280px;
    margin: 0 auto;
}
</style>