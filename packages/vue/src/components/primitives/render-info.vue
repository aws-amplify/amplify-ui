<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    info: {
      type: Object,
    },
  },
  setup(props): () => Record<string, unknown> | undefined {
    return () => props.info;
  },
});
</script>

<style scoped></style>
