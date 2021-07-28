# Amplify UI Documentation

These docs are published at https://docs.amplify.aws/ui and powered by the following technologies:

- [aws-amplify/docs#next](https://github.com/aws-amplify/docs/tree/next) – Layout & Styling

  As a GitHub dependency, this package should be **explicitly updated** using a SHA (e.g. `#33d383d`) rather than a branch (e.g. `#next`):

  ```shell
  yarn docs add amplify-docs@github:https://github.com/aws-amplify/docs#33d383d
  ```

  You can find the latest/relevant commit at https://github.com/aws-amplify/docs/commits/next.

- [XDM](https://github.com/wooorm/xdm) – Content
- [Next.js](https://nextjs.org/) – Framework

## Getting Started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn install`
1. Run `yarn docs dev`
1. Open <http://localhost:5000/>

   (The docs root is `/ui` for consistency with https://docs.amplify.aws/ui)

## Contributing

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

_My Title_ will show up in the sidebar navigation, while contenet will be statically generated & indexed.

Note that _dynamic content_ (e.g. `import Page from "${slug}.mdx"`) is **not** statically generated
and harder to index. Because of this, ensure indexable content _always_ exists and only supplemental
content & demos are loaded asynchronously.

Pages **must** end with `.page.(mdx|tsx)` to differentiate them supplemental
`.mdx` fragments or `.tsx` utilities.
