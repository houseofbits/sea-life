import DraggableElement from "@src/structures/DraggableElement";
import Vector2 from "@src/structures/Vector2";
import {PuzzleLayersEnum} from "@src/helpers/PuzzleConstants";

export default [
    new DraggableElement({
        name: 'item1',
        size: new Vector2(247, 179),
        initialPosition: new Vector2(874, 795),
        targetPosition: new Vector2(337, 422),
        layer: PuzzleLayersEnum.LAYER1,
        finalLayer: PuzzleLayersEnum.LAYER1,
        image: 'Galva.png',
        mask: 'M174 1L1 78V102L15 147L116 180H171L225 148L248 105V40L215 1H174Z',
    }),
    new DraggableElement({
        name: 'item2',
        size: new Vector2(967, 298),
        initialPosition: new Vector2(200, 776),
        targetPosition: new Vector2(472, 366),
        layer: PuzzleLayersEnum.LAYER1,
        finalLayer: PuzzleLayersEnum.LAYER0,
        image: 'Veders.png',
        mask: 'M65.5 198L1 225V247L150 277L264 299H499L690 259L834 203L967.953 175L968 95L709 40L415 1H226L109 26L49.5 51V63L86.5 95.5L95 147L65.5 198Z',
    }),
    new DraggableElement({
        name: 'item3',
        size: new Vector2(216, 190),
        initialPosition: new Vector2(1535, 758),
        targetPosition: new Vector2(1366, 401),
        layer: PuzzleLayersEnum.LAYER1,
        finalLayer: PuzzleLayersEnum.LAYER1,
        image: 'Aste.png',
        mask: 'M80 37L1 64.0466V133L16 137L99 180L134 191H193L208 165L217 128V48L206 14L193 1H157L80 37Z',
    }),



];