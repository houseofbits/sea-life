
export default class DetailListItem {
    id: number;
    group: number;
    title: string;
    latinTitle: string;
    identifier: string;
    imageFileName: string;
    iconTransform: string;
    detailTransform: string;

    constructor(params: Partial<DetailListItem>) {
        this.id = params?.id || 0;
        this.group = params?.group || 0;
        this.title = params?.title || '';
        this.latinTitle = params?.latinTitle || '';
        this.identifier = params?.identifier || '';
        this.imageFileName = params?.imageFileName || '';
        this.iconTransform = params?.iconTransform || '';
        this.detailTransform = params?.detailTransform || '';
    }
};