<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  render() {
    return h(
      "h" + this.level, // tag name
      { "data-spark-heading": "" }, // props/attributes
      this.$slots // array of children
    );
  },
  props: {
    level: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
