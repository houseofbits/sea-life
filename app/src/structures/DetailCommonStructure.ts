
export default class DetailCommonStructure {

    title: string = '';
    backButton: string = '';
    order: string = '';
    family: string = '';

    constructor(params: Partial<DetailCommonStructure>) {
        Object.assign(this, params);
    }
}