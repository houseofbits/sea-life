<template>
    <div class="container">
        <div class="btn btn-blue m-1 cursor-pointer" @click="close">Close</div>
        <div v-html="content"></div>
    </div>
</template>

<script>
export default {
    name: "InfoDetailView",
    props: {
        content: {
            type: String,
            required: true
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>


</style>