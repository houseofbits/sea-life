import HttpService from "@src/services/HttpService";
import DetailViewConfigStructure from "@src/structures/DetailViewConfigStructure";
import DetailListItem from "@src/structures/DetailListItem";
import DetailCommonStructure from "@src/structures/DetailCommonStructure";
import DetailContentStructure from "@src/structures/DetailContentStructure";
import {isArray} from "lodash";
import MapItemStructure from "@src/structures/MapItemStructure";

class DetailViewService extends HttpService {

    async fetchConfig(): Promise<DetailViewConfigStructure> {
        return new DetailViewConfigStructure(await this.get('config.json'));
    }

    async fetchAllContent(): Promise<DetailContentStructure> {
        const structure = new DetailContentStructure();

        structure.config = await this.fetchConfig();

        structure.mapItems = await this.fetchMapItems();

        structure.items = [];
        for (const listItemFilename of structure.config.listItems) {
            const item = await this.fetchItem(listItemFilename, structure.config);
            structure.items.push(item);
        }

        structure.items.sort((a: DetailListItem, b: DetailListItem) => {
            const aVal = isArray(a.identifier) ? parseInt(a.identifier[0]) : parseInt(a.identifier);
            const bVal = isArray(b.identifier) ? parseInt(b.identifier[0]) : parseInt(b.identifier);
            return aVal - bVal;
        });

        for (const language of structure.config.languages) {
            structure.translatedCommon[language] = await this.fetchCommonTexts(language);
        }

        return structure;
    }

    async fetchItem(filename: string, config: DetailViewConfigStructure): Promise<DetailListItem> {

        const item = new DetailListItem(await this.getContent(config.baseLanguage, filename));
        item.sourceFileName = filename;

        const additionalLanguages = config.languages.filter(lang => lang !== config.baseLanguage);

        for (const additionalLanguage of additionalLanguages) {
            item.translatedItems[additionalLanguage] = await this.getContent(additionalLanguage, filename);
        }

        return item;
    }

    async fetchCommonTexts(language: string = 'lv'): Promise<DetailCommonStructure> {
        return new DetailCommonStructure(await this.getContent(language, 'common.json'));
    }

    async fetchMapItems(): Promise<Array<MapItemStructure>> {
        const items = await this.get('map.json');

        const mapItems = [];
        for (const item of items) {
            mapItems.push(new MapItemStructure(item));
        }

        return mapItems;
    }

    preloadImages(translatedItems: Array<DetailListItem>): void {
        for (const item of translatedItems) {
            const image = new Image();
            image.src = '/images/' + item.imageFileName;
        }
    }
}

export default new DetailViewService();