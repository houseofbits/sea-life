
export default class DetailViewConfigStructure {
    languages: Array<string>;
    listItems: Array<string>;

    constructor(params: Partial<DetailViewConfigStructure>) {
        this.languages = params?.languages || [];
        this.listItems = params?.listItems || [];
    }
}