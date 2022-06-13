---
"@aws-amplify/ui-react": major
---

🚨BREAKING CHANGE🚨: Built-in icons removed

We've removed the built-in icons (Icon360, IconSave, etc) from the `@aws-amplify/ui-react` package. This change was made for a few reasons:
* There are many other React icon libraries that are compatible with Amplify UI components
* Removing the icons reduces the overall package size by about 74%.
* While in most cases the icons are tree-shaken out of the final app bundle, by removing the icons we ensure smaller bundle sizes for all users.

We are not removing the `<Icon>` component, which allows customers to easily add SVG icons using the `pathData` prop. A limited set of the icons have been left for internal only use in Amplify UI primitives.
