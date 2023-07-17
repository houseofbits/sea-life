<script setup lang="ts">
import {ref} from "vue";
import EditorGlobalState from "@src/composables/EditorGlobalState";

const username = ref<string>('');
const password = ref<string>('');

const {
    authenticate,
    authenticationErrorMessage
} = EditorGlobalState();

</script>
<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
                class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-3 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="flex items-center">
                        <div
                            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Authentication
                                required!</h3>
                        </div>
                    </div>
                    <div class="mt-5 text-center sm:text-left w-full">
                        <div v-if="authenticationErrorMessage" id="alert-border-2" class="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200"
                             role="alert">
                            <svg class="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                      clip-rule="evenodd"></path>
                            </svg>
                            <div class="ml-3 text-sm font-medium text-red-700">
                                {{ authenticationErrorMessage }}
                            </div>
                        </div>

                        <div class="mb-3 w-full mt-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <span class="text-gray-500">Username:</span>
                                <input v-model="username" type="text"
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </label>
                        </div>

                        <div class="mb-3 w-full mt-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <span class="text-gray-500">Password:</span>
                                <input v-model="password" type="text"
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 flex justify-end">
                    <button @click="() => authenticate(username, password)">Authenticate</button>
                </div>
            </div>
        </div>
    </div>
</template>