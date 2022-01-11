import Vector2 from "@src/structures/Vector2";
import {TextCalloutTypeEnum} from "@src/helpers/TextCalloutTypeEnum";

export default class TextCalloutConfigStructure {

    size: Vector2 = new Vector2(0, 0);
    position: Vector2 = new Vector2(0, 0);
    type: TextCalloutTypeEnum = TextCalloutTypeEnum.TOP_LEFT;
    isActive: boolean = false;

    constructor(params: Partial<TextCalloutConfigStructure>) {
        this.size = Vector2.create(params.size || {});
        this.position = Vector2.create(params.position || {});
        this.type = params.type || TextCalloutTypeEnum.TOP_LEFT;
        this.isActive = params.isActive || false;
    }
}