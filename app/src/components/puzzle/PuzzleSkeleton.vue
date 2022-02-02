<script setup lang="ts">
import PuzzleElement from "@src/components/PuzzleElement.vue";
import Puzzle from "@src/composables/Puzzle";
import SkeletonPuzzlePieces from "@src/helpers/SkeletonPuzzlePieces";
import IconCallout from "@src/components/puzzle/IconCallout.vue";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";
import Vector2 from "@src/structures/Vector2";

const emit = defineEmits(['next']);

const {draggableElements, dragStart, onElementPlaced, isComplete} = Puzzle(SkeletonPuzzlePieces);

const calloutConf = [
  new CalloutConfigStructure({
    size: new Vector2(0, 240),
    position: new Vector2(452, 535),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    size: new Vector2(0, 240),
    position: new Vector2(814, 470),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    size: new Vector2(0, 240),
    position: new Vector2(1480, 520),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    size: new Vector2(0, 120),
    position: new Vector2(1230, 280),
    type: CalloutTypeEnum.TOP_LEFT
  })
];

</script>
<template>

  <img class="bones-image" alt="" src="/images/Skelets.png"/>

  <puzzle-element
      v-for="(element, index) in draggableElements"
      :key="element.name"
      :config="element"
      class="card-element"
      @placed="onElementPlaced"
      @drag:start="dragStart(element)">

    <div>
        {{ element.metadata.text }}
    </div>
  </puzzle-element>

  <icon-callout v-for="callout in calloutConf" :config="callout"/>

  <div class="next-puzzle-button" @click="emit('next')">
    <span>Iekšējā uzbūve</span>
    <img src="@images/chevron-right.svg" alt="">
  </div>

</template>