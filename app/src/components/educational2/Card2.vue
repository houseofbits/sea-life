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
    size: new Vector2(362, 220),
    position: new Vector2(205, 208),
    type: CalloutTypeEnum.BOTTOM_LEFT
});

function close(): void {
    emit('close');
}

</script>
<template>
    <div class="edu2-card card2" :class="{active: isActive, 'view-active': isViewActive}" @click="close">
        <div class="card-thumbnail">
            <div class="icon">
                <img src="@images/ronis1.png" alt="Icon">
            </div>

            <div>
                <target-callout :hidden="isActive || !isViewActive" :config="callout1Config">
                    <div class="callout-header-text">Jūras putni</div>
                </target-callout>
            </div>
        </div>

        <div class="card-content">
            <div class="header">
                <span>Jūras putni</span>
                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <svg class="background" width="1212" height="351" viewBox="0 0 1212 351" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M26.1457 344.126C345.826 276.009 641.467 379.835 768.316 175.261C843.851 53.4446 1049.06 10.5131 1213 0.57332L1213 349.759L0.499318 349.759C8.95988 347.845 17.5092 345.966 26.1457 344.126Z"
                    fill="#D4E1E9" stroke="#D4E1E9"/>
            </svg>


        </div>
    </div>
</template>