import ElementTransform from "@src/structures/ElementTransform";
import {DetailItemType} from "@src/helpers/DetailItemType";
import DetailItemContent from "@src/structures/DetailItemContent";

export default class DetailListItem {
    sourceFileName: string = '';
    id: number;
    group: DetailItemType;
    title: string;
    latinTitle: string;
    identifier: string;
    fact: string;
    orderTitle: string | null;
    order: string;
    family: string;
    imageFileName: string;
    mapImageFileName: string;
    videoFileName: string | null;
    thumbnailImageTransform: ElementTransform;
    detailImageTransform: ElementTransform;
    content: Array<DetailItemContent>;
    familyTextTransform: ElementTransform;
    factTextTransform: ElementTransform;
    translatedItems: { [key: string]: Partial<DetailListItem> } = {};
    // mapImageTransform: ElementTransform;

    constructor(params: Partial<DetailListItem>) {
        this.id = params?.id || 0;
        this.group = params?.group as DetailItemType || 0;
        this.title = params?.title || '';
        this.latinTitle = params?.latinTitle || '';
        this.identifier = params?.identifier || '';
        this.fact = params?.fact || '';
        this.orderTitle = params?.orderTitle || null;
        this.order = params?.order || '';
        this.family = params?.family || '';
        this.imageFileName = params?.imageFileName || '';
        this.mapImageFileName = params?.mapImageFileName || this.imageFileName;
        this.videoFileName = params?.videoFileName || null;
        this.thumbnailImageTransform = new ElementTransform(params?.thumbnailImageTransform || {});
        // this.mapImageTransform = new ElementTransform(params?.mapImageTransform || {});
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

    getLanguageItem(language: string): Partial<DetailListItem> | null {
        return this.translatedItems[language] || null;
    }
};