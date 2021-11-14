<template>
    <div class="screen p-4">
        <router-link to="/game/puzzle" class="btn btn-blue m-1">Puzzle</router-link>
        <router-link to="/game/anim1" class="btn btn-blue m-1">Animation #1</router-link>
        <router-link to="/game/anim2" class="btn btn-blue m-1">Animation #2</router-link>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "GameView",
}
</script>

<style lang="scss" scoped>

</style>