<script setup lang="ts">
import Puzzle from "@src/composables/Puzzle";
import OuterPartsPuzzlePieces from "@src/helpers/OuterPartsPuzzlePieces";
import Draggable from "@src/services/Draggable";
import PuzzleElement from "@src/components/PuzzleElement.vue";
import IconCallout from "@src/components/puzzle/IconCallout.vue";
import {onMounted, reactive, watch, ref} from "vue";
import OuterPartsInformation from "@src/components/puzzle/OuterPartsInformation.vue";
import {useRouter} from "vue-router";

const emit = defineEmits(['prev', 'next']);
const router = useRouter();

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true
  }
});

const isActive = ref(false);

const isInitialized = ref(false);
const elementCompletionState = reactive<{ [key: string]: boolean }>({});

const {draggableElements, dragStart, onElementPlaced, isComplete} = Puzzle(OuterPartsPuzzlePieces);

function initGroupState(): void {
  for (const element of OuterPartsPuzzlePieces) {
    elementCompletionState[element.name] = false;
  }
}

function elementPlaced(name: string, dragable: Draggable): void {
  elementCompletionState[name] = true;
  onElementPlaced(dragable);
}

function isElementComplete(name: string): boolean {
  return elementCompletionState[name];
}

function navigateToMain(): void {
  router.push('/');
}

watch(() => isActive.value, () => {
    if (isActive && !isInitialized.value) {
        setTimeout(() => {
            isInitialized.value = true;
        }, 500);
    }
});

watch(() => props.isActive, () => {
    isActive.value = props.isActive;
});

onMounted(() => {
  initGroupState();

    setTimeout(() => {
        isActive.value = true;
    }, 200);
});

</script>
<template>

  <img class="outer-parts-image" :class={complete:isComplete} alt="" src="/images/Zivs-arpuse.png"/>

  <template v-for="(element, index) in draggableElements" :key="element.name">

    <puzzle-element
        :config="element"
        :is-placeable="true"
        class="card-element"
        :class="{faded:isElementComplete(element.name), complete: isElementComplete(element.name)}"
        @placed="(draggable: Draggable) => elementPlaced(element.name, draggable)"
        @drag:start="dragStart(element)">

      <div>{{ element.metadata.text }}</div>
    </puzzle-element>

    <icon-callout
        :class="{faded:isElementComplete(element.name)}"
        :config="element.metadata.callout"
        :hidden="!isInitialized"
    />

  </template>

<!--  <div class="prev-puzzle-button" @click="emit('prev')">-->
<!--    <img src="@images/chevron-left.svg" alt="">-->
<!--    <span>Iekšējā uzbūve</span>-->
<!--  </div>-->

  <outer-parts-information v-if="isComplete"/>

  <div class="page-navigation-link horizontal right" @click="emit('next')">
    <span>Skelets</span>
    <img src="@images/chevron-right.svg" alt="">
  </div>

</template>