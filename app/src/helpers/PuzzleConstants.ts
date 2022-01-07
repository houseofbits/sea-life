export enum PuzzleLayersEnum {
    LAYER0 = 0,
    LAYER1 = 1,
    LAYER2 = 2,
    LAYER3 = 3,
    LAYER4 = 4,
    LAYER5 = 5
}

export enum PuzzleElementStateEnum {
    NONE = 0,
    SNAP = 1,
    DRAG = 2,
    CAPTURED = 3,
    PLACED = 4
}


export const TIME_STEP = 16;
export const PIECE_CAPTURE_DISTANCE = 70;
export const SNAP_TO_TARGET_STEP = 5;
export const SNAP_TO_INITIAL_STEP = 50;