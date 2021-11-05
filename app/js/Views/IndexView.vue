<template>
    <div class="container p-4">

        <router-link to="/game" class="btn btn-blue m-1">Game view</router-link>
        <router-link to="/info" class="btn btn-blue m-1">Information view</router-link>
    </div>
</template>

<script>
export default {
    name: "IndexView"
}
</script>

<style lang="scss" scoped>

.btn {
    @apply font-bold py-2 px-4 rounded;
}

.btn-blue {
    @apply bg-blue-500 text-white;
}

.btn-blue:hover {
    @apply bg-blue-700;
}
</style>