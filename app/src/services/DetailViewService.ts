import HttpService from "@src/services/HttpService";
import DetailViewConfigStructure from "@src/structures/DetailViewConfigStructure";
import DetailListItem from "@src/structures/DetailListItem";
import DetailCommon from "@src/structures/DetailCommon";

class DetailViewService extends HttpService {

    config: DetailViewConfigStructure = new DetailViewConfigStructure({});
    translatedItems: {[key: string]: Array<DetailListItem>} = {};
    translatedCommon: {[key: string]: DetailCommon} = {};

    getItemForLanguage(language: string): Array<DetailListItem> {
        return this.translatedItems[language] || [];
    }

    getCommon(language: string): DetailCommon {
        return this.translatedCommon[language] || new DetailCommon({});
    }

    async fetchConfig(): Promise<DetailViewConfigStructure> {
        return new DetailViewConfigStructure(await this.get('config.json'));
    }

    async fetchAll(): Promise<DetailViewService> {

        this.config = await this.fetchConfig();

        for (const language of this.config.languages) {
            this.translatedItems[language] = await this.fetchAllForLanguage(language);
            this.translatedCommon[language] = await this.fetchCommonTexts(language);
        }

        this.preloadImages();

        return this;
    }

    async fetchAllForLanguage(language: string = 'lv'): Promise<Array<DetailListItem>> {

        const promises = [];
        for (const listItemFilename of this.config.listItems) {
            promises.push(this.getContent(language, listItemFilename));
        }

        try {
            return (await Promise.all(promises)).map((params: any) => new DetailListItem(params));
        } catch (e: any) {
            return [];
        }
    }

    async fetchCommonTexts(language: string = 'lv'): Promise<DetailCommon> {
        return new DetailCommon(await this.getContent(language, 'common.json'));
    }

    preloadImages(): void {
        for (const language in this.translatedItems) {
            for (const item of this.translatedItems[language]) {
                const image = new Image();
                image.src = '/images/' + item.imageFileName;
            }
        }
    }
}

export default new DetailViewService();