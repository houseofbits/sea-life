import DraggableElement from "@src/structures/DraggableElement";
import {watch, onMounted, reactive, ref} from "vue";
import Draggable from "@src/services/Draggable";

export default (pieces: DraggableElement[]) => {

    const MAX_ELEMENTS_PER_LAYER = 20;

    const draggableElements = reactive(pieces);
    const placedCount = ref(0);
    const isComplete = ref(false);

    function normalizeZIndexes() {
        draggableElements.sort((a, b) => {
            return (a.zIndex > b.zIndex) ? 1 : -1;
        });
        let i = 0;
        for (const element of draggableElements) {
            element.zIndex = element.layer * MAX_ELEMENTS_PER_LAYER + i;
            i++;
        }
    }

    function dragStart(element: DraggableElement) {
        element.zIndex = element.layer * MAX_ELEMENTS_PER_LAYER + (MAX_ELEMENTS_PER_LAYER - 1);
        normalizeZIndexes();
    }

    watch(placedCount, () => {
        if (placedCount.value >= draggableElements.length) {
            isComplete.value = true;
        }
    });

    function onElementPlaced(element: Draggable): void {
        placedCount.value++;
    }

    onMounted(normalizeZIndexes);

    return {
        draggableElements,
        dragStart,
        onElementPlaced,
        isComplete
    };
};