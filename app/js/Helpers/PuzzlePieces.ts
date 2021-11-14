import PuzzleElement from "@js/Structures/PuzzleElement";
import Vector2 from "@js/Structures/Vector2";

export default [
    new PuzzleElement({
        name: 'item1',
        initialPosition: new Vector2(0, 0),
        targetPosition: new Vector2(200, 200),
        layer: 1,
        image: 'red',
        mask: Vector2.createArrayOfVectorsFromNumbers([100, 100,  200, 200]),
    }),
    new PuzzleElement({
        name: 'item2',
        initialPosition: new Vector2(100, 0),
        targetPosition: new Vector2(200, 200),
        layer: 1,
        image: 'green',
        mask: Vector2.createArrayOfVectorsFromNumbers([100, 100,  200, 200]),
    }),
    new PuzzleElement({
        name: 'item3',
        initialPosition: new Vector2(200, 0),
        targetPosition: new Vector2(200, 200),
        layer: 1,
        image: 'blue',
        mask: Vector2.createArrayOfVectorsFromNumbers([100, 100,  200, 200]),
    }),
];