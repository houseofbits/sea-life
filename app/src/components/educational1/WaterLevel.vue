<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    },
    waveX: {
        type: Number,
        required: true
    },
    waveY: {
        type: Number,
        required: true
    },
    waveScale: {
        type: Number,
        default: 1.0
    },
    fill: {
        type: String,
        default: '#D4E1E9'
    }
});

const svgStyle = computed(() => {
    return {
        left: props.waveX + 'px',
        top: props.waveY + 'px',
        transform: 'scale(' + props.waveScale + ')',
    };
});

</script>
<template>
    <div class="water-level">
        <div class="relative-wrapper">
            <svg viewBox="0 0 620 130" class="waves" :class="{active: isActive}" :style="svgStyle">
                <path
                    :style="{fill: props.fill}"
                    style="stroke:none;"
                    d="m 0.51927134,121.32766 c 0,0 10.37070066,6.7911 24.67260066,3.8127 12.8828,-2.68287 24.145196,0.9116 31.823481,-0.0169 15.410381,-1.86344 17.722784,-1.7075 22.666401,-0.75402 8.932843,1.72288 13.138312,0.53431 29.053446,0.16532 10.88722,-0.25242 13.18402,-1.86587 28.56948,-0.0453 17.85252,2.11248 30.75208,0.5824 43.73686,0.90321 12.11372,0.29928 13.51946,1.52514 26.47809,1.48555 7.58121,-0.0232 9.00944,-0.0739 20.9814,-0.3925 12.77087,-0.33985 21.13507,-1.14788 28.7664,-0.80918 12.22473,0.54256 20.02647,1.65855 35.93046,0.5325 13.93179,-0.98642 16.33511,-1.00292 53.0336,-1.01573 22.92221,-0.008 45.60651,-0.60811 67.11636,0.65387 15.46802,0.90751 25.10053,-0.094 41.58745,-0.5753 15.57211,-0.45456 23.37024,0.4 34.39126,-0.31485 11.20811,-0.727 18.34761,0.44963 33.9111,1.48925 9.23378,0.61681 24.81282,-1.20703 52.51303,-0.0695 24.44483,1.00383 44.40494,-2.63803 44.40494,-2.63803 l -0.10303,4.23127 -620.45070422,-0.54552 z"
                />
            </svg>
            <div class="content">
                <slot/>
            </div>
        </div>
    </div>
</template>