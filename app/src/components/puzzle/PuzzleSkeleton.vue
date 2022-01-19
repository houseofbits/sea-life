<script setup lang="ts">
import PuzzleElement from "@src/components/PuzzleElement.vue";
import Puzzle from "@src/composables/Puzzle";
import SkeletonPuzzlePieces from "@src/helpers/SkeletonPuzzlePieces";

const {draggableElements, dragStart, onElementPlaced, isComplete} = Puzzle(SkeletonPuzzlePieces);

</script>
<template>

  <img class="bones-image" alt="" src="/images/Skelets.png"/>

  <puzzle-element
      v-for="(element, index) in draggableElements"
      :key="element.name"
      :config="element"
      @placed="onElementPlaced"
      @drag:start="dragStart(element)">

    <img :src="'/images/' + element.image" alt="">

<!--    <div style="pointer-events:none; position:absolute; top:0; left:0; width: 100%; height: 100%; border: solid 1px black; background: lightgray">-->
<!--        SDfsadfasddfasdfasd-->
<!--    </div>-->

  </puzzle-element>

</template>