import DetailViewConfigStructure from "@src/structures/DetailViewConfigStructure";
import DetailListItem from "@src/structures/DetailListItem";
import DetailCommonStructure from "@src/structures/DetailCommonStructure";
import MapItemStructure from "@src/structures/MapItemStructure";

export default class DetailContentStructure {

    config: DetailViewConfigStructure = new DetailViewConfigStructure({});
    items: Array<DetailListItem> = [];
    translatedCommon: {[key: string]: DetailCommonStructure} = {};
    mapItems: Array<MapItemStructure> = [];
};