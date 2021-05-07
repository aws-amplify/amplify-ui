<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    info: {
      type: Object
    }
  },
  setup(props): () => Record<string, unknown> {
    return () => props.info;
  }
});
</script>

<style scoped></style>
