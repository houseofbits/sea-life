
export default class DetailCommonStructure {

    title: string = '';
    backButton: string = '';
    order: string = '';
    family: string = '';
    mainFilterButton: string = '';
    map: string = '';
    groups: Array<{group: number, title: string}> = [];

    constructor(params: Partial<DetailCommonStructure>) {
        Object.assign(this, params);
    }
}