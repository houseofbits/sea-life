<script setup lang="ts">

defineProps({
    modelValue: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['close']);

</script>
<template>
    <div class="container">
        <div class="btn btn-blue m-1 cursor-pointer" @click="emit('close')">Close</div>
        <div v-html="modelValue"></div>
    </div>
</template>