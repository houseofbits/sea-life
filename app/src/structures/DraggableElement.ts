import Vector2 from "@src/structures/Vector2";

export default class DraggableElement {

    name: string = '';
    size: Vector2 = new Vector2(100,100);
    initialPosition: Vector2 = new Vector2(0,0);
    targetPosition: Vector2 = new Vector2(0,0);
    layer: number = 0;
    finalLayer: number = 0;
    image: string = '';
    zIndex: number = 0;
    mask: string = '';

    constructor(params: Partial<DraggableElement>) {
        Object.assign(this, params);
    }
}