import ElementTransform from "@src/structures/ElementTransform";
import {DetailItemType} from "@src/helpers/DetailItemType";
import DetailItemContent from "@src/structures/DetailItemContent";

export default class DetailListItem {
    id: number;
    group: DetailItemType;
    title: string;
    latinTitle: string;
    identifier: string;
    fact: string;
    order: string;
    family: string;
    imageFileName: string;
    thumbnailImageTransform: ElementTransform;
    detailImageTransform: ElementTransform;
    content: Array<DetailItemContent>;
    familyTextTransform: ElementTransform;
    factTextTransform: ElementTransform;
    translatedItems: { [key: string]: Partial<DetailListItem> } = {};

    constructor(params: Partial<DetailListItem>) {
        this.id = params?.id || 0;
        this.group = params?.group as DetailItemType || 0;
        this.title = params?.title || '';
        this.latinTitle = params?.latinTitle || '';
        this.identifier = params?.identifier || '';
        this.fact = params?.fact || '';
        this.order = params?.order || '';
        this.family = params?.family || '';
        this.imageFileName = params?.imageFileName || '';
        this.thumbnailImageTransform = new ElementTransform(params?.thumbnailImageTransform || {});
        this.detailImageTransform = new ElementTransform(params?.detailImageTransform || {});
        this.familyTextTransform = new ElementTransform(params?.familyTextTransform || {});
        this.factTextTransform = new ElementTransform(params?.factTextTransform || {});

        this.content = [];
        if (params?.content) {
            this.content = params?.content.map(elem => new DetailItemContent(elem));
        }
    }

    getTranslatedItem(language: string): DetailListItem {
        const translated = this.translatedItems[language] || null;
        if (translated) {
            return new DetailListItem(Object.assign({}, this, translated));
        }
        return this;
    }
};