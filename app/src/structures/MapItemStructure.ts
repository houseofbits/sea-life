import ElementTransform from "@src/structures/ElementTransform";

export default class MapItemStructure {
    itemId:number;
    imageFileName: string;
    transform: ElementTransform;

    constructor(params: Partial<MapItemStructure>) {
        this.itemId = params.itemId || 0;
        this.imageFileName = params.imageFileName || '';
        this.transform = new ElementTransform(params?.transform || {});
    }
};