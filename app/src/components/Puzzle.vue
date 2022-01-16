<script setup lang="ts">
import Puzzle from "@src/composables/Puzzle";
import DraggableElement from "@src/structures/DraggableElement";
import PuzzleElement from "@src/components/PuzzleElement.vue";

const emit = defineEmits(['complete']);

const props = defineProps({
  pieces: {
    type: Array,
    required: true
  }
});

const {draggableElements, dragStart, onElementPlaced} = Puzzle(props.pieces as DraggableElement[], emit);

</script>
<template>
  <puzzle-element
      v-for="(element, index) in draggableElements"
      :key="element.name"
      :config="element"
      @placed="onElementPlaced"
      @drag:start="dragStart(element)"/>
</template>