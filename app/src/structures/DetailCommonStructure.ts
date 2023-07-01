
export default class DetailCommonStructure {

    title: string = '';
    backButton: string = '';
    order: string = '';
    family: string = '';
    mainFilterButton: string = '';
    map: string = '';
    learnMoreButton: string = '';
    groups: Array<{group: number, title: string}> = [];

    translations: {[key: string]: string} = {};

    constructor(params: Partial<DetailCommonStructure>) {
        Object.assign(this, params);

        Object.assign(this.translations, params);
    }
}