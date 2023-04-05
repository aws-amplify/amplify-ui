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

Note: to set up local environment

```sh
cp ./docs/.env.example ./docs/.env
```

Then set values to the variables.

Note, if you're not using `nvm`, you'll need to set the environment variable: `export NODE_OPTIONS=--openssl-legacy-provider`

### Test

- Run `yarn test` to test.
- If the snapshot test fails, run `yarn test -- -u`.

Test runs after build.

### Creating a Page

Page paths mirror their URLs. For example, `/react/connected-components/authenticator` is located at [docs/src/pages/[platform]/connected-components/authenticator/index.page.mdx](src/pages/[platform]/components/authenticator/index.page.mdx).

Primitive component pages are located at `src/pages/[platform]/components/*/index.page.mdx`, respectively.

At a minimum, all `.page.mdx` files require the following basic frontmatter:

```md
---
title: Alert
description: Alert displays a brief message in a way that attracts the user’s attention without interrupting their task.
supportedFrameworks: react
---

Content goes here...
```

_My Title_ will show up in the sidebar navigation, while content will be statically generated & indexed.

Note that _dynamic content_ (e.g. `import Page from "${slug}.mdx"`) is **not** statically generated
and harder to index. Because of this, ensure indexable content _always_ exists and only supplemental
content & demos are loaded asynchronously.

Pages **must** end with `.page.(mdx|tsx)` to differentiate them supplemental
`.mdx` fragments or `.tsx` utilities.

#### Meta Information

As default, pages use its title and description information as meta information. If you would like to override it with different message, you can use `metaTitle` or `metaDescription`.

## Host on Amplify

To preview the changes you made for this Amplify UI Docs, you can use Amplify to host your feature branch for the forked repository by [following these steps](https://docs.amplify.aws/guides/hosting/git-based-deployments/q/platform/js/#4-deploy-your-app-to-aws-amplify).

Then you need to:

1. After selecting a branch, check "Connecting a monorepo? Pick a folder." and at "Enter the root directory of your app (e.g. src/myapp)", enter "docs"
2. Set "Environment variables" from the left sidebar. Add "SITE_URL", "DOCSEARCH_DOCS_APP_ID", "DOCSEARCH_DOCS_API_KEY", "DOCSEARCH_DOCS_INDEX_NAME".
   - "SITE_URL": feel free to use any string
   - "DOCSEARCH_DOCS_APP_ID", "DOCSEARCH_DOCS_API_KEY", "DOCSEARCH_DOCS_INDEX_NAME". If you have them from [Algolia DocSearch](https://docsearch.algolia.com/), use them. Otherwise, please use DocSearch's [testing credentials](https://docsearch.algolia.com/docs/DocSearch-v3)
     ```
     DOCSEARCH_DOCS_APP_ID="R2IYF7ETH7"
     DOCSEARCH_DOCS_API_KEY="599cec31baffa4868cae4e79f180729b"
     DOCSEARCH_DOCS_INDEX_NAME="docsearch"
     SITE_URL="https://localhost:5001" # can be any string
     ```
