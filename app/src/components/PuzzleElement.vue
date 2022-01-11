<script setup lang="ts">
import Draggable from "@src/services/Draggable";
import DraggableElement from "@src/structures/DraggableElement";
import {computed, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import {PuzzleElementStateEnum} from "@src/helpers/PuzzleConstants";
import TextCalloutConfigStructure from "@src/structures/TextCalloutConfigStructure";
import Vector2 from "@src/structures/Vector2";
import {TextCalloutTypeEnum} from "@src/helpers/TextCalloutTypeEnum";
import TextCallout from "@src/components/TextCallout.vue";

const root = ref(null);

const emit = defineEmits(['drag:start', 'drag:end', 'drag:move']);

const props = defineProps({
  config: {
    type: DraggableElement,
    required: true
  }
});

const draggable = reactive(new Draggable(props.config));

const elementStyle = computed(() => {

  const remainder = 1.0 - props.config.initialScale;
  const scale = props.config.initialScale + draggable.getDistanceUnitValue() * remainder;
  const zIndex = draggable.isPlaced() ? props.config.finalLayer : props.config.zIndex;
  return {
    // backgroundColor: 'red',
    width: props.config.size.x + 'px',
    height: props.config.size.y + 'px',
    transform: 'translate(' + draggable.position.x + 'px, ' + draggable.position.y + 'px) scale(' + scale + ')',
    clipPath: "path('" + props.config.mask + "')",
    zIndex,
  };
});

const calloutConfig = new TextCalloutConfigStructure({
  size: new Vector2(300, 400),
  position: new Vector2(500, 500),
  type: TextCalloutTypeEnum.BOTTOM_LEFT,
});

watch(() => (draggable.state), (state: PuzzleElementStateEnum) => {
  if (state === PuzzleElementStateEnum.DRAG) {
    emit('drag:start');
  } else if (state === PuzzleElementStateEnum.NONE) {
    emit('drag:end');
  } else if (state === PuzzleElementStateEnum.PLACED) {
    calloutConfig.isActive = true;
  }
});

onMounted(() => draggable.registerEventHandlers(root.value));
onBeforeUnmount(() => draggable.unregisterEventHandlers());

</script>
<template>
  <div ref="root" class="puzzle-element" :style="elementStyle">
    <img :src="'/images/' + props.config.image" alt="">
  </div>

  <text-callout :config="calloutConfig" :hidden="!calloutConfig.isActive">
    asdfadsf asdf asdf asdf asdf asdf sadf sad fasdf sadf asdfsad
  </text-callout>

</template>
