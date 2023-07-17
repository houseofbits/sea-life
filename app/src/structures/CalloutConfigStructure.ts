import Vector2 from "@src/structures/Vector2";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";

export default class CalloutConfigStructure {

    size: Vector2 = new Vector2(0, 0);
    position: Vector2 = new Vector2(0, 0);
    type: CalloutTypeEnum = CalloutTypeEnum.TOP_LEFT;

    constructor(params: Partial<CalloutConfigStructure>) {
        this.size = Vector2.create(params.size || {});
        this.position = Vector2.create(params.position || {});
        this.type = params.type || CalloutTypeEnum.TOP_LEFT;
    }
}