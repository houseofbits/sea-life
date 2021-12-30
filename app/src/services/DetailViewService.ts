import HttpService from "@src/services/HttpService";
import DetailViewConfigStructure from "@src/structures/DetailViewConfigStructure";
import DetailListItem from "@src/structures/DetailListItem";
import DetailCommonStructure from "@src/structures/DetailCommonStructure";
import DetailContentStructure from "@src/structures/DetailContentStructure";

class DetailViewService extends HttpService {

    async fetchConfig(): Promise<DetailViewConfigStructure> {
        return new DetailViewConfigStructure(await this.get('config.json'));
    }

    async fetchAllContent(): Promise<DetailContentStructure> {
        const structure = new DetailContentStructure();

        structure.config = await this.fetchConfig();

        for (const language of structure.config.languages) {
            const items = await this.fetchAllForLanguage(structure.config, language);

            this.preloadImages(items)

            structure.translatedItems[language] = items;//this.splitListItemsIntoPages(items);
            structure.translatedCommon[language] = await this.fetchCommonTexts(language);
        }

        return structure;
    }

    async fetchAllForLanguage(config: DetailViewConfigStructure, language: string = 'lv'): Promise<Array<DetailListItem>> {

        const promises = [];
        for (const listItemFilename of config.listItems) {
            promises.push(this.getContent(language, listItemFilename));
        }

        try {
            return (await Promise.all(promises)).map((params: any) => new DetailListItem(params));
        } catch (e: any) {
            return [];
        }
    }

    async fetchCommonTexts(language: string = 'lv'): Promise<DetailCommonStructure> {
        return new DetailCommonStructure(await this.getContent(language, 'common.json'));
    }

    preloadImages(translatedItems: Array<DetailListItem>): void {
        for (const item of translatedItems) {
            const image = new Image();
            image.src = '/images/' + item.imageFileName;
        }
    }
}

export default new DetailViewService();