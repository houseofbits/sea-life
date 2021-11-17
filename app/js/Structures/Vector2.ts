export default class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    clamp(clampValue: number): void {
        clampValue = Math.abs(clampValue);
        this.x = Math.min(Math.max(this.x, -clampValue), clampValue);
        this.y = Math.min(Math.max(this.y, -clampValue), clampValue);
    }

    sub(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    subInPlace(other: Vector2): Vector2 {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    lengthSquared(): number {
        const a = Math.abs(this.x);
        const b = Math.abs(this.y);
        return a * a + b * b;
    }

    distance(other: Vector2): number {
        const a = this.x - other.x;
        const b = this.y - other.y;
        return Math.sqrt(a * a + b * b);
    }

    static createArrayOfVectorsFromNumbers(values: number[] = []): Vector2[] {
        const array = [];
        for (let i = 0; i < values.length; i += 2) {
            array.push(new Vector2(
                values[i],
                values[i + 1] || 0,
            ));
        }
        return array;
    }
}