import Vector2 from "@src/structures/Vector2";
import {
    PIECE_CAPTURE_DISTANCE,
    PuzzleElementStateEnum,
    SNAP_TO_TARGET_STEP,
    TIME_STEP,
    SNAP_TO_INITIAL_STEP
} from "@src/helpers/PuzzleConstants";
import DraggableElement from "@src/structures/DraggableElement";

export default class Draggable {
    position: Vector2 = new Vector2(0, 0);
    mousePosition: Vector2 = new Vector2(0, 0);
    targetPosition: Vector2 = new Vector2(0, 0);
    initialPosition: Vector2 = new Vector2(0, 0);
    state: PuzzleElementStateEnum = PuzzleElementStateEnum.NONE;
    element: Element | null = null;
    initialDistance: number = 0;
    actualDistance: number = 0;
    isPlaceable: boolean = false;

    constructor(config: DraggableElement) {
        this.position = config.initialPosition.clone();
        this.targetPosition = config.targetPosition;
        this.initialPosition = config.initialPosition;
        this.initialDistance = this.targetPosition.distance(this.initialPosition);
        this.calculateActualDistance();
    }

    handleMouseMove(event: MouseEvent): void {
        this.handleMove(new Vector2(event.clientX, event.clientY));
    }

    handleTouchMove(event: TouchEvent): void {
        if (event.touches.length > 0) {
            this.handleMove(new Vector2(
                event.touches[0].clientX,
                event.touches[0].clientY
            ));
        }
    }

    handleMouseDown(event: MouseEvent): void {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;
        this.handleDown(event);
    }

    handleTouchDown(event: TouchEvent): void {
        if (event.touches.length > 0) {
            this.mousePosition.x = event.touches[0].clientX;
            this.mousePosition.y = event.touches[0].clientY;
            this.handleDown(event);
        }
    }

    canDrag(): boolean {
        return this.state === PuzzleElementStateEnum.NONE || this.state === PuzzleElementStateEnum.SNAP;
    }

    handleDown(event: Event): void {
        if (this.canDrag()
            && event.target === this.element) {
            this.state = PuzzleElementStateEnum.DRAG;
        }
    }

    handleUp(): void {
        if (this.state === PuzzleElementStateEnum.DRAG) {
            this.state = PuzzleElementStateEnum.SNAP;
            this.snapToInitialPosition();
        }
    }

    handleMove(mousePosition: Vector2): void {
        if (this.state === PuzzleElementStateEnum.DRAG) {
            let diff = mousePosition.sub(this.mousePosition);
            this.position.addInPlace(diff);

            this.calculateGrabbedDistance(this.mousePosition);

            if (this.isPlaceable && this.actualDistance < PIECE_CAPTURE_DISTANCE) {
                this.state = PuzzleElementStateEnum.CAPTURED;
                this.processCapturedElement();

            }

            this.mousePosition = mousePosition;
        }
    }

    processCapturedElement(): void {
        if (!this.moveIntoPosition(this.targetPosition, SNAP_TO_TARGET_STEP)) {
            setTimeout(this.processCapturedElement.bind(this), TIME_STEP);
        } else {
            this.state = PuzzleElementStateEnum.PLACED;
        }
    }

    snapToInitialPosition(): void {
        if (this.state === PuzzleElementStateEnum.SNAP
            && !this.moveIntoPosition(this.initialPosition, SNAP_TO_INITIAL_STEP)) {
            setTimeout(this.snapToInitialPosition.bind(this), TIME_STEP);
        } else {
            this.state = PuzzleElementStateEnum.NONE;
        }
    }

    moveIntoPosition(targetPosition: Vector2, speed: number): boolean {
        const diff = this.position.sub(targetPosition);
        const length = diff.length();
        if (diff.lengthSquared() < 1.0) {
            return true;
        }

        diff
            .normalizeInPlace()
            .scaleInPlace(Math.min(speed, length));

        this.position.subInPlace(diff);

        this.calculateActualDistance();

        return false;
    }

    calculateGrabbedDistance(position: Vector2): void {
        const dist1 = this.targetPosition.distance(this.position);
        const dist2 = this.targetPosition.distance(position);
        this.actualDistance = Math.min(dist1, dist2);
    }

    calculateActualDistance(): void {
        this.actualDistance = this.targetPosition.distance(this.position);
    }

    getDistanceUnitValue(): number {
        const mDist = Math.min(this.initialDistance, this.actualDistance);
        return 1.0 - (mDist / this.initialDistance);
    }

    isPlaced(): boolean {
        return this.state === PuzzleElementStateEnum.PLACED;
    }

    registerEventHandlers(element: Element | null): void {
        this.element = element;

        document.documentElement.addEventListener(
            "mousemove",
            this.handleMouseMove.bind(this),
            true
        );
        document.documentElement.addEventListener(
            "touchmove",
            this.handleTouchMove.bind(this),
            true
        );
        document.documentElement.addEventListener(
            "mousedown",
            this.handleMouseDown.bind(this),
            true
        );
        document.documentElement.addEventListener(
            "touchstart",
            this.handleTouchDown.bind(this),
            true
        );
        document.documentElement.addEventListener("mouseup", this.handleUp.bind(this), true);
        document.documentElement.addEventListener("touchend", this.handleUp.bind(this), true);
    }

    unregisterEventHandlers(): void {
        document.documentElement.removeEventListener(
            "mousemove",
            this.handleMouseMove,
            true
        );
        document.documentElement.removeEventListener(
            "mousedown",
            this.handleMouseDown,
            true
        );
        document.documentElement.removeEventListener(
            "mouseup",
            this.handleUp,
            true
        );
        document.documentElement.removeEventListener(
            "touchmove",
            this.handleTouchMove,
            true
        );
        document.documentElement.removeEventListener(
            "touchstart",
            this.handleTouchDown,
            true
        );
        document.documentElement.removeEventListener(
            "touchend",
            this.handleUp,
            true
        );
    }
}