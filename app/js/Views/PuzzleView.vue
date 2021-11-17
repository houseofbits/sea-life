<template>
    <router-link to="/game" class="btn btn-blue m-1">Home</router-link>

    <puzzle-element
        v-for="(element, index) in elements"
        :key="element.name"
        :config="element"
        @drag:start="dragStart(element)"/>

</template>

<script>
import PuzzleElement from "@js/Components/PuzzleElement.vue";
import PuzzlePieces from "@js/Helpers/PuzzlePieces";

const MAX_ELEMENTS_PER_LAYER = 20;
export default {
    name: "PuzzleView",
    components: {PuzzleElement},
    data() {
        return {
            elements: PuzzlePieces,
        };
    },
    methods: {
        dragStart(element) {
            element.zIndex = element.layer * MAX_ELEMENTS_PER_LAYER + (MAX_ELEMENTS_PER_LAYER - 1);
            this.normalizeZIndexes();
        },
        normalizeZIndexes() {
            this.elements.sort((a, b) => {
                return (a.zIndex > b.zIndex) ? 1 : -1;
            });
            let i = 0;
            for (const element of this.elements) {
                element.zIndex = element.layer * MAX_ELEMENTS_PER_LAYER + i;
                i++;
            }
        }
    },
    mounted() {
        this.normalizeZIndexes();
    }
}
</script>

<style scoped>

</style>