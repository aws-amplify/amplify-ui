# Amplify UI Documentation

These docs are published at https://docs.amplify.aws/ui and powered by the following technologies:

- [MDX](https://mdxjs.com/) – Content
- [Next.js](https://nextjs.org/) – Framework

## Contributing

### Getting Started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn setup`
1. Run `yarn docs dev`
1. Open <http://localhost:5000/>
1. _Optional:_ To build the flutter authenticator sample, [install flutter](https://docs.flutter.dev/get-started/install) and then run `yarn flutter:build`. This will build the flutter authenticator one time. It will not watch for changes.

#### To Update Props Table

```sh
yarn docs update:props-table
```

_note:_ The above command doesn't update props table for `TextField`. To update `TextField` you need to reduce the type complexity by temporarily removing the type cast at the bottom of "packages/react/src/primitives/TextField/TextField.tsx" to the following, then run the above command.

```tsx
export const TextField = React.forwardRef(TextFieldPrimitive);
TextField.displayName = 'TextField';
```

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
