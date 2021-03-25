import { ref, readonly } from "vue";

// State
const currentPage = ref("SIGNIN");

//mutatation

const setPage = (page) => (currentPage.value = page);

export default { currentPage: readonly(currentPage), setPage };
