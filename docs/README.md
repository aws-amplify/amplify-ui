# Amplify UI Documentation

These docs are published at https://docs.amplify.aws/ui and powered by the following technologies:

- [aws-amplify/docs#next](https://github.com/aws-amplify/docs/tree/next) – Layout & Styling

  As a GitHub dependency, this package should be **explicitly updated** using a SHA (e.g. `#33d383d`) rather than a branch (e.g. `#next`):

  ```shell
  yarn docs add amplify-docs@github:https://github.com/aws-amplify/docs#33d383d
  ```

  You can find the latest/relevant commit at https://github.com/aws-amplify/docs/commits/next.

- [MDX](https://github.com/mdx-js/mdx) – Content
- [Next.js](https://nextjs.org/) – Framework

## Getting Started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn install`
1. Run `yarn docs dev`
1. Open <http://localhost:5000/>

   (The docs root is `/ui` for consistency with https://docs.amplify.aws/ui)

## Contributing

### Creating a Page

Page paths mirror their URLs. For example, `/ui/components/authenticator` is located at [/src/pages/ui/components/authenticator/index.mdx](src/pages/ui/components/authenticator/index.mdx).

At a minimum, all MDX pages require the following basic frontmatter:

```md
---
title: My Title
---

Content goes here...
```

_My Title_ will show up in the primary navigation.

#### Component Pages

Create or modify a page at `src/pages/ui/components/*/index.mdx`.

#### Primitive Pages

Create or modify a page at `src/pages/ui/primitives/*/index.mdx`.
