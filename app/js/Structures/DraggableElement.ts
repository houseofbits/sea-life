import Vector2 from "@js/Structures/Vector2";

export default class DraggableElement {

    name: string = '';
    initialPosition: Vector2 = new Vector2(0,0);
    targetPosition: Vector2 = new Vector2(0,0);
    layer: number = 0;
    image: string = '';
    zIndex: number = 0;
    mask: Array<Vector2> = [];

    constructor(params: Partial<DraggableElement>) {
        Object.assign(this, params);
    }
}