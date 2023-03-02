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
    <div class="edu2-card card4" :class="{active: isActive, 'view-active': isViewActive}" @click="close">
        <div class="card-thumbnail">
            <div class="icon">
                <img src="@images/ronis1.png" alt="Icon">
            </div>

            <div>
                <target-callout :hidden="isActive || !isViewActive" :config="callout1Config">
                    <div class="callout-header-text">Dzīvie organismi uz jūras gultnes (bentoss)</div>
                </target-callout>
            </div>
        </div>

        <div class="card-content">
            <div class="header">
                <span>Dzīvie organismi uz jūras gultnes (bentoss)</span>
                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <svg class="background" width="1090" height="662" viewBox="0 0 1090 662" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M984.691 71.33C702.844 305.181 641.541 716.6 317.537 601.692C204.783 561.703 95.4544 596.674 2 662.421L1089.5 662.421L1089.5 1.49998C1055.08 25.3791 1019.98 42.054 984.691 71.33Z" fill="#D4E1E9" stroke="#D4E1E9"/>
            </svg>


            
        </div>
    </div>
</template>