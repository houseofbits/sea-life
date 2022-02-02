import DraggableElement from "@src/structures/DraggableElement";
import Vector2 from "@src/structures/Vector2";
import {PuzzleLayersEnum} from "@src/helpers/PuzzleConstants";

export default [
    new DraggableElement({
        name: 'item1',
        size: new Vector2(230, 74),
        initialPosition: new Vector2(384, 903),
        targetPosition: new Vector2(1480, 763),
        layer: PuzzleLayersEnum.LAYER1,
        finalLayer: PuzzleLayersEnum.LAYER1,
        isAlignedCenter: true,
        metadata: {
            text: "Aste",
        }
    }),
    new DraggableElement({
        name: 'item2',
        size: new Vector2(341, 74),
        initialPosition: new Vector2(709, 849),
        targetPosition: new Vector2(814, 711),
        layer: PuzzleLayersEnum.LAYER1,
        finalLayer: PuzzleLayersEnum.LAYER1,
        isAlignedCenter: true,
        metadata: {
            text: "Mugurkauls",
        }
    }),
    new DraggableElement({
        name: 'item3',
        size: new Vector2(331, 74),
        initialPosition: new Vector2(1119, 901),
        targetPosition: new Vector2(1230, 284),
        layer: PuzzleLayersEnum.LAYER1,
        finalLayer: PuzzleLayersEnum.LAYER1,
        isAlignedCenter: true,
        metadata: {
            text: "Spuru stari",
        }
    }),
    new DraggableElement({
        name: 'item4',
        size: new Vector2(357, 74),
        initialPosition: new Vector2(1497, 849),
        targetPosition: new Vector2(452, 779),
        layer: PuzzleLayersEnum.LAYER1,
        finalLayer: PuzzleLayersEnum.LAYER1,
        isAlignedCenter: true,
        metadata: {
            text: "Galvaskauss",
        }
    }),
];