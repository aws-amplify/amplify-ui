# Amplify UI Documentation

These docs are published at https://docs.amplify.aws/ui and powered by the following technologies:

- [XDM](https://github.com/wooorm/xdm) – Content
- [Next.js](https://nextjs.org/) – Framework

## Contributing

### Getting Started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn setup`
1. Run `yarn docs dev`
1. Open <http://localhost:5000/>

### Creating a Page

Page paths mirror their URLs. For example, `/ui/components/authenticator` is located at [/src/pages/ui/components/authenticator/index.page.mdx](src/pages/ui/components/authenticator/index.page.mdx).

Component & primitive pages are located at `src/pages/ui/components/*/index.page.mdx` and `src/pages/ui/primitives/*/index.page.mdx`, respectively.

At a minimum, all `.page.mdx` files require the following basic frontmatter:

```md
---
title: My Title
---

Content goes here...
```

_My Title_ will show up in the sidebar navigation, while content will be statically generated & indexed.

Note that _dynamic content_ (e.g. `import Page from "${slug}.mdx"`) is **not** statically generated
and harder to index. Because of this, ensure indexable content _always_ exists and only supplemental
content & demos are loaded asynchronously.

Pages **must** end with `.page.(mdx|tsx)` to differentiate them supplemental
`.mdx` fragments or `.tsx` utilities.
