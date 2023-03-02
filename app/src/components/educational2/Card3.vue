<script setup lang="ts">
import TargetCallout from "@src/components/puzzle/TargetCallout.vue";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import Vector2 from "@src/structures/Vector2";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";

const emit = defineEmits(['close']);

const props = defineProps({
    isViewActive: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

const callout1Config = new CalloutConfigStructure({
    size: new Vector2(362,220),
    position: new Vector2(205,208),
    type: CalloutTypeEnum.BOTTOM_LEFT
});

function close(): void {
    emit('close');
}

</script>
<template>
    <div class="edu2-card card3" :class="{active: isActive, 'view-active': isViewActive}" @click="close">
        <div class="card-thumbnail">
            <div class="icon">
                <img src="@images/ronis1.png" alt="Icon">
            </div>

            <div>
                <target-callout :hidden="isActive || !isViewActive" :config="callout1Config">
                    <div class="callout-header-text">Jūras zīdītāji</div>
                </target-callout>
            </div>
        </div>

        <div class="card-content">
            <div class="header">
                <span>Jūras zīdītāji</span>
                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <svg class="background" width="1600" height="323" viewBox="0 0 1600 323" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1449.04 3.30096C989.301 -20.7131 1030.94 89.8516 726.593 219.427C495.128 317.975 159.821 277.831 -0.5 241.105V321L1599.5 325.5V19.3791C1550.33 11.5357 1500.02 5.96409 1449.04 3.30096Z" fill="#D4E1E9"/>
            </svg>



        </div>
    </div>
</template>