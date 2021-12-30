import DetailListItem from "@src/structures/DetailListItem";

export default class DetailListPageStructure {

    id: number = 0;
    group: number | null = null;
    items: Array<DetailListItem> = [];
    previousPageId: number | null = null;
    nextPageId: number | null = null;

    constructor(group: number | null, items: Array<DetailListItem>) {
        this.group = group;
        this.items = items;
    }
};