import {ref} from "vue";

export default () => {

    const currentPage = ref(0);
    const previousPage = ref(0);

    function getAnimationState(page: number): string {

        const isOnLeft = previousPage.value <= currentPage.value;
        if (page === currentPage.value) {
            return isOnLeft ? 'in-left' : 'in-right';
        }
        if (page === previousPage.value) {
            return isOnLeft ? 'out-left' : 'out-right';
        }

        return '';
    }

    return {
        getAnimationState
    };
};