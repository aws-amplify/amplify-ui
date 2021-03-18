<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    info: {
      type: Object,
    },
  },
  setup({ info }) {
    return () => h("div", info);
  },
});
</script>

<style scoped></style>
