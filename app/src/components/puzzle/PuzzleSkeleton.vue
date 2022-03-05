<script setup lang="ts">
import PuzzleElement from "@src/components/PuzzleElement.vue";
import Puzzle from "@src/composables/Puzzle";
import SkeletonPuzzlePieces from "@src/helpers/SkeletonPuzzlePieces";
import IconCallout from "@src/components/puzzle/IconCallout.vue";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";
import Vector2 from "@src/structures/Vector2";
import {onMounted, reactive, ref} from "vue";
import Draggable from "@src/services/Draggable";

const emit = defineEmits(['prev', 'next']);

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

const {draggableElements, dragStart, onElementPlaced, isComplete} = Puzzle(SkeletonPuzzlePieces);

const calloutConf = [
  new CalloutConfigStructure({
    size: new Vector2(0, 240),
    position: new Vector2(452, 535),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    size: new Vector2(0, 240),
    position: new Vector2(900, 470),
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

const isActive = ref(false);

const elementCompletionState = reactive<{ [key: string]: boolean }>({});

function elementPlaced(name: string, dragable: Draggable): void {
  elementCompletionState[name] = true;
  onElementPlaced(dragable);
}

function isElementComplete(name: string): boolean {
  return elementCompletionState[name];
}

onMounted(() => {
  setTimeout(() => {
    isActive.value = true;
  }, 500);
});

</script>
<template>

  <img class="bones-image" alt="" src="/images/Skelets.png"/>

  <puzzle-element
      v-for="(element, index) in draggableElements"
      :key="element.name"
      :config="element"
      :is-placeable="true"
      class="card-element"
      :class="{complete: isElementComplete(element.name)}"
      @placed="(draggable: Draggable) => elementPlaced(element.name, draggable)"
      @drag:start="dragStart(element)">

    <div>{{ element.metadata.text }}</div>
  </puzzle-element>

  <icon-callout v-for="callout in calloutConf" :config="callout" :hidden="!isActive"/>

  <div class="next-puzzle-button" @click="emit('next')">
    <span>Iekšējā uzbūve</span>
    <img src="@images/chevron-right.svg" alt="" :class="{'bounce-right-anim': isComplete}">
  </div>

</template>