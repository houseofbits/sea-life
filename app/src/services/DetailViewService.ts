import HttpService from "@src/services/HttpService";
import DetailViewConfigStructure from "@src/structures/DetailViewConfigStructure";
import DetailListItem from "@src/structures/DetailListItem";

class DetailViewService extends HttpService {

    config: DetailViewConfigStructure = new DetailViewConfigStructure({});
    translatedItems: {[key: string]: Array<DetailListItem>} = {};

    getItemForLanguage(language: string): Array<DetailListItem> {
        return this.translatedItems[language] || [];
    }

    async fetchConfig(): Promise<DetailViewConfigStructure> {
        return new DetailViewConfigStructure(await this.get('config.json'));
    }

    async fetchAll(): Promise<DetailViewService> {

        this.config = await this.fetchConfig();

        for (const language of this.config.languages) {
            this.translatedItems[language] = await this.fetchAllForLanguage(language);
        }

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

}

export default new DetailViewService();