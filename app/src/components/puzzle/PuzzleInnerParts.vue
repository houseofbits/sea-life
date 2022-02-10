<script setup lang="ts">
import PuzzleElement from "@src/components/PuzzleElement.vue";
import Puzzle from "@src/composables/Puzzle";
import InnerPartsPuzzlePieces from "@src/helpers/InnerPartsPuzzlePieces";
import IconCallout from "@src/components/puzzle/IconCallout.vue";
import DraggableElement from "@src/structures/DraggableElement";
import Draggable from "@src/services/Draggable";
import {onMounted, reactive, ref, watch} from "vue";

const emit = defineEmits(['prev', 'next']);

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

enum GroupState {
  HIDDEN = 0,
  ACTIVE = 1,
  PLACED = 2,
  COMPLETE = 3
}

const isInitialized = ref(false);
const elementCompletionState = reactive<{ [key: string]: GroupState }>({});

const {draggableElements, dragStart, onElementPlaced, isComplete} = Puzzle(InnerPartsPuzzlePieces);

const currentGroup = ref<number | null>(null);

function initGroupState(): void {
  for (const element of InnerPartsPuzzlePieces) {
    elementCompletionState[element.name] = GroupState.HIDDEN;
  }
}

function initFirstElements(): void {
  currentGroup.value = 0;
  for (const element of getGroupElements()) {
    elementCompletionState[element.name] = GroupState.ACTIVE;
  }
}

function getGroupElements(): DraggableElement[] {
  return draggableElements.filter(elem => elem.metadata.group === currentGroup.value);
}

function checkGroupState(): void {
  if (currentGroup.value !== null) {
    let isDone = true;
    for (const element of getGroupElements()) {
      if (!isElementPlaced(element.name)) {
        isDone = false;
      }
    }

    if (isDone) {
      for (const element of getGroupElements()) {
        elementCompletionState[element.name] = GroupState.COMPLETE;
      }
      currentGroup.value++;
      for (const element of getGroupElements()) {
        elementCompletionState[element.name] = GroupState.ACTIVE;
      }
    }
  }
}

function elementPlaced(name: string, dragable: Draggable): void {
  elementCompletionState[name] = GroupState.PLACED;
  checkGroupState();
  onElementPlaced(dragable);
}

function isElementPlaced(name: string): boolean {
  return elementCompletionState[name] === GroupState.PLACED;
}

function isElementCalloutHidden(name: string): boolean {
  return elementCompletionState[name] === GroupState.HIDDEN;
}

function isElementComplete(name: string): boolean {
  return elementCompletionState[name] === GroupState.COMPLETE;
}

function isElementPlacedAndComplete(name: string): boolean {
  return elementCompletionState[name] === GroupState.COMPLETE
      || elementCompletionState[name] === GroupState.PLACED;
}

function isElementPlaceable(name: string): boolean {
  return elementCompletionState[name] === GroupState.ACTIVE;
}

watch(() => props.isActive, () => {
  if (props.isActive && !isInitialized.value) {
    setTimeout(() => {
      initFirstElements();
      isInitialized.value = true;
    }, 500);
  }
});

onMounted(() => {
  initGroupState();
});

</script>
<template>

  <img class="inner-parts-image" alt="" src="/images/Zivs-Veders-Ieksas.png"/>

  <template v-for="(element, index) in draggableElements" :key="element.name">

    <puzzle-element
        :config="element"
        :is-placeable="isElementPlaceable(element.name)"
        class="card-element"
        :class="{faded:isElementComplete(element.name), complete: isElementPlacedAndComplete(element.name)}"
        @placed="(draggable: Draggable) => elementPlaced(element.name, draggable)"
        @drag:start="dragStart(element)">

      <div>{{ element.metadata.text }}</div>
    </puzzle-element>

    <icon-callout
        :class="{faded:isElementComplete(element.name)}"
        :config="element.metadata.callout"
        :hidden="isElementCalloutHidden(element.name)"
    />

  </template>

  <div class="prev-puzzle-button" @click="emit('prev')">
    <img src="@images/chevron-left.svg" alt="">
    <span>Skelets</span>
  </div>

  <div class="next-puzzle-button" @click="emit('next')">
    <span>Ārējā uzbūve</span>
    <img src="@images/chevron-right.svg" alt="">
  </div>

</template>