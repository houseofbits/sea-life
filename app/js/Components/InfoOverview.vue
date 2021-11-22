<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);

function select(n: number): void {
    emit('update:modelValue', n);
}
</script>
<template>
    <div class="container">
        <div class="grid grid-cols-5 gap-4 m-3">
            <div v-for="n in 32" :key="n" class="btn btn-blue m-1 cursor-pointer text-center" @click="select(n)">View
                #{{ n }}
            </div>
        </div>
    </div>
</template>
