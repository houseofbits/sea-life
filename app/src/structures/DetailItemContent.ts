
export default class DetailItemContent {

    order: string = '';
    family: string = '';
    appearance: string | null = null;
    prevalence: string | null = null;
    food: string | null = null;
    development: string | null = null;
    fishing: string | null = null;
    additionalFact: string = '';

    constructor(params: Partial<DetailItemContent>) {
        Object.assign(this, params);
    }
}