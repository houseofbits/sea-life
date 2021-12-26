
export default class DetailItemContent {

    title: string = '';
    content: string = '';

    constructor(params: Partial<DetailItemContent>) {
        Object.assign(this, params);
    }
}