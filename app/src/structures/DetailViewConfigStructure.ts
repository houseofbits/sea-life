
export default class DetailViewConfigStructure {
    languages: Array<string>;
    baseLanguage: string;
    listItems: Array<string>;

    constructor(params: Partial<DetailViewConfigStructure>) {
        this.languages = params?.languages || [];
        this.baseLanguage = params?.baseLanguage || '';
        this.listItems = params?.listItems || [];
    }
}