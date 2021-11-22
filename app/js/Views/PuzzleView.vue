<script setup lang="ts">
import PuzzleElement from "@js/Components/PuzzleElement.vue";
import PuzzlePieces from "@js/Helpers/PuzzlePieces";
import {reactive, onMounted} from "vue";
import DraggableElement from "@js/Structures/DraggableElement";

const MAX_ELEMENTS_PER_LAYER = 20;

const elements = reactive(PuzzlePieces);

function normalizeZIndexes() {
    elements.sort((a, b) => {
        return (a.zIndex > b.zIndex) ? 1 : -1;
    });
    let i = 0;
    for (const element of elements) {
        element.zIndex = element.layer * MAX_ELEMENTS_PER_LAYER + i;
        i++;
    }
}

function dragStart(element: DraggableElement) {
    element.zIndex = element.layer * MAX_ELEMENTS_PER_LAYER + (MAX_ELEMENTS_PER_LAYER - 1);
    normalizeZIndexes();
}

onMounted(normalizeZIndexes);

</script>
<template>
    <router-link to="/game" class="btn btn-blue m-1">Home</router-link>

    <puzzle-element
        v-for="(element, index) in elements"
        :key="element.name"
        :config="element"
        @drag:start="dragStart(element)"/>

</template>