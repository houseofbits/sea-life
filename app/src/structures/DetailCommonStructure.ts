
export default class DetailCommonStructure {
    translations: {[key: string]: string} = {};

    constructor(params: Partial<DetailCommonStructure>) {
        Object.assign(this.translations, params);
    }
}