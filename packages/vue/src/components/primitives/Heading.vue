<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    level: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  inheritAttrs: false,
  setup({ level }, { slots, attrs }) {
    const defaultSlot = slots.default ? slots.default() : [];
    const headingI = slots.headingI ? slots.headingI() : [];
    if (headingI[0]?.children.length === 0) {
      headingI[0].children = [
        h(`h${level}`, { "data-spark-heading": "", ...attrs }, [defaultSlot]),
      ];
    } else {
      return () =>
        h(`h${level}`, { "data-spark-heading": "", ...attrs }, [
          headingI[0].children,
        ]);
    }
    return () => headingI;
  },
});
</script>

<style scoped></style>
