<script setup lang="ts">
import Draggable from "@js/Services/Draggable";
import DraggableElement from "@js/Structures/DraggableElement";
import {computed, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import {PuzzleElementStateEnum} from "@js/Helpers/Constants";

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
    return {
        backgroundColor: props.config.image,
        width: '200px',
        height: '200px',
        transform: 'translate(' + draggable.position.x + 'px, ' + draggable.position.y + 'px)',
        clipPath: 'circle(100px at center)',
        zIndex: props.config.zIndex,
    };
});

watch(() => (draggable.state), (state: PuzzleElementStateEnum) => {
    if (state === PuzzleElementStateEnum.DRAG) {
        emit('drag:start');
    } else if (state === PuzzleElementStateEnum.NONE) {
        emit('drag:end');
    }
});

onMounted(() => draggable.registerEventHandlers(root.value));
onBeforeUnmount(() => draggable.unregisterEventHandlers());

</script>
<template>
    <div ref="root" class="puzzle-element" :style="elementStyle"/>
</template>
