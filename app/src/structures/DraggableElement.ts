import Vector2 from "@src/structures/Vector2";
import {PuzzleLayersEnum} from "@src/helpers/PuzzleConstants";

export default class DraggableElement {

    name: string = '';
    size: Vector2 = new Vector2(100,100);
    initialPosition: Vector2 = new Vector2(0,0);
    targetPosition: Vector2 = new Vector2(0,0);
    layer: number = PuzzleLayersEnum.LAYER1;
    finalLayer: number = PuzzleLayersEnum.LAYER1;
    zIndex: number = 0;
    mask: string | null = null;
    initialScale: number = 1.0;
    metadata: any = null;
    isAlignedCenter: boolean = true;

    constructor(params: Partial<DraggableElement>) {
        Object.assign(this, params);
    }
}