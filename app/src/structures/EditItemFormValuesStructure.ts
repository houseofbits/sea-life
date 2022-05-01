import DetailItemContent from "@src/structures/DetailItemContent";

export default class EditItemFormValuesStructure {

    identifier: string | null = null;
    title: string | null = null;
    latinTitle: string | null = null;
    order: string | null = null;
    family: string | null = null;
    fact: string | null = null;
    videoUrl: string | null = null;
    content: Array<DetailItemContent> = [];

    constructor(params: Partial<EditItemFormValuesStructure> = {}) {
        this.identifier = params.identifier || null;
        this.title = params.title || null;
        this.latinTitle = params.latinTitle || null;
        this.order = params.order || null;
        this.family = params.family || null;
        this.fact = params.fact || null;
        this.videoUrl = params.videoUrl || null;
        this.content = params.content || [];
    }
}