# Amplify UI Documentation

Docs are powered by [MDX](https://github.com/mdx-js/mdx) [Next.js](https://nextjs.org/).

## Getting Started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
2. Run `yarn install`
3. Run `yarn docs dev`
4. Open <http://localhost:5000/>

All imported `packages/*` are compiled automatically by Next.js for you.

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
