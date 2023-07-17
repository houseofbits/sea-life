import {ref} from "vue";
import ItemUpdateService from "@src/services/ItemUpdateService";

const isLoading = ref<boolean>(false);
const isLeavingPromptVisible = ref<boolean>(false);
const isAuthPromptVisible = ref<boolean>(true);
const hasUnsavedChangesPending = ref<boolean>(false);
const leaveCallback = ref<CallableFunction | null>(null);
const username = ref<string|null>(null);
const passphrase = ref<string|null>(null);
const authenticationErrorMessage = ref<string|null>(null);

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

    async function authenticate(user: string, password: string) {
        authenticationErrorMessage.value = null;
        try {
            await ItemUpdateService.authenticate(user, password);
            isAuthPromptVisible.value = false;
            username.value = user;
            passphrase.value = password;
        }  catch (e: any) {
            authenticationErrorMessage.value = e.message;
        } finally {

        }
    }

    return {
        leavePage,
        promptPageLeave,
        setUnsavedChangesPending,
        isLeavingPromptVisible,
        isLoading,
        setLoading,
        isAuthPromptVisible,
        authenticate,
        passphrase,
        username,
        authenticationErrorMessage
    };
}