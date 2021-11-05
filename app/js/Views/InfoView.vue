<template>
    <div class="screen text-gray-500 bg-gray-100">
        Info page
    </div>
</template>

<script>
export default {
    name: "InfoView",
    data() {
        return {
            someText:'Test text'
        };
    },
    computed: {
        someTextModified() {
            return this.someText + ' modified';
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>

    .screen {
        position: absolute;
        width: 1024px;
        height: 768px;
    }

</style>