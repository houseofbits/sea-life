<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const emit = defineEmits(['prev', 'next', 'restart']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

onMounted(() => {

});

</script>
<template>

    <div class="page-navigation-link horizontal right" @click="emit('next')">
        <span>Turpināt</span>
        <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
    </div>

</template>