import DraggableElement from "@src/structures/DraggableElement";
import {watch, onMounted, reactive, ref} from "vue";
import PuzzlePieces from "@src/helpers/PuzzlePieces";
import Draggable from "@src/services/Draggable";

export default (pieces: DraggableElement[], emit: any) => {

    const MAX_ELEMENTS_PER_LAYER = 20;

    const draggableElements = reactive(PuzzlePieces);
    const placedCount = ref(0);

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
            emit('complete');
        }
    });

    function onElementPlaced(element: Draggable): void {
        placedCount.value++;
    }

    onMounted(normalizeZIndexes);

    return {
        draggableElements,
        dragStart,
        onElementPlaced
    };
};