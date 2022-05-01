import {ref} from "vue";

const isLoading = ref<boolean>(false);
const isLeavingPromptVisible = ref<boolean>(false);
const hasUnsavedChangesPending = ref<boolean>(false);
const leaveCallback = ref<CallableFunction | null>(null);

export default () => {

    function setLoading(value: boolean): void {
        isLoading.value = value;
    }

    function setUnsavedChangesPending(value: boolean) {
        hasUnsavedChangesPending.value = value;
    }

    function promptPageLeave(callback: CallableFunction): void {
        if (hasUnsavedChangesPending.value) {
            leaveCallback.value = callback;
            isLeavingPromptVisible.value = true;
        } else {
            callback();
        }
    }

    function leavePage(): void {
        if (leaveCallback.value) {
            leaveCallback.value();
        }
        setUnsavedChangesPending(false);
        isLeavingPromptVisible.value = false;
    }

    return {
        leavePage,
        promptPageLeave,
        setUnsavedChangesPending,
        isLeavingPromptVisible,
        isLoading,
        setLoading
    };
}