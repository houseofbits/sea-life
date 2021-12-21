import DraggableElement from "@js/structures/DraggableElement";
import Vector2 from "@js/structures/Vector2";
import {PuzzleLayersEnum} from "@js/helpers/Constants";

export default [
    new DraggableElement({
        name: 'item1',
        initialPosition: new Vector2(0, 0),
        targetPosition: new Vector2(200, 200),
        layer: PuzzleLayersEnum.ORGANS_LAYER,
        image: 'red',
        mask: Vector2.createArrayOfVectorsFromNumbers([100, 100,  200, 200]),
    }),
    new DraggableElement({
        name: 'item2',
        initialPosition: new Vector2(100, 0),
        targetPosition: new Vector2(200, 200),
        layer: PuzzleLayersEnum.ORGANS_LAYER,
        image: 'green',
        mask: Vector2.createArrayOfVectorsFromNumbers([100, 100,  200, 200]),
    }),
    new DraggableElement({
        name: 'item3',
        initialPosition: new Vector2(200, 0),
        targetPosition: new Vector2(200, 200),
        layer: PuzzleLayersEnum.ORGANS_LAYER,
        image: 'blue',
        mask: Vector2.createArrayOfVectorsFromNumbers([100, 100,  200, 200]),
    }),
    new DraggableElement({
        name: 'item4',
        initialPosition: new Vector2(200, 0),
        targetPosition: new Vector2(200, 200),
        layer: PuzzleLayersEnum.SKIN_LAYER,
        image: 'orange',
        mask: Vector2.createArrayOfVectorsFromNumbers([100, 100,  200, 200]),
    }),
    new DraggableElement({
        name: 'item5',
        initialPosition: new Vector2(200, 0),
        targetPosition: new Vector2(400, 400),
        layer: PuzzleLayersEnum.SKIN_LAYER,
        image: 'purple',
        mask: Vector2.createArrayOfVectorsFromNumbers([100, 100,  200, 200]),
    }),

];