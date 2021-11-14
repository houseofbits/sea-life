<template>
    <div ref="parent" class="element" :style="elementStyle">

    </div>
</template>

<script>
import PuzzleElement from "@js/Structures/PuzzleElement.ts";

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
            isCaptured: false,
            left: this.config.initialPosition.x,
            top: this.config.initialPosition.y,
            mouseX: 0,
            mouseY: 0,
            offsetX: 0,
            offsetY: 0,
        };
    },
    computed: {
        elementStyle()
        {
            return {
                backgroundColor: this.config.image,
                width: '200px',
                height: '200px',
                transform: 'translate('+this.left+'px, '+this.top+'px)',
                clipPath: 'circle(100px at center)',
                zIndex: this.config.zIndex,
            };
        },
    },
    methods: {
        emitEvent(eventName, additionalOptions) {
            this.$emit(eventName, {
                eventName,
                left: this.left,
                top: this.top,
                ...additionalOptions
            });
        },
        handleDown(event) {
            if (event.target === this.$refs.parent) {
                if (event.touches && event.touches.length >= 1) {
                    this.mouseX = event.touches[0].clientX;
                    this.mouseY = event.touches[0].clientY;
                } else {
                    event.preventDefault && event.preventDefault();
                    this.mouseX = event.clientX;
                    this.mouseY = event.clientY;
                }
                this.isCaptured = true;
                this.emitEvent('drag:start');
            }
        },
        handleUp() {
            this.emitEvent('drag:end');
            this.isCaptured = false;
        },
        handleMove(event) {
            if (this.isCaptured) {
                let eventY, eventX;
                if (event.touches && event.touches.length >= 0) {
                    eventY = event.touches[0].clientY;
                    eventX = event.touches[0].clientX;
                } else {
                    eventY = event.clientY;
                    eventX = event.clientX;
                }
                let diffX = eventX - this.mouseX + this.offsetX,
                    diffY = eventY - this.mouseY + this.offsetY;


                this.left = this.left + diffX;
                this.top = this.top + diffY;

                this.mouseX = eventX;
                this.mouseY = eventY;
                this.emitEvent('drag:move');
            }
        },
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