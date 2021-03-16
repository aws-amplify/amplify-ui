<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  render() {
    return h("div", this.info);
  },
  props: {
    info: {
      type: Object,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
