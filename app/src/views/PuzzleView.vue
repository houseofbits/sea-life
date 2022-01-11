<script setup lang="ts">
import PuzzleElement from "@src/components/PuzzleElement.vue";
import PuzzlePieces from "@src/helpers/PuzzlePieces";
import {onMounted, reactive} from "vue";
import DraggableElement from "@src/structures/DraggableElement";
import {useRouter} from "vue-router";
import TextCallout from "@src/components/TextCallout.vue";
import TextCalloutConfigStructure from "@src/structures/TextCalloutConfigStructure";
import Vector2 from "@src/structures/Vector2";
import {TextCalloutTypeEnum} from "@src/helpers/TextCalloutTypeEnum";

const roter = useRouter();

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

function back(): void {
  roter.push('/game');
}

onMounted(normalizeZIndexes);

const calloutConfig = new TextCalloutConfigStructure({
  size: new Vector2(300, 400),
  position: new Vector2(500, 500),
  type: TextCalloutTypeEnum.TOP_LEFT
});


</script>
<template>
  <div class="content-1080p detail-list">
    <div class="header">
      <img src="@images/logo.svg" alt="" width="64">
      <div class="header-title">
        <span>
          Saliec Mencu
        </span>
      </div>
      <div class="languages flex">

      </div>
    </div>

    <div class="back-filter" @click="back">
      <img src="@images/arrow-left.svg" alt="">
      <span>Atpakaļ</span>
    </div>

    <img class="bones-image" alt="" src="/images/Skelets.png"/>

    <puzzle-element
        v-for="(element, index) in elements"
        :key="element.name"
        :config="element"
        @drag:start="dragStart(element)"/>

  </div>
</template>