import Vector2 from "@js/Structures/Vector2";

export default class PuzzleElement {

    name: string = '';
    initialPosition: Vector2;
    targetPosition: Vector2;
    layer: number = 0;
    image: string = '';
    zIndex: number = 0;
    mask: Array<Vector2> = [];

    constructor(params: Partial<PuzzleElement>) {
        Object.assign(this, params);
    }
}