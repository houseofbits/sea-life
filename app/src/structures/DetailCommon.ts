
export default class DetailCommon {

    title: string = '';

    constructor(params: Partial<DetailCommon>) {
        Object.assign(this, params);
    }
}