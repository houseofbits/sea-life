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

        structure.items = [];
        for (const listItemFilename of structure.config.listItems) {
            const item = await this.fetchItem(listItemFilename, structure.config);
            structure.items.push(item);
        }

        for (const language of structure.config.languages) {
            structure.translatedCommon[language] = await this.fetchCommonTexts(language);
        }

        this.preloadImages(structure.items);

        return structure;
    }

    async fetchItem(filename: string, config: DetailViewConfigStructure): Promise<DetailListItem> {

        const item = new DetailListItem(await this.getContent(config.baseLanguage, filename));

        const additionalLanguages = config.languages.filter(lang => lang !== config.baseLanguage);

        for (const additionalLanguage of additionalLanguages) {
            try {
                item.translatedItems[additionalLanguage] = await this.getContent(additionalLanguage, filename);
            } catch (e: any) {
                console.error('Failed to load content of ' + additionalLanguage + ', ' + filename);
            }
        }

        return item;
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