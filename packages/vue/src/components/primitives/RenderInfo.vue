<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    info: {
      type: Object,
    },
  },
  setup({ info }) {
    return () => info;
  },
});
</script>

<style scoped></style>
