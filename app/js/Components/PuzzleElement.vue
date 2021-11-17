<template>
    <div ref="parent" class="element" :style="elementStyle">

    </div>
</template>

<script>
import PuzzleElement from "@js/Structures/PuzzleElement.ts";
import {PuzzleElementStateEnum, PUZZLE_PIECE_CAPTURE_DISTANCE} from "@js/Helpers/Constants";

export default {
    name: "PuzzleElement",
    props: {
        config: {
            type: PuzzleElement,
            required: true
        }
    },
    data() {
        return {
            state: PuzzleElementStateEnum.NONE,
            position: this.config.initialPosition.clone(),
            mouseX: 0,
            mouseY: 0,
        };
    },
    computed: {
        elementStyle() {
            return {
                backgroundColor: this.config.image,
                width: '200px',
                height: '200px',
                transform: 'translate(' + this.position.x + 'px, ' + this.position.y + 'px)',
                clipPath: 'circle(100px at center)',
                zIndex: this.config.zIndex,
            };
        },
    },
    methods: {
        emitEvent(eventName, additionalOptions) {
            this.$emit(eventName, {
                eventName,
                position: this.position,
                ...additionalOptions
            });
        },
        handleDown(event) {
            if (this.state === PuzzleElementStateEnum.NONE
                && event.target === this.$refs.parent) {
                if (event.touches && event.touches.length >= 1) {
                    this.mouseX = event.touches[0].clientX;
                    this.mouseY = event.touches[0].clientY;
                } else {
                    event.preventDefault && event.preventDefault();
                    this.mouseX = event.clientX;
                    this.mouseY = event.clientY;
                }
                this.state = PuzzleElementStateEnum.DRAG;
                this.emitEvent('drag:start');
            }
        },
        handleUp() {
            if (this.state === PuzzleElementStateEnum.DRAG) {
                this.emitEvent('drag:end');
                this.state = PuzzleElementStateEnum.NONE;
            }
        },
        handleMove(event) {
            if (this.state === PuzzleElementStateEnum.DRAG) {
                let eventY, eventX;
                if (event.touches && event.touches.length >= 0) {
                    eventY = event.touches[0].clientY;
                    eventX = event.touches[0].clientX;
                } else {
                    eventY = event.clientY;
                    eventX = event.clientX;
                }
                let diffX = eventX - this.mouseX,
                    diffY = eventY - this.mouseY;

                this.position.x += diffX;
                this.position.y += diffY;

                if (this.config.targetPosition.distance(this.position) < PUZZLE_PIECE_CAPTURE_DISTANCE) {
                    this.state = PuzzleElementStateEnum.CAPTURED;
                    this.processCapturedElement();
                }

                this.mouseX = eventX;
                this.mouseY = eventY;
                this.emitEvent('drag:move');
            }
        },
        processCapturedElement() {
            if (!this.moveIntoPosition()) {
                setTimeout(this.processCapturedElement, 16);
            } else {
                this.state = PuzzleElementStateEnum.PLACED;
            }
        },
        moveIntoPosition() {
            const diff = this.position.sub(this.config.targetPosition);
            if (diff.lengthSquared() < 0.5) {
                return true;
            }

            diff.clamp(10);
            this.position.subInPlace(diff);

            return false;
        }
    },
    mounted() {
        document.documentElement.addEventListener(
            "mousemove",
            this.handleMove,
            true
        );
        document.documentElement.addEventListener(
            "mousedown",
            this.handleDown,
            true
        );
        document.documentElement.addEventListener("mouseup", this.handleUp, true);
        document.documentElement.addEventListener(
            "touchmove",
            this.handleMove,
            true
        );
        document.documentElement.addEventListener(
            "touchstart",
            this.handleDown,
            true
        );
        document.documentElement.addEventListener("touchend", this.handleUp, true);
        this.emitEvent("mount");
    },
    beforeUnmount() {
        document.documentElement.removeEventListener(
            "mousemove",
            this.handleMove,
            true
        );
        document.documentElement.removeEventListener(
            "mousedown",
            this.handleDown,
            true
        );
        document.documentElement.removeEventListener(
            "mouseup",
            this.handleUp,
            true
        );
        document.documentElement.removeEventListener(
            "touchmove",
            this.handleMove,
            true
        );
        document.documentElement.removeEventListener(
            "touchstart",
            this.handleDown,
            true
        );
        document.documentElement.removeEventListener(
            "touchend",
            this.handleUp,
            true
        );
        this.emitEvent("destroy");
    },
}
</script>

<style lang="scss" scoped>

.element {
    position: absolute;
    top: 0;
    left: 0;
}

</style>