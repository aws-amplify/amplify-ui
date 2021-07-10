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

1. Run `yarn install` from the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. `yarn docs`
1. Open <http://localhost:3000/>

## Contributing

### Pages

At a minimum, all MDX pages require the following basic frontmatter:

```md
---
title: "My Title"
---

"My Title" will show up in the primary navigation now.
```

### Components

Create or modify a page at `src/content/components/*/index.mdx`.

### Primitives

Create or modify a page at `src/content/primitives/*/index.mdx`.
