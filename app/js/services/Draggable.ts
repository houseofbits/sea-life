import Vector2 from "@js/structures/Vector2";
import {PUZZLE_PIECE_CAPTURE_DISTANCE, PuzzleElementStateEnum} from "@js/helpers/Constants";
import DraggableElement from "@js/structures/DraggableElement";

export default class Draggable {
    position: Vector2 = new Vector2(0, 0);
    mousePosition: Vector2 = new Vector2(0, 0);
    targetPosition: Vector2 = new Vector2(0,0);
    state: PuzzleElementStateEnum = PuzzleElementStateEnum.NONE;
    element: Element | null = null;

    constructor(config: DraggableElement) {
        this.position = config.initialPosition;
        this.targetPosition = config.targetPosition;
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

    handleDown(event: Event): void {
        if (this.state === PuzzleElementStateEnum.NONE
            && event.target === this.element) {
            this.state = PuzzleElementStateEnum.DRAG;
        }
    }

    handleUp(): void {
        if (this.state === PuzzleElementStateEnum.DRAG) {
            this.state = PuzzleElementStateEnum.NONE;
        }
    }

    handleMove(mousePosition: Vector2): void {
        if (this.state === PuzzleElementStateEnum.DRAG) {
            let diff = mousePosition.sub(this.mousePosition);
            this.position.addInPlace(diff);

            if (this.targetPosition.distance(this.position) < PUZZLE_PIECE_CAPTURE_DISTANCE) {
                this.state = PuzzleElementStateEnum.CAPTURED;
                this.processCapturedElement();
            }

            this.mousePosition = mousePosition;
        }
    }

    processCapturedElement(): void {
        if (!this.moveIntoPosition()) {
            setTimeout(this.processCapturedElement.bind(this), 16);
        } else {
            this.state = PuzzleElementStateEnum.PLACED;
        }
    }

    moveIntoPosition(): boolean {
        const diff = this.position.sub(this.targetPosition);
        if (diff.lengthSquared() < 0.5) {
            return true;
        }

        diff.clamp(10);
        this.position.subInPlace(diff);

        return false;
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