
export default class DetailListItem {
    id: number;
    title: string;
    identifier: string;
    imageUrl: string;

    constructor(params: Partial<DetailListItem>) {
        this.id = params?.id || 0;
        this.title = params?.title || '';
        this.identifier = params?.identifier || '';
        this.imageUrl = params?.imageUrl || '';
    }
};