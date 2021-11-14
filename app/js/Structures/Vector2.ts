export default class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static createArrayOfVectorsFromNumbers(values: number[] = []): Vector2[] {
        const array = [];
        for (let i = 0; i < values.length; i += 2) {
            array.push(new Vector2(
                values[i],
                values[i] || 0,
            ));
        }
        return array;
    }
}