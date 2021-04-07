<script>
import Prism from 'prismjs';
import * as Vue from 'vue';

export default Vue.defineComponent({
  props: {
    code: {
      type: String
    },
    inline: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'markup'
    }
  },
  setup(props, { slots, attrs }) {
    const { h } = Vue;
    const slotsData = (slots && slots.default && slots.default()) || [];
    const code =
      props.code || (slotsData.length > 0 ? slotsData[0].children : '');
    const { inline, language } = props;
    const prismLanguage = Prism.languages[language];
    const className = `language-${language}`;

    if (inline) {
      return () =>
        h('code', {
          ...attrs,
          class: [attrs.class, className],
          innerHTML: Prism.highlight(code, prismLanguage)
        });
    }

    const d = Prism.highlight(code, prismLanguage);
    return () =>
      h('pre', { ...attrs, class: [attrs.class, className] }, [
        h('code', {
          class: className,
          innerHTML: d
        })
      ]);
  }
});
</script>
