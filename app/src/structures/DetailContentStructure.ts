import DetailViewConfigStructure from "@src/structures/DetailViewConfigStructure";
import DetailListItem from "@src/structures/DetailListItem";
import DetailCommonStructure from "@src/structures/DetailCommonStructure";

export default class DetailContentStructure {

    config: DetailViewConfigStructure = new DetailViewConfigStructure({});
    translatedItems: {[key: string]: Array<DetailListItem>} = {};
    translatedCommon: {[key: string]: DetailCommonStructure} = {};

}