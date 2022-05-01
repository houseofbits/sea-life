
export default class DetailItemContent {

    title: string = '';
    content: string = '';

    constructor(params: Partial<DetailItemContent>) {
        this.title = params.title ?? '';
        this.content = params.content ?? '';
    }
}